module("Cap 3 - Exercícios", function cap4(assert) 
{
  
  assert(true, "123 Go....");

  // function - average
  assert( average(1,2,3) == 2, "the average of 1,2,3 is 2" );
  assert( average(1,2,3,4,5,6) == 3.5, "the average of 1,2,3,4,5,6 is 3.5" );


  // function - isPalindrome
  assert( true == isPalindrome("anana"), "anana is a palindrome");
  assert( false == isPalindrome("ababba"), "ababba is not a palindrome");

  // method - isGreaterThanPropertyX
  var obj1 = { x: 4 };
  assert(obj1.xIsGreaterThan(+2) == true,  "o.x = 4, that is greater that 2");
  assert(obj1.xIsGreaterThan(+6) == false, "o.x = 4, that is not greater that 6");

  var obj2 = { x: 1 };
  obj2.xIsGreaterThan = obj2.xIsGreaterThan;
  assert(obj2.xIsGreaterThan(+2) == false, "o.x = 1, that is not greater that 2");
  assert(obj2.xIsGreaterThan(-2) == false, "o.x = 1, that is greater that -2");

  // constructor
  var bob = new Animal("Bob");
  assert("Bob" == bob.getName(), "bob is called Bob" );

  // apply / call
  var grades = [10, 20, 10, 20];
  assert( 15 == average.apply(/*...*/), "average of 10,20,10,20 is 15" );
  var f = obj1.xIsGreaterThan;
  assert( true == f...., "call f with obj1 and value 0 as argument and get true" );

});

