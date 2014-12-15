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
  res.render("home", { headers: req.headers, cookies: req.cookies });
});



app.listen(process.env.PORT || 8080, function() 
{
  console.log("Ready to rock!");
});