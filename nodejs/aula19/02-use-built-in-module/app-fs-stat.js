var fs = require('fs');
var path = require('path');
var util = require('util');

var filePath = path.join(__dirname, "adir", "..", "adir", "bar.txt");
console.log("PATH:", filePath);

fs.stat(filePath, function(err, stats) {
  if(err) return console.error(err);

  console.log("stats: ", stats);
  console.log("stats: " + stats);
  console.log("stats: " + JSON.stringify(stats));
  console.log(util.inspect(stats));

});
console.log("After fs.stats");

// hehe....
// while(true) ;










