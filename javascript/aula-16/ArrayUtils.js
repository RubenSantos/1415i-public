// Self Calling Function
(function (global) {

  global.ArrayUtils = {
    indexOf:  indexOf,
    filter:   filter,
    forEach:  forEach,
    map:      function() { return [[{}]] },
    reduce:   function() { }
  }


  ////////////////////////////////////////////////////////////////////////////
  function indexOf(arr, itemOrPredicate, idx) 
  {
      idx = idx || 0;
      var predicate = typeof itemOrPredicate == 'function' ? 
                                  itemOrPredicate : 
                                  function(val) { return val == itemOrPredicate };

      for(var i = idx; i < arr.length; ++i) 
      {
        if(predicate(arr[i])) return i;
      }
      return -1;
  }

  ////////////////////////////////////////////////////////////////////////////
  function filter(arr, predicate) 
  {
      var res = [];
      for(var i = 0; i < arr.length; ++i) 
      {
        var val = arr[i];
        if(predicate(val)) res.push(val);
      }
      return res;
  }

  ////////////////////////////////////////////////////////////////////////////
  function forEach(arr, action) 
  {
      for(var i = 0; i < arr.length; ++i) 
      {
        var val = arr[i];
        action(val, i);
      }
  }


})(this);















