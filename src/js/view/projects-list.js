const projectsList = (function () {
  const appendProject = (projects) => {
    let projectsListContainer = document.querySelector(".projects__list");
    let projectTemplate = document.querySelector(".project-template");

    for (let project of projects) {
      let newProject = projectTemplate.content.cloneNode(true);
      newProject.querySelector(".project__name").textContent = project.name;
      newProject.querySelector(".project__details").id = project.id;
      projectsListContainer.append(newProject);
    }
  };

  return { appendProject };
})();

export default projectsList;
