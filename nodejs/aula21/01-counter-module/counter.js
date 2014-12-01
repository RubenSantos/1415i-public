module.exports.newCounter = function(name, seed) 
{
  var c = seed; // c is a private field 
  var counter = {
    name: name,
    exec: function() 
    {
      c = c + 1;
      console.log(this.name, "=", c);
    }
  };
  Object.preventExtensions( counter );
  return counter;
}

