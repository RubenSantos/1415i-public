
function Todo(title, description, done) {
	this.id = Todo.id++;
	this.title = title;
	this.description = description;
	this.creationDate = new Date();
	this.done = done || false;
}
Todo.id = 1;

var todos = [
	new Todo("Criar app express", "Criar aplicação express base para iniciar o desenvolvimento deste trabalho usando express.js", true),
	new Todo("Pausa", "Esperar um bocado para os alunos refletirem", true),
	new Todo("Novo Todo", "Adicionar suporte para criar novos Todos. childing monsieurship nyctinastic psammogenous papyroplastics sponsibility oscule stultification haggardly aluminographic subfigure unscreenably hebdomadal ralstonite gobbler tourer bott unsupervised stirpiculturist skegger deistic Astropecten suprasphanoidal peatman"),
	new Todo("Terminar aula", "Terminar a aula quando chegar a hora. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore dolore maxime molestias est nisi consequuntur quae facilis animi qui. Vel enim repudiandae quaerat non amet totam, dolore rerum? Possimus, aliquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum rem expedita minima nemo doloremque, molestiae commodi sunt repellendus atque adipisci vel iusto magni dolorem illo. Dolores, dolore, sapiente."),
];


module.exports.findAll = function()
{
	return todos;
}

module.exports.createNew = function(title, description)
{
	var todo = new Todo(title, description, false);
	todos.push(todo);
	return todo;
};

module.exports.edit = function(todo)
{
	// nothing to do here
	return todo;
};

module.exports.getById = function(id)
{
	for (var i = 0; i < todos.length; ++i)
	{
		if(todos[i].id == id) return todos[i];
	};
	return null;
};


module.exports.checkOrUncheck = function(id)
{
	var todo = module.exports.getById(id);
	todo.done = !todo.done;
};


module.exports.deleteById = function(id)
{
	var i = 0;
	for (; i < todos.length; ++i)
	{
		if(todos[i].id == id) break;
	};

	if(i == todos.length) throw new Error("Cannot delete an unexistent todo. Id: " + id);

	todos.splice(i, 1);
};

