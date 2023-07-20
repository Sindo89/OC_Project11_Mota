document.addEventListener("DOMContentLoaded", function () {
  //********************************************************************* //
  //************************| BURGER MENU |****************************** //
  //********************************************************************* //
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOpen = document.querySelector(".menu-open");
  const menuMobile = document.querySelector(".menu-mobile");
  const menuToggleClose = document.querySelector(".menu-toggle-close");

  menuToggle.addEventListener("click", function () {
    // écoute le click sur le burger
    menuOpen.classList.toggle("active"); // ajouter la class active sur le burger
    menuMobile.classList.toggle("active"); // ajouter la class active sur le menu
  });
  menuToggleClose.addEventListener("click", function () {
    // écoute le click sur la croix
    menuOpen.classList.remove("active"); // retirer la class active sur le burger
    menuMobile.classList.remove("active"); // retirer la class active sur le menu
  });
});
