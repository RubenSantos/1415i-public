module("Memoization - Closure", function cap4(assert) 
{
  
  function isEven(v) { 
    console.log("isEven(", v, ")");
    return v % 2 == 0; 
  }

  function memoize(fn) 
  {
    var cache = {};
    var res = function(a) 
    {
      if(cache[a] != undefined) return cache[a];
      return cache[a] = fn.call(null, a); // or   fn(a)   or fn.apply(null, [a])
    }
    // fn = alert;    // WARNING! Do not uncomment this line alone. Here will be dragons!
    return res;
  }

  var mIsEven = memoize(isEven);

  assert( mIsEven(2) == true, "2 is even" );
  assert( mIsEven(3) == false, "3 is not even" );

  assert( mIsEven(2) == true, "2 is even" );
  assert( mIsEven(2) == true, "2 is even" );
  assert( mIsEven(3) == false, "3 is not even" );

  assert( mIsEven(1) == false, "1 is not even" );

});









