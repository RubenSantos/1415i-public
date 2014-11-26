function duckCount() 
{
  return Array.prototype.reduce.call(arguments, function(count, obj) {
    if( Object.hasOwnProperty.call(obj, 'quack') ) return count+1;
    return count;
  }, 0);
}

function illegalDuckCount() 
{
  var cnt = 0;
  Array.prototype.forEach.call(arguments, function(obj) {
    if( Object.hasOwnProperty.call(obj, 'quack') ) ++cnt;
  });

  return cnt;
}

module.exports = duckCount;