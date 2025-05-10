class Project {
  constructor(name) {
    this.id = Date.now();
    this.name = name;
    this.todoItems = [];
  }
}

export default Project;
