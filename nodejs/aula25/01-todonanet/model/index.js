
function Todo(id, title, description, creationDate, done) {
	this.id = id || require("guid").raw();
	this.title = title || "";
	this.description = description || "";
	this.creationDate = creationDate || new Date();
	this.done = done || false;
}
module.exports.Todo = Todo;

module.exports.findAll = function(cb)
{
	dbSelectAll("SELECT id, title, description, creationdate, done from todos order by id",
		function(row) { return new Todo(row.id, row.title, row.description, row.creationdate, row.done); },
		cb);
}

module.exports.getById = function(id, cb)
{
	dbSelectOne("SELECT id, title, description, creationdate, done from todos where id=$1 limit 2",
		[id],
		function(row) { return new Todo(row.id, row.title, row.description, row.creationdate, row.done); },
		cb);
};

module.exports.createNew = function(todo, cb)
{
	var params = [todo.id, todo.title, todo.description, todo.creationDate, todo.done];
	dbExecuteQuery("INSERT into todos(id, title, description, creationdate, done) values($1, $2, $3, $4, $5)",
		params,
		function(err) { cb(err, todo.id) }
	);
};

module.exports.edit = function(todo, cb)
{
	var params = [todo.id, todo.title, todo.description, todo.creationDate, todo.done];
	dbExecuteQuery("UPDATE todos SET (title, description, creationdate, done) = ($2, $3, $4, $5) where id = $1",
		params,
		function(err) {
			if(err) return cb(new Error(err));
			module.exports.getById(todo.id, cb);
		}
	);
};

module.exports.checkOrUncheck = function(id, cb)
{
	dbExecuteQuery("UPDATE todos SET done = NOT done where id = $1",
		[id],
		cb
	);
};


module.exports.deleteById = function(id, cb)
{
	dbExecuteQuery("DELETE FROM todos where id = $1",
		[id],
		cb
	);
};



///////////////////////////////////////////////////////////////////////////////////////////
///
/// Database utility functions
///
var config = require(require('path').resolve(__dirname, "..", "config.js"));
var pg = require("pg");
///
function dbSelectAll(query, createElem, cb)
{
	pg.connect(config.getConnString(), function(err, client, done) {
		if(err) return cb("Error fetching client from pool: " + err);
		client.query(query, function(err, result) {
			if(err) return cb("Error running query: " + err);

			var elems = result.rows.map(createElem);
			done();
			cb(null, elems);
		});
	});
}

function dbSelectOne(query, queryParams, createElem, cb)
{
	pg.connect(config.getConnString(), function(err, client, done) {
		if(err) return cb("Error fetching client from pool: " + err);
		client.query(query, queryParams, function(err, result) {
			if(err) return cb("Error running query: " + err);

			if(result.rowCount > 1) return done() || cb("More than one element selected.", null);

			var elem = createElem(result.rows[0]);
			done();
			cb(null, elem);
		});
	});
}

function dbExecuteQuery(query, queryParams, cb) {
	pg.connect(config.getConnString(), function(err, client, done) {
		if(err) return cb("Error fetching client from pool: " + err);
		client.query(query, queryParams, function(err, result) {
			if(err) return cb("Error running query: " + err);

			if(result.rowCount != 1) return done() || cb("Cannot execute the query: " + query, null);

			done();
			cb(null);
		});
	});
}




///// DEBUG - SHOULD ONLY BE CONFIGURED IN DEV
var todos = [
	new Todo(null, "Criar app express", "Criar aplicação express base para iniciar o desenvolvimento deste trabalho usando express.js", new Date(), true),
	new Todo(null, "Pausa", 			 "Esperar um bocado para os alunos refletirem", new Date(), true),
	new Todo(null, "Novo Todo", 		 "Adicionar suporte para criar novos Todos. childing monsieurship nyctinastic psammogenous papyroplastics sponsibility oscule stultification haggardly aluminographic subfigure unscreenably hebdomadal ralstonite gobbler tourer bott unsupervised stirpiculturist skegger deistic Astropecten suprasphanoidal peatman", new Date()),
	new Todo(null, "Terminar aula", 	 "Terminar a aula quando chegar a hora. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore dolore maxime molestias est nisi consequuntur quae facilis animi qui. Vel enim repudiandae quaerat non amet totam, dolore rerum? Possimus, aliquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum rem expedita minima nemo doloremque, molestiae commodi sunt repellendus atque adipisci vel iusto magni dolorem illo. Dolores, dolore, sapiente.", new Date()),
];

module.exports.findAll(function(err, dbtodos) {
	console.log(dbtodos);
	if(dbtodos.length == 0) {
		todos.forEach(function(todo) {
			module.exports.createNew(todo, function() {
				console.log("todo ", todo.title, "loaded");
			});
		});
	}
})
