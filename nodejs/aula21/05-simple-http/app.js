var colors = require("colors");
var http = require("http");

var server = http.createServer(processRequest);

function processRequest(request, response) 
{
  console.log(request.method.gray, request.url.yellow);

  var message = "Hello from NodeJS!";
  response.writeHead(200, { 
    "Content-Length": message.length,
    "Content-Type": "text/plain",
  });
  response.end(message);

}

// another way (the explicity one) to register for event 'request' of HTTPServer 
// 
// server.on("request", function() {
//   console.log("on('request') triggered");
// });

// option a) using process arguments
//var port = process.argv.length == 3 ? process.argv[2] : 8080;

// option b) using evironment arguments
var port = process.env["PORT"] || 8080;

server.listen(port, function() {
  var message = "Server started and listening port " + port;
  console.log(message.green);
});


