document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOpen = document.querySelector(".menu-open");
  const menuMobile = document.querySelector(".menu-mobile");
  const menuToggleClose = document.querySelector(".menu-toggle-close");

  menuToggle.addEventListener("click", function () {
    menuOpen.classList.toggle("active");
    menuMobile.classList.toggle("active");
  });
  menuToggleClose.addEventListener("click", function () {
    menuOpen.classList.remove("active");
    menuMobile.classList.remove("active");
  });
});
