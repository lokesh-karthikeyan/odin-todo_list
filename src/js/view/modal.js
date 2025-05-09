const modalForm = (function () {
  const modalContainer = document.querySelector(".modal-container");
  const projectForm = document.querySelector(".modal.project");
  const newProject = document.querySelector(".project-button");

  newProject.addEventListener("click", () => {
    openModal();
  });

  const openModal = () => {
    modalContainer.classList.toggle("active");
    projectForm.showModal();
  };

  const closeModal = () => {
    modalContainer.classList.toggle("active");
    projectForm.close();
  };

  return { closeModal };
})();

export default modalForm;
