function assert(results) 
{
  return assertForResults;

  function assertForResults(condition, message) 
  {

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if(condition == true) li.className = "success";
    else                  li.className = "failure";

    results.appendChild(li);
  }
}


function module(moduleName, tests) 
{
    var modules = document.querySelector("#modules");

    var module = document.createElement("article");
    var h2 = document.createElement("h2");
    var results = document.createElement("ul");
    var date = document.createElement("small"); date.appendChild(document.createTextNode(new Date()))

    h2.appendChild(document.createTextNode(moduleName));
    module.appendChild(h2);
    module.appendChild(date);
    module.appendChild(results);
    modules.appendChild(module);

    var assertForModule = assert(results);

    tests(assertForModule);

}