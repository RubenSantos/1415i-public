
module.exports = function(User, Todo)
{

    ///// DEBUG - SHOULD ONLY BE CONFIGURED IN DEV
    var todos = [
        new Todo(null, "Criar app express", "Criar aplicação express base para iniciar o desenvolvimento deste trabalho usando express.js", new Date(), true),
        new Todo(null, "Pausa",              "Esperar um bocado para os alunos refletirem", new Date(), true),
        new Todo(null, "Novo Todo",          "Adicionar suporte para criar novos Todos. childing monsieurship nyctinastic psammogenous papyroplastics sponsibility oscule stultification haggardly aluminographic subfigure unscreenably hebdomadal ralstonite gobbler tourer bott unsupervised stirpiculturist skegger deistic Astropecten suprasphanoidal peatman", new Date()),
        new Todo(null, "Terminar aula",      "Terminar a aula quando chegar a hora. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore dolore maxime molestias est nisi consequuntur quae facilis animi qui. Vel enim repudiandae quaerat non amet totam, dolore rerum? Possimus, aliquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum rem expedita minima nemo doloremque, molestiae commodi sunt repellendus atque adipisci vel iusto magni dolorem illo. Dolores, dolore, sapiente.", new Date()),
    ];

    var users = [
        new User("cguedes@gmail.com", "Carlos Guedes")
    ];


    Todo.findAll(function(err, dbtodos)
    {
        console.log("INFO: There are", dbtodos.length, "todos in the database");
        if(dbtodos.length == 0) {
            console.log("Empty list of todos. Creating sample todos...");
            todos.forEach(function(todo) {
                Todo.createNew(todo, function() {
                    console.log(" -> sample todo ", todo.title, "created");
                });
            });
        }
    });

    User.findAll(function(err, dbusers)
    {
        console.log("INFO: There are", dbusers.length, "users in the database");
        if(dbusers.length == 0) {
            console.log("Empty list of users. Creating sample users...");
            users.forEach(function(user) {
                User.createNew(user, function() {
                    console.log(" -> sample user ", user.id, "created");
                });
            });
        }
    });

}

