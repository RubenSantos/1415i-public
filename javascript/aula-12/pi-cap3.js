assert(true, "This should pass");
assert(false, "This should fail");

// (1) functions as functions
// function declaration
function ninja() { }
ninja();

// function operator to set samurai variable value
var samurai = function() {};
samurai();
var superninja = ninja;
superninja();


// (2) functions as methods
var o = { };
o.whatever = function() { };
o.whatever();

function creep() { return this; }
assert(creep() == window, "Creeping in window");

var global = this;
assert(creep() == global, "Creeping in the global context");
assert(this == window, "this is the window");

var ninja1 = { 
  skulk: creep
};
ninja1.creep = creep;
assert(ninja1.creep() == ninja1, "Creeping in ninja1");
assert(ninja1.skulk() == ninja1, "Skulking in ninja1");

var ninja2 = { fn: creep };
assert(ninja2.fn() == ninja2, "Fning in ninja2");


// (3) functions as constructors
function Ninja() {
  this.skulk = function() { return this };
  var fn = function() { return 1 };
  this.fnInThis = fn;
}

var ninja1 = new Ninja();
var ninja2 = new Ninja();

assert(ninja1.skulk() == ninja1, "ninja1 is skulking");
assert(ninja2.skulk() == ninja2, "ninja2 is skulking");

assert(window.skulk == undefined, "window doesn't have a skulk fn");
var ninja3 = Ninja();
assert(window.skulk != undefined, "window have a skulk fn");
assert(ninja3 == undefined, "ninja3 is undefined (we should use new to create a object)");


assert(ninja1.fn == undefined, "vars in constructors aren't available in the created object")
assert(ninja1.fnInThis != undefined, "Only properties attached to this are available")


// (4) Functions with apply/call
var add = function() {
  var result = 0;
  for(var i = 0; i < arguments.length; ++i) {
    result += arguments[i];
  }
  return result;
}
assert(add(1, 2) == 3, "1 + 2 = 3 (as a function)");
assert(isNaN(add(1, undefined)), "1 + undefined = NaN (as a function)");
assert(add(1), "1 = 1 (as a function)");
assert(add(1, 2, 4) == 7, "1 + 2 + 4 = 7 (as a function)");

var numbers = [5, 4, 3];
// add(numbers[0], numbers[1]) .... lame!
var numbersResult = add.apply(null /* this */, numbers /* arguments */);
assert(numbersResult == 12, "5 + 4 + 3 = 12 (as a call to apply)")
assert(add.apply(null, numbers.slice(1)) == 7, "numbers was sliced [5, 4, 3] -> [4, 3]");


var a = { };
var b = { };
var c = { };


var returnThis = function() { return this };
assert(returnThis() == window, "this of function called as functions is window");

a.returnThis = returnThis;
assert(a.returnThis() == a, "this of methods is the 'left side' of method call")

assert( returnThis.apply(b) == b, "the first argument of apply is the this of function execution context" )
assert( returnThis.call(b) == b, "the first argument of call is the this of function execution context" )


// TODO: create function extend or merge 

assert(true, "SUCCESS \\o/");




















