function mymiddleware(req, res, next) {
	console.log(" ...... mymidlleware ......");
	next();
}

module.exports = function(app) 
{
	app.get("/login", mymiddleware, function(req, res) 
	{
		console.log("----- login .......");
	  res.render("login/index");
	});

	app.post("/login", mymiddleware, require("body-parser").urlencoded(), function(req, res) 
	{
		res.send(req.body);
	});
}

