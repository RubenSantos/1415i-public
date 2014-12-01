var counterNumber = 1;

module.exports = function(name, seed) 
{
  var c = seed || 0;
  name = name || "counter" + counterNumber++;
  var counter = {
    name: name,
    exec: function() 
    {
      c = 1 + c;
      console.log(this.name, "=", c);
    }
  };
  Object.preventExtensions( counter );
  return counter;
}

