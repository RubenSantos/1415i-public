var db = require('./db');

function User(id, name)
{
    this.id = id;
    this.name = name;
    this.isAuthenticated = false;
    this.roles = [];
}
module.exports.User = User;

module.exports.User.getById = function(id, cb)
{
    db.selectOne("SELECT id, name from users where id=$1",
        [id],
        function(row) { return new User(row.id, row.name); },
        cb);
};

module.exports.User.findAll = function(cb)
{
    db.selectAll("SELECT id, name from users order by id",
        function(row) { return new User(row.id, row.name); },
        cb);
}


module.exports.User.createNew = function(user, cb)
{
    var params = [user.id, user.name];
    db.executeQuery("INSERT into users(id, name) values($1, $2)",
        params,
        function(err) { cb(err, user.id) }
    );
};