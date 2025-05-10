import projectManager from "./project/project-manager.js";
import todoItemManager from "./todo-item/todo-item-manager.js";

const appManager = (function () {
  const createProject = (name) => {
    return projectManager.addProject(name);
  };

  const editProject = (id, name) => {
    let currentProject = projectManager.getProject(id);
    projectManager.editProject(currentProject, name);

    return currentProject;
  };

  const removeProject = (id) => {
    return projectManager.removeProject(id);
  };

  const getProject = (id) => {
    return projectManager.getProject(Number(id));
  };

  const listProjects = () => {
    return projectManager.getAllProjects();
  };

  const wipeProjects = () => {
    return projectManager.wipeProjects();
  };

  const addTodoItem = (
    title,
    description,
    dueDate,
    priority,
    status,
    projectId,
  ) => {
    let currentProject = projectManager.getProject(Number(projectId));
    let newTodoItem = todoItemManager.createTodoItem(
      title,
      description,
      dueDate,
      priority,
      status,
      projectId,
    );
    currentProject.todoItems.push(newTodoItem);
    return newTodoItem;
  };

  const editTodoItem = (projectId, todoItemId, params) => {
    let currentTodoItem = getTodoItem(Number(projectId), todoItemId);
    todoItemManager.editTodoItem(currentTodoItem, params);
  };

  const toggleStatus = (projectId, todoItemId) => {
    let currentTodoItem = getTodoItem(Number(projectId), todoItemId);
    todoItemManager.toggleStatus(currentTodoItem);
  };

  const removeTodoItem = (projectId, todoItemId) => {
    let currentProject = projectManager.getProject(Number(projectId));
    let index = currentProject.todoItems.findIndex(
      (todoItem) => todoItem.id === todoItemId,
    );

    if (index === -1) return;
    currentProject.todoItems.splice(index, 1);
  };

  const getTodoItem = (projectId, todoItemId) => {
    let currentProject = projectManager.getProject(Number(projectId));
    let currentTodoItem = currentProject.todoItems.find(
      (todoItem) => todoItem.id === todoItemId,
    );

    return currentTodoItem;
  };

  return {
    createProject,
    editProject,
    removeProject,
    listProjects,
    getProject,
    wipeProjects,
    addTodoItem,
    editTodoItem,
    getTodoItem,
    toggleStatus,
    removeTodoItem,
  };
})();

export default appManager;
