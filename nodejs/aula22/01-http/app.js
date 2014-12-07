// Note: this module adds special powers to strings as a side-effect
require("colors");

var http = require("http");

var server = http.createServer();
server.on("request", require('./app-routes'));

var port = process.env["PORT"] || 8080;
server.listen(port, function() 
{
  var message = "Server started and listening port " + port;
  console.log(message.green);
});
