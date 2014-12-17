
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
	new Todo("Novo Todo", "Adicionar suporte para criar novos Todos"),
	new Todo("Terminar aula", "Terminar a aula quando chegar a hora"),
];


module.exports.allTodos = function() 
{
	return todos;
}