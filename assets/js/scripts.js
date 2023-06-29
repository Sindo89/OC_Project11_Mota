document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNavigation = document.querySelector(".main-navigation");
  const menuToggleClose = document.querySelector(".menu-toggle-close");

  menuToggle.addEventListener("click", function () {
    mainNavigation.classList.toggle("active");
  });
  menuToggleClose.addEventListener("click", function () {
    mainNavigation.classList.remove("active");
  });
});
