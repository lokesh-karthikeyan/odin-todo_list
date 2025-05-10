const modalForm = (function () {
  const modalContainer = document.querySelector(".modal-container");
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
    modalContainer.classList.toggle("active");
    projectForm.showModal();
  };

  const openTodoModal = () => {
    modalContainer.classList.toggle("active");
    todoForm.showModal();
  };

  const openEditTodoModal = () => {
    modalContainer.classList.toggle("active");
    editTodoForm.showModal();
  };

  const closeProjectModal = () => {
    modalContainer.classList.toggle("active");
    projectForm.close();
    document.getElementById("project-name").value = "";
  };

  const closeTodoModal = () => {
    modalContainer.classList.toggle("active");
    todoForm.close();
    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-dueDate").value = "";
  };

  const closeEditTodoModal = () => {
    modalContainer.classList.toggle("active");
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
