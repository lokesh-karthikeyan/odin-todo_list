const todoList = (function () {
  const appendTodo = (todos) => {
    let todoListsContainer = document.querySelector(".todo__list");
    let todoTemplate = document.querySelector(".todo-template");

    for (let todo of todos) {
      let newTodo = todoTemplate.content.cloneNode(true);
      newTodo.querySelector(".todo__title").textContent = todo.title;
      newTodo.querySelector(".todo__description").textContent =
        todo.description;
      newTodo.querySelector(".todo-status").textContent = todo.status;
      newTodo.querySelector(".todo__details").id = todo.id;
      newTodo.querySelector(".todo__details").dataset.project = todo.projectId;
      todoListsContainer.append(newTodo);
    }
  };

  const editTodo = (todoItemId, params) => {
    let todoItemContainer = document.getElementById(todoItemId);

    todoItemContainer.querySelector(".todo__title").textContent = params.title;
    todoItemContainer.querySelector(".todo__description").textContent =
      params.description;
    todoItemContainer.querySelector(".todo-status").textContent = params.status;
    todoItemContainer.dataset.project = params.projectId;
  };

  return { appendTodo, editTodo };
})();

export default todoList;
