var express = require("express");
var favicon = require("serve-favicon");
var morgan = require("morgan");

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(morgan("dev"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static("public"));

app.get("/", function(req, res) 
{
  res.render("home", { headers: req.headers, cookies: req.headers["cookie"] });
});


app.get("/getcookie", function(req, res) 
{
    res.setHeader("Set-Cookie", "useid=123EFrT2");
    res.send("Ok. Cookie sent.");
});



app.listen(process.env.PORT || 8080, function() 
{
  console.log("Ready to rock!");
});