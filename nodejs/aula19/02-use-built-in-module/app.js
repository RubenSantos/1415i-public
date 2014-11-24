console.log(__filename);
console.log(__dirname);

console.log(process);
console.log(process.cwd());

var fs = require('fs');
console.log(fs);

console.log("======================");
var fooExistsSync = fs.existsSync("./foo.txt");
console.log("After fs.existsSync");
console.log("foo.txt => ", fooExistsSync);

fs.exists("./foo.txt", function(fooExists) {
  console.log("foo.txt => ", fooExists);
});
console.log("After fs.exists");











