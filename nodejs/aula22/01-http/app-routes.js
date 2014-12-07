var routes = require("./routes-store");
module.exports = function processRequest(req, res) 
{
  logRequest(req, res);

  var route = routes.getRoute(req);
  route(req, res);
}

routes.registerRoute("/",            homePage);
routes.registerRoute("/favicon.ico", routes.notFound);


function homePage(req, res) 
{
  var message = "Hello from NodeJS!";
  res.writeHead(200, { 
    "Content-Length": message.length,
    "Content-Type": "text/plain",
  });
  res.end(message);
}

function logRequest(req, res) 
{
  console.log(req.method.gray, req.url.yellow);
}





