var db = require("./../../model");

module.exports = function(app)
{
	var express = require('express');
	var todosRouter = express.Router();

	todosRouter.get('/', function(req, res, next)
	{

		db.allTodos(function(err, allTodos)
		{
			if(err) return next(err); // res.status(500).send("OMG! Server Error.");

			var model = { todos: allTodos };
	  		res.render('todos/list', model );
		});

	});

	todosRouter.post('/toggle/:id', injectTodoInRequest, function(req, res, next)
	{
		db.toggle(req.models.todo.id, function(err)
		{
			if(err) return next(err);
			res.redirect('/todos#todo-' + req.models.todo.id);
		});
	});

	todosRouter.get('/edit/:id', injectTodoInRequest, function(req, res)
	{
		res.render('todos/edit', { todo: req.models.todo });
		/*
		var id = req.params.id;
		db.getById(id, function(err, todo) {
			if(err) return res.status(404).send("TODO " + id + " not found.");

			res.render('todos/edit', { todo: todo })

		});
		*/
	});


	todosRouter.get('/delete/:id', injectTodoInRequest, function(req, res)
	{
		res.render('todos/delete', { todo: req.models.todo });

		/*
		var id = req.params.id;
		db.getById(id, function(err, todo) {
			if(err) return res.status(404).send("TODO " + id + " not found.");

			res.render('todos/delete', { todo: todo })

		});
		*/
	});

	todosRouter.post('/delete/:id', function(req, res, next)
	{
		var id = req.params.id;
		db.remove(id, function(err)
		{
			if(err) return next(err);
			res.redirect('/todos');
		});
	});

	todosRouter.get('/new', function(req, res)
	{
		var todo = new db.Todo();
	  	res.render('todos/new', { todo: todo });
	});

	todosRouter.post('/new', function(req, res, next)
	{
		var title = req.body.title;
		var description = req.body.description;

		if(!title || !description) return res.status(400).send("Invalid data.");

		var todo = new db.Todo(null, title, description);
	  	db.create(todo, function(err)
	  	{
	  		if(err) return next(err);

	  		return res.redirect('/todos#todo-' + todo.id);
	  	});
	});


	app.use("/todos", todosRouter);
}



////////////////////////////////////////////////////////////////////////////////////////////////
///
///
function injectTodoInRequest(req, res, next)
{
	var id = req.params.id;
	db.getById(id, function(err, todo) {
		if(err) return res.status(404).send("TODO " + id + " not found.");
		req.models = req.models || {};
		req.models.todo = todo;
		next();
	});
};












