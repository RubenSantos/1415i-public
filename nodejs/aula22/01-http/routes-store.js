var routes = {};

function registerRoute(url, callback) 
{
  routes[url] = callback;
}
function getRoute(req) 
{
  return routes[req.url] || notFound;
}

function notFound(req, res) 
{
  res.statusCode = 404;
  res.end("Page " + req.url + " not found.");
}

module.exports = {
  registerRoute: registerRoute,
  getRoute: getRoute,
  notFound: notFound
}

