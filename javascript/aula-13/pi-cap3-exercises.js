module("Cap 3 - Exercícios", function cap4(assert) 
{
  
  assert(true, "123 Go....");

  // function - average
  function average() {
    var res = 0;
    for(var i = 0; i < arguments.length; ++i) {
      res += arguments[i];
    }
    return res / arguments.length;
  }
  assert( average(1,2,3) == 2, "the average of 1,2,3 is 2" );
  assert( average(1,2,3,4,5,6) == 3.5, "the average of 1,2,3,4,5,6 is 3.5" );

  // function - isPalindrome
  function isPalindromeIterative(text) 
  {
    for(var i = 0, j = text.length - 1; i < text.length / 2; ++i, --j) {
      //if(text[i] != text[j]) return false;
      if(text.charAt(i) != text.charAt(j)) return false;
    }
    return true;
  }
  function isPalindrome(text) {
    if(text.length <= 1) return true;
    if(text.charAt(0) != text.charAt(text.length-1)) return false;
    return isPalindrome(text.substring(1, text.length-1));
  }

  assert( true == isPalindrome("anana"), "anana is a palindrome");
  assert( false == isPalindrome("ababba"), "ababba is not a palindrome");

  // method - isGreaterThanPropertyX
  var obj1 = { x: 4 };
  obj1.xIsGreaterThan = function(val) {
    return this.x > val;
  }

  assert(obj1.xIsGreaterThan(+2) == true,  "o.x = 4, that is greater that 2");
  assert(obj1.xIsGreaterThan(+6) == false, "o.x = 4, that is not greater that 6");

  var obj2 = { x: 1, xIsGreaterThan: obj1.xIsGreaterThan };
  assert(obj2.xIsGreaterThan(+2) == false, "o.x = 1, that is not greater that 2");
  assert(obj2.xIsGreaterThan(-2) == true, "o.x = 1, that is greater that -2");

  // constructor
  function Animal(firstName, lastName) 
  {
      this.firstName = firstName;
      this.lastName = lastName;
      this.getName = function() 
      { 
        return this.firstName + " " + this.lastName;
      };
  }
  var bob = new Animal("Bob", "Cat");
  assert("Bob Cat" == bob.getName(), "bob is called Bob Cat" );

  var thor = new Animal("Thor", "The Silly Dog!");
  thor.lastName = "The Warrior!";
  assert("Thor The Silly Dog!" != thor.getName(), "thor is used to be called Thor The Silly Dog!" );

  var gn = thor.getName;
  assert(true, gn());

  var gn = thor.getName;
  assert(true, gn.call(thor));
  assert(true, gn.apply(bob));

  // apply / call
  var grades = [10, 20, 10, 20];
  assert( 15 == average.apply(null, grades), "average of 10,20,10,20 is 15" );
  var f = obj1.xIsGreaterThan;
  assert( true == f.call(obj1, 0) /* <=> obj1.f(0) */, "call f with obj1 and value 0 as argument and get true" );

});

















