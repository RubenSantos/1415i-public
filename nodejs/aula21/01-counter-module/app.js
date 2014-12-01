var c = require("./counter");
var c1 = c.newCounter("c1", 0);
c1.exec();
c1.exec();
c1.exec();


var c = require("./counter");
var c2 = c.newCounter("c2", 10);
c2.exec();
c2.c = 42; // this c is not the private field c
c2.exec();

c1.exec();
c2.exec();



console.log("c1", c1);
console.log("c2", c2);