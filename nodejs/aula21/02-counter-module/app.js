var c1 = require("./counter")();
c1.exec();
c1.exec();
c1.exec();


var c2 = require("./counter")("c2", 10);
c2.exec();
c2.exec();


c1.exec();
c2.exec();

var c3 = require("./counter")();
c3.exec();
c3.exec();
c3.exec();
c3.exec();

console.log("c1", c1);
console.log("c2", c2);
console.log("c3", c3);