var global = this;

module("Bind", 
  "The great, bright and awesome Function.prototype.bind function",
  function (assert) 
{

  function incrementer(amount) {
    this.value += amount;
  }

  var o = { 
    value: 4, 
    alertValue: function() { alert(this.value); },
    assertValueNotNull : function() {
      assert(this.value != undefined, "value is defined");
      assert(this == global, "this is the global object");
    }
  };

  assert(function() { return o.value == 4 });

  incrementer.call(o, 2);
  assert(function() { return o.value == 6 });

  //throw new Error("This is an error");

  incrementer.apply(o, [3]);
  assert(function() { return o.value == 9 });

  var oincrementer = incrementer.bind(o);
  oincrementer.call({}, 1);   // the first argument of call is ignored by the "binded" oincrementer
  oincrementer.call(null, 1); // since first argument is not used, it can be null
  assert(function() { return o.value == 11});

  //btn.addEventListener("click", o.doSomething.bind(o));
  //btn.onClick();

  //setTimeout(o.alertValue, 100);
  //setTimeout(o.alertValue.bind(o), 100);
  //setTimeout(o.alertValue.bind({value:42}), 100);
  setTimeout(o.assertValueNotNull, 100);                      // assert will fail, because we are missing the this (object o)
  setTimeout(o.assertValueNotNull.bind(o), 100);              // assert will pass, because we are ensuring that o will be used as this  
  setTimeout(o.assertValueNotNull.bind({value:42}), 100);     // assert will pass, because we are ensuring that the object we pass contains a value  
  setTimeout(o.assertValueNotNull.bind({notavalue:1}), 100);  // assert will fail, because we are not binding an object with a value property

});




module("No Prototype", 
  "function Person() { ... }",
  function (assert) 
{

  function Person(first, last) 
  {
    this.first = first;
    this.last = last;

    var iAmPrivate = "private content";

    this.getFullName = function() {
      return this.first + " " + this.last;
    }

    this.getPrivateContent = function() {
      // iAmPrivate is being captured by the closure created by this function
      return iAmPrivate;
    }
  }

  var j = new Person("João", "Maria");
  var c = new Person("Carla", "Martins");

  assert(function() { return j != null; });
  assert(function() { return j.first == "João"; });
  assert(function() { return j.last == "Maria"; });
  assert(function() { return j.constructor == Person; });


  assert(function() { return j.getFullName() == "João Maria"; });
  assert(function() { return j.iAmPrivate == undefined; });
  assert(function() { return j.getPrivateContent() == "private content"; });
  assert(function() { return j instanceof Person; });

});


module("With Prototype", 
  "function Person() { ... }",
  function (assert) 
{

  function Human(first, last) 
  {
    this.first = first;
    this.last = last;
  }

  Human.prototype.getFullName = function() {
    return this.first + " " + this.last;
  }

  var j = new Human("João", "Maria");

  assert(function() { return j != null; });
  assert(function() { return j.first == "João"; });
  assert(function() { return j.last == "Maria"; });
  assert(function() { return j.constructor == Human; });
  assert(function() { return j.constructor.prototype.getFullName == Human.prototype.getFullName; });
  assert(function() { return j.getFullName() == "João Maria"; });
  
  assert(function() { return j instanceof Human; });

});


module("Another prototype example", function(assert) {

  function Foo() {
    this.value = 42;
  }
  Foo.prototype = extend(Foo.prototype, {
      method: function() {}
  });

  function Bar() {}

  // Set Bar's prototype to a new instance of Foo
  Bar.prototype = new Foo();
  Bar.prototype.foo = 'Hello World';

  // Make sure to list Bar as the actual constructor
  Bar.prototype.constructor = Bar;

  var test = new Bar(); // create a new bar instance

  assert(function() { return test.constructor == Bar });
  assert(function() { return test instanceof Bar });
  assert(function() { return test instanceof Foo });

  var f = new Foo();
  assert(function() { return f.value == 42; });
  assert(function() { return f.constructor == Foo; });
  assert(function() { return f instanceof Foo; });
  assert(function() { return f instanceof Object; });


});










