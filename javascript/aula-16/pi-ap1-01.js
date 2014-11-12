module("indexOf", 
  "The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.", 
  function (assert) 
{
  var arr = ['apple','orange','pear'];

  assert(function() { return ArrayUtils.indexOf(arr, 'apple') == 0 });
  assert(function() { return ArrayUtils.indexOf(arr, 'orange') == 1 });
  assert(function() { return ArrayUtils.indexOf(arr, 'pear') == 2 });
  assert(function() { return ArrayUtils.indexOf(arr, 'foo') == -1 });

  // allow to search using a predicate
  function hasEvenLength(val) { return val.length % 2 == 0; }
  assert(function() { return ArrayUtils.indexOf(arr, hasEvenLength) == 1 });

  // allow to search starting from specific index
  assert(function() { return ArrayUtils.indexOf(arr, 'apple', 1) == -1 });
  assert(function() { return ArrayUtils.indexOf(arr, hasEvenLength, 1) == 1 });
  assert(function() { return ArrayUtils.indexOf(arr, hasEvenLength, 3) == -1 });

});

module("filter", 
  "The filter() method creates a new array with all elements that pass the test implemented by the provided function.", 
  function (assert) 
{
  var arr = [
    { "name":"apple",  "count": 2  },
    { "name":"orange", "count": 5  },
    { "name":"pear",   "count": 3  },
    { "name":"orange", "count": 16 },
  ];

  assert(arr.length == 4, "arr has 4 elements");

  function isOrange(val) { return val.name == "orange"; }
  var newArr = ArrayUtils.filter(arr, isOrange);
  assert(function() { return newArr.length == 2; });
  assert(arr.length == 4, "arr also contains 4 elements");
  assert(function() { return newArr[0].count == 5; });
  assert(function() { return newArr[1]["count"] == 16; });

  function countIsGreaterThan(minCount) 
  {
     // Note: This function will be called for each aray element 
    return function (arrayElement) 
    {
      return arrayElement.count > minCount;
    }
  } 
  var cgt10fn = countIsGreaterThan(10);
  var eArr = ArrayUtils.filter(arr, cgt10fn);
  assert(function() { return eArr.length == 1 && eArr[0].name == "orange"; });

  var zArr = ArrayUtils.filter(arr, countIsGreaterThan(100));
  assert(function() { return zArr.length == 0 && zArr[0] == undefined; });


});

module("forEach", 
  "The forEach() method executes a provided function once per array element.", 
  function (assert) 
{
  var arr = [1,2,3,4,5,6,7,8];

  var str1 = "";
  
  assert(function() { return str1 == ""; });
  ArrayUtils.forEach(arr, function(item) { str1 += item });
  assert(function() { return str1 == "12345678"; });

  var str2 = "";
  ArrayUtils.forEach(arr, function(item, idx) { str2 += idx + ":" + item + "," });
  assert(function() { return str2 == "0:1,1:2,2:3,3:4,4:5,5:6,6:7,7:8,"; });
  
  // check browser console for results
  assert(function() { return ArrayUtils.forEach(arr, function(item) { console.log(item) }) || true });

  // TODO: Create your own test cases
});


module("map", 
  "The map() method creates a new array with the results of calling a provided function on every element in this array.", 
  function (assert) 
{
  var arr = [{firstName:"Colin",lastName:"Toh"},{firstName:"Addy",lastName:"Osmani"},{firstName:"Yehuda",lastName:"Katz"}];

  function toFullName(item) { return item.firstName + " " + item.lastName; };
  var names = ArrayUtils.map(arr, toFullName);
  assert(names.length == 3, "names has 3 elements");
  assert(function() { return names[0] == "Colin Toh" });
  

  // TODO: Create your own test cases

});


module("reduce", 
  "The reduce() method applies a function against an accumulator and each value of the array (from left-to-right) has to reduce it to a single.", 
  function (assert) 
{
  var arr = [4, 6, 5];

  var sum = ArrayUtils.reduce(arr, function(acc, item) { return acc + item }, 0);
  assert(sum == 15, "The sum of all values in arr array should be 15");

  // TODO: use the recuce function to sum all even values from arr2
  var arr2 = [1, 5, 6, 4, 3, 8, 7, 8, 6];
  assert(false, "TODO: use the recuce function to sum all even values from arr2");

  // TODO: Sum the sizes of all those fruits (strings)
  var arr3 = ["apple","orange","apple","orange","pear","orange"];
  assert(false, "TODO: Sum the sizes of all those fruits (strings)");

  // TODO: Get an object with the string size as key, and an array of the related strings as values
  var fruits = ["Acai", "Aceola", "Apple", "Apricots", "Avocado", "Banana", "Blackberry", "Blueberries", "Camu Camu berry", "Cherries", "Coconut", "Cranberry", "Cucumber", "Currents", "Dates", "Durian", "Fig", "Goji berries", "Gooseberry", "Grapefruit", "Grapes", "Jackfruit", "Kiwi", "Kumquat", "Lemon", "Lime", "Lucuma", "Lychee", "Mango", "Mangosteen", "Melon", "Mulberry", "Nectarine", "Orange", "Papaya", "Passion Fruit", "Peach", "Pear", "Pineapple", "Plum", "Pomegranate", "Pomelo", "Prickly Pear", "Prunes", "Raspberries", "Strawberries", "Tangerine/Clementine", "Watermelon"];
  assert(false, "TODO: Get an object with the string size as key, and an array of the related strings as values");
  var res4 = ArrayUtils.reduce(/* ... */); 
  assert(res4["4"].length == 5, "There are 5 fruits with length 4");


  // TODO: Create your own test cases

});

