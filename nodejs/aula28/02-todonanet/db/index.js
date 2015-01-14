var User = require('./user').User;
var Todo = require('./todo').Todo;

module.exports = {
	User: User,
	Todo: Todo
}

///// DEBUG - SHOULD ONLY BE CONFIGURED IN DEV
require('./injectSampleData.js')(User, Todo);