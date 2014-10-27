assert(true, "The test suit is running :-)");
assert(false, "Fail!");
assert(1 == 1, "1 is equals to 1");


/*/ Array sort in Java
Arrays.sort(arr, new Comparator<Integer>() {
  public int compare(Integer a, Integer b) {
    return a - b;
  }
});
// */

var arr = [3, 1, 5, 2];
assertEqualsArrays(arr, [3, 1, 5, 2], "Array isn't sorted before sort");

arr.sort( function(a, b) { return a - b } );
assertEqualsArrays(arr, [1, 2, 3, 5], "Array is sorted after sort");


var descending = function(a, b) { return b - a };
arr.sort(descending);
assertEqualsArrays(arr, [5, 3, 2, 1], "Array is sorted descending after descending sort")



// Types
assert(typeof(1) == "number", "1 is a 'number'");
assert(typeof("abc") == "string", "abc is a 'string'");
assert(typeof(1.1) == "number", "1.1 is a 'number'");
assert(typeof(true) == "boolean", "true is a 'boolean'");
assert(typeof(descending) == "function", "descending is a 'function'")
assert(typeof([1, 2]) == "object", "[1, 2] is an 'object'");
assert(typeof({ "number": 12345}) == "object", "{ ... } is an 'object'");

console.log(typeof(null));
console.log(typeof(undefined));
console.log(typeof({}));
console.log(typeof([]));
console.log(typeof(1));
console.log(typeof("ola"));
console.log(typeof(function() {}));
console.log(typeof(false));
console.log(typeof(NaN));

















