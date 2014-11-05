module("Cap 4", function cap4(assert) 
{

  // How to fake array methods
  var arr = [1, 2, 3, 4, 5];
  assert(arr.length == 5, "arr contains 5 elements");
  assert(arr.pop() == 5, "last value (5) was removed from arr");
  assert(arr.length == 4, "arr contains 4 elements");

  arr.push(4);
  assert(arr.length == 5, "arr contains 5 elements");


  var list = {
    length: 0,
    add: function(a) {
      // NOTE: This is OK. But we are not "faking" an array method!!!
      // this[length] = a;
      // ++this.length;

      // Cool, but not the RIGHT way
      // [].push.call(this, a);

      // The RIGHT way
      return Array.prototype.push.call(this, a);      
    }
  }


  assert(list.length == 0, "list contains 0 elements");
  list.add(3);
  assert(list.length == 1, "list contains 1 elements");
  assert(list[0] == 3, "list[0] == 3");


  var o = {};
  list.add.call(o, 3);
  assert(o.length == 1, "o contains 1 elements");
  assert(o[0] == 3, "o[0] == 3");




});


module("Object merge / mixin", function(assert) {

  var a = { name: "Carlos", surname: "Guedes" };
  var b = { age: 33 };

  //a.age = 1;
  for(var p in a) {
    console.log(p, "=", a[p]);
    //console.log(a.age);
    //console.log(a["first name"]);
  }

  function merge(master, other) {
    for(var p in other) 
    {
      master[p] = other[p];
    }
  }


  merge(a, b);
  assert(a.age == 33, "age was copied from b")





});










