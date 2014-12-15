var express = require("express");
var favicon = require("serve-favicon");
var morgan = require("morgan");

var cookieParser = require("cookie-parser");


var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(morgan("dev"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", function(req, res) 
{
  res.render("home", { headers: req.headers, cookies: req.cookies });
});


app.get("/getcookie", function(req, res) 
{
    res.setHeader("Set-Cookie", "useid=123EFrT2");
    console.log(res.cookies);
    res.send("Ok. Cookie sent.");
});



app.listen(process.env.PORT || 8080, function() 
{
  console.log("Ready to rock!");
});