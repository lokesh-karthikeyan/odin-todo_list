import appManager from "../model/app-manager";

(function () {
  window.addEventListener("beforeunload", () => {
    let projects = appManager.listProjects();

    localStorage.setItem("app-data", JSON.stringify(projects));
  });

  document.addEventListener("DOMContentLoaded", () => {
    const appData = localStorage.getItem("app-data");

    if (appData) {
      let projectsData = JSON.parse(appData);

      projectsData.forEach((project) => {
        let newProject = appManager.createProject(project.name);
        newProject.id = project.id;
        newProject.todoItems = project.todoItems;
      });
    }
  });
})();
