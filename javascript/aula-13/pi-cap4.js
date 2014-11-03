module("Cap 4", function cap4(assert) 
{
  
  assert(true, "Ok");

  setTimeout(function()  { assert(true, "Executed 2ms after Ok") }, 2);
  //setInterval(function() { assert(true, "Executed 500ms after Ok") }, 500);
  assert(true, "Another Ok");

  // 4.1 anonymous functions
  //       window.onload
  //       method definition
  //       setTimeout

  // 4.2 Recursion
  //       named functions - isPalindrome, chirp
  //       with methods (this problem)
  //       inline named functions

  // 4.3 Fun with function as objects
  //       storing functions
  //       self-memoizing functions
  //       faking array methods
  var cache = {};
  function memoize(fn) 
  {
    return function(v) 
    {
      if(cache[v] != undefined) return cache[v];
      return cache[v] = fn(v);
    }
  }

  function isPrime(value) {
    console.log("isPrime(" + value + ")" );
    var prime = value != 1;
    for (var i = 2; i < value; i++) {
      if (value % i == 0) {
        prime = false;
        break;
      } 
    }
    return prime;
  }

  var isPrimeMemoized = memoize(isPrime);

  assert(isPrimeMemoized(5), "5 is prime");
  assert(isPrimeMemoized(5), "5 is prime");


  function numberToString(num) {
    return "" + num;
  }

  // 4.4 Variable-length arguments lists
  //       with apply
  //       function overload

  // 4.5 Checking for functions

});









