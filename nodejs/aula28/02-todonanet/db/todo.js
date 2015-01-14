var db = require('./db');

function Todo(id, title, description, creationDate, done) {
    this.id = id || require("guid").raw();
    this.title = title || "";
    this.description = description || "";
    this.creationDate = creationDate || new Date();
    this.done = done || false;
}
module.exports.Todo = Todo;

module.exports.Todo.findAll = function(cb)
{
    db.selectAll("SELECT id, title, description, creationdate, done from todos order by id",
        function(row) { return new Todo(row.id, row.title, row.description, row.creationdate, row.done); },
        cb);
}

module.exports.Todo.getById = function(id, cb)
{
    db.selectOne("SELECT id, title, description, creationdate, done from todos where id=$1 limit 2",
        [id],
        function(row) { return new Todo(row.id, row.title, row.description, row.creationdate, row.done); },
        cb);
};

module.exports.Todo.createNew = function(todo, cb)
{
    var params = [todo.id, todo.title, todo.description, todo.creationDate, todo.done];
    db.executeQuery("INSERT into todos(id, title, description, creationdate, done) values($1, $2, $3, $4, $5)",
        params,
        function(err) { cb(err, todo.id) }
    );
};

module.exports.Todo.edit = function(todo, cb)
{
    var params = [todo.id, todo.title, todo.description, todo.creationDate, todo.done];
    db.executeQuery("UPDATE todos SET (title, description, creationdate, done) = ($2, $3, $4, $5) where id = $1",
        params,
        function(err) {
            if(err) return cb(new Error(err));
            module.exports.Todo.getById(todo.id, cb);
        }
    );
};

module.exports.Todo.checkOrUncheck = function(id, cb)
{
    db.executeQuery("UPDATE todos SET done = NOT done where id = $1",
        [id],
        cb
    );
};


module.exports.Todo.deleteById = function(id, cb)
{
    db.executeQuery("DELETE FROM todos where id = $1",
        [id],
        cb
    );
};

