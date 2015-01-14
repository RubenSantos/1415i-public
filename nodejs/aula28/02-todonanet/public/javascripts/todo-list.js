
function removeTodo(id) {

    var todoElem = document.getElementById("todo-" + id);
    var todoElementTitle = todoElem.querySelector("h3.title .titlevalue").innerText;
    var ok = confirm("Pretende mesmo remover o todo '" + todoElementTitle + "'?");

    if(ok) {

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/todos/delete/" + id, true);
        xhr.onload = function()
        {
            if(this.readyState == 4) {
                if(this.status == 200) processSuccess(this);
                else                   processError(this);
            }
        }
        xhr.send();
    }

    return false;

    function processSuccess(xhr)
    {
        todoElem.parentNode.removeChild(todoElem);
    }

    function processError(xhr)
    {
        // TODO: NÃO FAZER ISTO! (apresentar um alert ao utilizador)
        alert("ERROR: " + xhr.status);
    }
}


