import "./css/style.css";
import "./js/view/sidebar.js";
import "./js/storage/local-storage.js";

import appManager from "./js/model/app-manager.js";
import modalForm from "./js/view/modal.js";
import projectsList from "./js/view/projects-list.js";
import todoList from "./js/view/todo-list.js";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    let allProjects = appManager.listProjects();

    if (allProjects.length === 0) {
      appManager.createProject("Origin");
    }

    projectsList.appendProject(allProjects);
    addProjectOptions.appendProject();
    document.querySelector(".all-todos").click();

    let sideBar = document.querySelector(".blur-container");

    if (sideBar.classList.contains("active"))
      document.querySelector(".close").click();
  });
})();

(function () {
  const projectSubmitButton = document.querySelector(".submit-button.project");
  const todoSubmitButton = document.querySelector(".submit-button.todo");
  const editTodo = document.querySelector(".submit-button.edit-todo");

  projectSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let userInput = document.getElementById("project-name").value.trim();

    if (userInput !== "") {
      let newProjectObj = appManager.createProject(userInput);
      projectsList.appendProject([newProjectObj]);
      modalForm.closeProjectModal();
      addProjectOptions.appendProject();
    }
  });

  todoSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let title = document.getElementById("todo-title").value.trim();
    let description = document.getElementById("todo-description").value.trim();
    let dueDate = document.getElementById("todo-dueDate").value.trim();
    let priority = document.getElementById("todo-priority").value.trim();
    let projectId = document.getElementById("todo-project").value.trim();
    let status = "";
    if (
      title !== "" &&
      description !== "" &&
      dueDate !== "" &&
      priority !== "" &&
      projectId !== ""
    ) {
      let newTodoItem = appManager.addTodoItem(
        title,
        description,
        dueDate,
        priority,
        status,
        projectId,
      );
      appManager.toggleStatus(projectId, newTodoItem.id);
      todoList.appendTodo([newTodoItem]);
      modalForm.closeTodoModal();
    }
  });

  editTodo.addEventListener("click", (event) => {
    event.preventDefault();
    let todoItemId = todoActions.getTodoItemId();
    let selectedTodoItem = document.getElementById(todoItemId);

    let params = {
      title: document.getElementById("todo-edit-title").value.trim(),
      description: document
        .getElementById("todo-edit-description")
        .value.trim(),
      dueDate: document.getElementById("todo-edit-dueDate").value.trim(),
      priority: document.getElementById("todo-edit-priority").value.trim(),
      projectId: selectedTodoItem.dataset.project,
      status: document.querySelector(".todo-status").textContent.trim(),
    };
    appManager.editTodoItem(params.projectId, todoItemId, params);
    todoList.editTodo(todoItemId, params);
    modalForm.closeEditTodoModal();
  });
})();

(function () {
  const projectsList = document.querySelector(".projects__list");
  let projectId;

  projectsList.addEventListener("click", (event) => {
    let target = event.target;
    let selectedProject = target.closest(".project__details");
    projectId = Number(selectedProject.id);

    if (target.classList.contains("edit-button")) {
      let projectNameButton = selectedProject.querySelector(".project__name");

      let inputField = document.createElement("input");
      inputField.type = "text";
      inputField.classList.add("project__name");
      inputField.value = projectNameButton.textContent;
      projectNameButton.replaceWith(inputField);
      inputField.focus();

      inputField.addEventListener("blur", () => {
        const newProjectName =
          inputField.value.trim() || projectNameButton.textContent;

        const newProjectButton = document.createElement("button");
        newProjectButton.classList.add("project__name");
        newProjectButton.textContent = newProjectName;

        appManager.editProject(projectId, newProjectButton.textContent);
        inputField.replaceWith(newProjectButton);
        addProjectOptions.appendProject();
      });
    }

    if (target.classList.contains("remove-button")) {
      let projects = [...document.querySelectorAll(".project__details")];

      if (projects.length === 1) {
        alert("Atleast one project should be preserved.");
        return;
      }
      let todoItems = [
        ...document.querySelectorAll(`[data-project="${projectId}"]`),
      ];

      for (let todoItem of todoItems) {
        todoItem.remove();
      }
      appManager.removeProject(projectId);
      selectedProject.remove();
      addProjectOptions.appendProject();
    }

    if (target.classList.contains("project__name")) {
      let todoItems = appManager.getProject(projectId)?.todoItems;
      let todoContainer = document.querySelector(".todo__list");
      todoContainer.replaceChildren();
      todoList.appendTodo(todoItems);

      let sideBar = document.querySelector(".blur-container");

      if (sideBar.classList.contains("active"))
        document.querySelector(".close").click();
    }
  });
})();

(function () {
  let allTodoItems = document.querySelector(".all-todos");
  let todoContainer = document.querySelector(".todo__list");

  allTodoItems.addEventListener("click", () => {
    let allProjects = appManager.listProjects();
    todoContainer.replaceChildren();

    for (let project of allProjects) {
      todoList.appendTodo(project.todoItems);
    }
    let sideBar = document.querySelector(".blur-container");

    if (sideBar.classList.contains("active"))
      document.querySelector(".close").click();
  });
})();

const addProjectOptions = (function () {
  const formModal = document.getElementById("todo-project");

  const appendProject = () => {
    let allProjects = appManager.listProjects();
    formModal.replaceChildren();

    for (let project of allProjects) {
      const optionInput = document.createElement("option");
      optionInput.value = project.id;
      optionInput.textContent = project.name;
      formModal.append(optionInput);
    }
  };

  return { appendProject };
})();

const todoActions = (function () {
  let todoList = document.querySelector(".todo__list");
  let selectedTodoItem;

  todoList.addEventListener("click", (event) => {
    let target = event.target;
    selectedTodoItem = target.closest(".todo__details").id;
    let sourceProject = target.closest(".todo__details").dataset.project;

    if (target.classList.contains("todo-status")) {
      appManager.toggleStatus(sourceProject, selectedTodoItem);
      let currentTodoItem = appManager.getTodoItem(
        sourceProject,
        selectedTodoItem,
      );
      target.textContent = currentTodoItem.status;
    }

    if (target.classList.contains("edit-button")) {
      modalForm.openEditTodoModal();
      let currentTodoItem = appManager.getTodoItem(
        sourceProject,
        selectedTodoItem,
      );

      document.getElementById("todo-edit-title").value = currentTodoItem.title;
      document.getElementById("todo-edit-description").value =
        currentTodoItem.description;
      document.getElementById("todo-edit-dueDate").value =
        currentTodoItem.dueDate;
      document.getElementById("todo-edit-priority").value =
        currentTodoItem.priority;
    }

    if (target.classList.contains("remove-button")) {
      let toBeRemoved = document.getElementById(selectedTodoItem);
      let projectId = toBeRemoved.dataset.project;

      appManager.removeTodoItem(projectId, selectedTodoItem);
      toBeRemoved.remove();
    }
  });

  const getTodoItemId = () => {
    return selectedTodoItem;
  };

  return { getTodoItemId };
})();
