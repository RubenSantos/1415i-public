function assert(condition, message) 
{
  //console.log(condition);
  //console.log(message);  

  var li = document.createElement("li");
  li.appendChild(document.createTextNode(message));
  if(condition == true) li.className = "success";
  else                  li.className = "failure";

  var results = document.getElementById("results");
  results.appendChild(li);
}

function assertEqualsArrays(value, expected, message) 
{
  var ok = true;
  for(var i = 0; i < value.length && ok; ++i) 
  {
    ok = value[i] == expected[i];
  }
  assert(ok, message);
}