function module(moduleName, moduleSubTitle, tests) 
{
    // check existence of 2 or 3 parameters
    if(tests == undefined) { tests = moduleSubTitle; moduleSubTitle = null; }

    var modules = document.querySelector("#modules");

    // Build section on page to display module results
    var module = document.createElement("article");
    var h2 = document.createElement("h2");
    var results = document.createElement("ul");
    var date = document.createElement("aside"); date.appendChild(document.createTextNode(new Date())); date.classList.add("date");
    h2.appendChild(document.createTextNode(moduleName));
    
    if(moduleSubTitle != null) {
        var subTitle = document.createElement("small");
        subTitle.appendChild(document.createTextNode(moduleSubTitle));
        h2.appendChild(subTitle);
    }

    module.appendChild(date);
    module.appendChild(h2);
    module.appendChild(results);
    modules.appendChild(module);

    // Run tests (safe)
    try 
    {
        tests(assert);
    } 
    catch(err) 
    {
        assert(false, "ERROR: " + err);
    }

    ////////////////////////////////////////////////////////////////////////////
    function assert(condition, message) 
    {
        if(message == undefined) return assertFn(condition);

        var li = document.createElement("li");
        li.appendChild(document.createTextNode(message));
        if(condition == true) li.className = "success";
        else                  li.className = "failure";
        results.appendChild(li);
    }

    function assertFn(conditionFn) 
    {
        var message = conditionFn.toString();
        var match = /function\s*\(\s*\)\s\{\s+return\s+(.*)\}/.exec(message);  // match BODY of function in the form of "function() { return BODY }"
        if(match == null) {
            return assert(false, "SYNTAX ERROR: Invalid function format in assert. Use: 'function() { return ASSERT_BODY }'")
        }
        message = match[1];

        var condition = conditionFn();
        return assert(condition, message);
    }

}