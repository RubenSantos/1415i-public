var db = require("./../../model");

module.exports = function(app)
{
	var express = require('express');
	var todosRouter = express.Router();

	/* GET users listing. */
	todosRouter.get('/', function(req, res)
	{
		/*/ Sync
		var allTodos = db.allTodos();
		var model = { todos: allTodos };
	  	res.render('todos/list', model );
	  	// */

	  	// Async
	  	console.log("r", 1);
		db.allTodos(function(err, allTodos)
		{
	  		console.log("r", 3);
			if(err) return res.status(500).send("OMG! Server Error.");

			var model = { todos: allTodos };
	  		res.render('todos/list', model );
		});
	  	console.log("r", 2);

	});

	todosRouter.post('/toggle/:id', function(req, res)
	{
		var id = req.params.id;
		db.getById(id, function(err, todo) {
			if(err) return res.status(404).send("TODO " + id + " not found.");
			db.toggle(id, function(err) {
				if(err) return res.status(500).send("Server error");
				res.redirect('/todos#todo-' + id);
			});

		});

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