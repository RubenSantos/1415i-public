// Note: To execute this application in debug execute:
// 
// OSX/Linux: DEBUG=todonanet,express:* nodemon server.js 
// Windows: SET DEBUG=todonanet,express:* & nodemon server.js 
//
// More info: http://expressjs.com/guide/debugging.html

var debug = require('debug')('todonanet');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  debug('Ready to rock');
});
