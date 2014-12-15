var express = require("express");
var favicon = require("serve-favicon");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
//var bodyParser = require("body-parser");

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan("dev"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static("public"));
app.use(cookieParser());
//app.use(bodyParser());

require("./routes/home")(app);
require("./routes/login")(app);


app.listen(process.env.PORT || 8080, function() 
{
  console.log("Ready to rock!");
});