module.exports = function(app)
{
    var db = require("./../../db");

    var express = require('express');
    var todosRouter = express.Router();

    todosRouter.get('/', function getAllTodos(req, res, next)
    {
        db.Todo.findAll(function(err, todos)
        {
            if(err) return next(new Error(err));

            var model = { todos: todos };
            res.render('todos/list', model );
        });
    });

    todosRouter.get('/new', function createNewTodo(req, res)
    {
      res.render('todos/create', {todo: new db.Todo()});
    });

    todosRouter.post('/new', function createNewTodo(req, res)
    {
        var title = req.body.title;
        var description = req.body.description;

        var todo = new db.Todo(null, title, description, new Date(), false);

        if(title == "" || description == "") {
            res.flash("warning", "Não é possível criar a tarefa. Altere os valores e tente novamente.")
            return res.render('todos/create', { todo: todo });
        }

        db.Todo.createNew(todo, function (err, id) {
            if(err) {
                res.flash("warning", "Não é possível criar a tarefa. Altere os valores e tente novamente.")
                return res.render('todos/create', { todo: todo });
            }

            res.redirect('/todos/#todo-' + id);
        });
    });

    todosRouter.get('/edit/:id', loadTodoByIdToRequest, function editTodo(req, res)
    {
        res.render('todos/edit', { todo: req.models.todo });
    });

    todosRouter.post('/edit/:id', loadTodoByIdToRequest, function editTodo(req, res)
    {
        var title = req.body.title;
        var description = req.body.description;

        if(title == "" || description == "") {
            res.flash("warning", "Não é possível editar a tarefa. Altere os valores e tente novamente.")
            return res.render('todos/edit', { todo: todo });
        }

        req.models.todo.title = title;
        req.models.todo.description = description;
        db.Todo.edit(req.models.todo, function(err, updatedTodo)
        {
            if(err) {
                res.flash("warning", "Não é possível editar a tarefa. Altere os valores e tente novamente.")
                return res.render('todos/edit', { todo: todo });
            }
            res.redirect('/todos/#todo-' + updatedTodo.id);
        });
    });

    todosRouter.get('/delete/:id', loadTodoByIdToRequest, function deleteTodo(req, res)
    {
        res.render('todos/delete', { todo: req.models.todo });
    });

    todosRouter.post('/delete/:id', function deleteTodo(req, res)
    {
        db.Todo.deleteById(req.params.id, function(err) {
            if(err) return next(new Error(err));
            return res.redirect("/todos");
        });
    });

    todosRouter.post('/check/:id', function checkTodo(req, res, next)
    {
        var id = req.params.id;
        db.Todo.checkOrUncheck(id, function(err) {
            if(err) return next(new Error(err));
            return res.redirect('/todos/#todo-' + id);
        });
    });

    app.use("/todos", todosRouter);

    ///////////////////////////////////////////////////////////////////////////
    //
    function loadTodoByIdToRequest(req, res, next)
    {
        var id = req.params.id;
        db.Todo.getById(req.params.id, function(err, todo) {
            if(err) return next(err);

            if(todo == null) {
                return res.status(404).send("Tarefa não encontrada.");
            }
            req.models = req.models || {};
            req.models.todo = todo;
            next();
        });

    }
}