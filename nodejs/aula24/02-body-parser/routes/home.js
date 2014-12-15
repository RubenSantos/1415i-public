module.exports = function(app) {

	app.get("/", function(req, res) 
	{
		console.log("home");
	  res.render("home", { headers: req.headers, cookies: req.cookies });
	});


	app.get("/getcookie", function(req, res) 
	{
	    res.setHeader("Set-Cookie", "useid=123EFrT2");
	    console.log(res.cookies);
	    res.send("Ok. Cookie sent.");
	});

}