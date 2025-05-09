const sidebar = (function () {
  const menuButton = document.querySelector(".menu");
  const sideBarContainer = document.querySelector(".blur-container");
  const sideBar = document.querySelector(".projects");
  const closeButton = document.querySelector(".close");

  menuButton.addEventListener("click", () => {
    sideBarContainer.classList.toggle("active");
    sideBar.classList.toggle("active");
  });

  sideBarContainer.addEventListener("click", (event) => {
    let isSideBarActive = sideBar.classList.contains("active");
    let isValidTarget = event.target.classList.contains("blur-container");
    if (isSideBarActive && isValidTarget) {
      menuButton.click();
    }
  });

  closeButton.addEventListener("click", () => {
    menuButton.click();
  });
})();

export default sidebar;
