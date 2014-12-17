module.exports = function(app) 
{
	
	var express = require('express');
	var todosRouter = express.Router();

	/* GET users listing. */
	todosRouter.get('/', function(req, res) 
	{
		var allTodos = require("./../../model").allTodos();
		var model = { todos: allTodos };
	  	res.render('todos/list', model );
	});

	todosRouter.get('/new', function(req, res) 
	{
	  res.send('Create..');
	});

	todosRouter.get('/delete/:id', function(req, res) 
	{
		var id = req.params.id;
	  	res.send('Delete ' + id + ' ?');
	});

	app.use("/todos", todosRouter);
}