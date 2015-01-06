
function Todo(id, title, description, creationDate, done) {
	this.id = id || require('node-uuid').v4();
	this.title = title;
	this.description = description;
	this.creationDate = creationDate || new Date();
	this.done = done || false;
}
Todo.id = 1;

var todos = [
	new Todo(null, "Criar app express", "Criar aplicação express base para iniciar o desenvolvimento deste trabalho usando express.js", null, true),
	new Todo(null, "Pausa", "Esperar um bocado para os alunos refletirem", null, true),
	new Todo(null, "Novo Todo", "Adicionar suporte para criar novos Todos"),
	new Todo(null, "Terminar aula", "Terminar a aula quando chegar a hora"),
];

var pg = require('pg');
var conString = "postgres://todonanetuser:todonanetuserpassword@localhost/todonanet";

module.exports.allTodos = function(cb)
{
	pg.connect(conString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT id, title, description, creationdate, done FROM todos order by title",
			function(err, result)
			{
				if(err) return cb(err);

				var todos = result.rows.map(function(row) {
					return new Todo(row.id, row.title, row.description, row.creationdate, row.done);
				});
				cb(null, todos);
			}
		);
	});

}

module.exports.getById = function(id, cb)
{
	pg.connect(conString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT id, title, description, creationdate, done FROM todos where id = $1",
			[id],
			function(err, result)
			{
				if(err) return cb(err);

				var todo = new Todo(result.rows[0].id, result.rows[0].title, result.rows[0].description, result.rows[0].creationdate, result.rows[0].done);
				cb(null, todo);
			}
		);
	});

}

module.exports.toggle = function(id, cb)
{
	pg.connect(conString, function(err, client, done) {

		if(err) return cb(err);

		client.query("UPDATE todos SET done = NOT done where id = $1",
			[id],
			function(err, result)
			{
				if(err) return cb(err);
				if(result.rowCount != 1) return cb(new Error("Error updating todo..."));
				cb(null);
			}
		);
	});
}

