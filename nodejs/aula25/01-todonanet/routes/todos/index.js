module.exports = function(app)
{
    var db = require("./../../model");

    var express = require('express');
    var todosRouter = express.Router();

    todosRouter.get('/', function getAllTodos(req, res)
    {
        var allTodos = db.findAll();
        var model = { todos: allTodos };
        res.render('todos/list', model );
    });

    todosRouter.get('/new', function createNewTodo(req, res)
    {
      res.render('todos/create', { title: "", description: "" });
    });

    todosRouter.post('/new', function createNewTodo(req, res)
    {
        var title = req.body.title;
        var description = req.body.description;
        var todo = db.createNew(title, description);

        if(title == "" || description == "") {
            res.flash("warning", "Não é possível criar a tarefa. Altere os valores e tente novamente.")
            return res.render('todos/create', { title: title, description: description });
        }

        res.redirect('/todos/#todo-' + todo.id);
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
        db.edit(req.models.todo);

        res.redirect('/todos/#todo-' + req.models.todo.id);
    });

    todosRouter.get('/delete/:id', loadTodoByIdToRequest, function deleteTodo(req, res)
    {
        res.render('todos/delete', { todo: req.models.todo });
    });

    todosRouter.post('/delete/:id', function deleteTodo(req, res)
    {
        db.deleteById(req.params.id);
        return res.redirect("/todos");
    });

    todosRouter.post('/check/:id', function checkTodo(req, res)
    {
        var id = req.params.id;
        db.checkOrUncheck(id);
        return res.redirect('/todos/#todo-' + id);
    });

    app.use("/todos", todosRouter);

    ///////////////////////////////////////////////////////////////////////////
    //
    function loadTodoByIdToRequest(req, res, next)
    {
        var id = req.params.id;
        var todo = db.getById(id);
        if(todo == null) {
            return res.send(404, "Tarefa não encontrada.");
        }
        req.models = req.models || {};
        req.models.todo = todo;
        next();
    }
}