import Project from "./Project.js";

const projectManager = (function () {
  const projects = [];

  const createNewProject = (name) => {
    let newProject = new Project(name);
    projects.push(newProject);
    return newProject;
  };

  const getProject = (id) => {
    let index = projects.findIndex((project) => project.id === id);
    if (index === -1) return null;

    return projects[index];
  };

  const getAllProjects = () => {
    return projects;
  };

  const addProject = (projectName) => {
    return createNewProject(projectName);
  };

  const editProject = (project, projectName) => {
    if (project.name !== projectName) project.name = projectName;

    return project;
  };

  const removeProject = (projectId) => {
    if (projects.length === 1) {
      return;
    }

    let index = projects.findIndex((project) => project.id === projectId);
    if (index === -1) return;

    projects.splice(index, 1);
  };

  const wipeProjects = () => {
    projects.splice(0, projects.length);
  };

  return {
    getProject,
    getAllProjects,
    addProject,
    editProject,
    removeProject,
    wipeProjects,
  };
})();

export default projectManager;
