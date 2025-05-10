const modalForm = (function () {
  const projectForm = document.querySelector(".modal.project");
  const todoForm = document.querySelector(".modal.todo");
  const editTodoForm = document.querySelector(".modal.edit-todo");
  const newProject = document.querySelector(".project-button");
  const newTodo = document.querySelector(".todo-button");

  newProject.addEventListener("click", () => {
    openProjectModal();
  });

  newTodo.addEventListener("click", () => {
    openTodoModal();
  });

  const openProjectModal = () => {
    projectForm.showModal();
  };

  const openTodoModal = () => {
    todoForm.showModal();
  };

  const openEditTodoModal = () => {
    editTodoForm.showModal();
  };

  const closeProjectModal = () => {
    projectForm.close();
    document.getElementById("project-name").value = "";
  };

  const closeTodoModal = () => {
    todoForm.close();
    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-dueDate").value = "";
  };

  const closeEditTodoModal = () => {
    editTodoForm.close();
    document.getElementById("todo-edit-title").value = "";
    document.getElementById("todo-edit-description").value = "";
    document.getElementById("todo-edit-dueDate").value = "";
  };

  return {
    closeProjectModal,
    closeTodoModal,
    openEditTodoModal,
    closeEditTodoModal,
  };
})();

export default modalForm;
