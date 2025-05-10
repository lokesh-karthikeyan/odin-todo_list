class TodoItem {
  constructor(title, description, dueDate, priority, status, projectId) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.projectId = projectId;
  }
}

export default TodoItem;
