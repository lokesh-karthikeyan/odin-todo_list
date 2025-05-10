import TodoItem from "./TodoItem";

const todoItemManager = (function () {
  const createTodoItem = (
    title,
    description,
    dueDate,
    priority,
    status,
    projectId,
  ) => {
    return new TodoItem(
      title,
      description,
      dueDate,
      priority,
      status,
      projectId,
    );
  };

  const editTodoItem = (todoItem, params) => {
    if (params.title !== todoItem.title) todoItem.title = params.title;
    if (params.description !== todoItem.description)
      todoItem.description = params.description;
    if (params.dueDate !== todoItem.dueDate) todoItem.dueDate = params.dueDate;
    if (params.priority !== todoItem.priority)
      todoItem.priority = params.priority;
    if (params.projectId !== todoItem.projectId)
      todoItem.projectId = params.projectId;
    if (params.status !== todoItem.status) toggleStatus(todoItem);
  };

  const toggleStatus = (todoItem) => {
    const currentStatus = todoItem.status.toLowerCase();
    const today = new Date().toISOString().split("T")[0];

    if (currentStatus === "pending" || currentStatus === "overdue") {
      todoItem.status = "Completed";
      return;
    }

    if (today > todoItem.dueDate) {
      todoItem.status = "Overdue";
    } else {
      todoItem.status = "Pending";
    }

    return todoItem;
  };

  return { createTodoItem, editTodoItem, toggleStatus };
})();

export default todoItemManager;
