document.addEventListener("DOMContentLoaded", function () {
  //********************************************************************* //
  //***********************| FENETRE MODALE |**************************** //
  //********************************************************************* //
  const contactLink = document.querySelectorAll(".contact-btn a");
  const modal = document.querySelector(".modal");

  contactLink.forEach((item) => {
    // récupère chaque élément contactLink (bouton contact dans le menu desktop et mobile)
    item.addEventListener("click", function (event) {
      // écoute le click sur chaque élément
      event.preventDefault(); // empêche le comportement par défaut de l'événement
      modal.style.display = "flex"; // affiche la modale
    });
  });

  window.addEventListener("click", function (event) {
    // écoute le click sur la fenêtre
    if (event.target === modal) {
      // si la modale est ouverte et que l'utilisateur clique en dehors de la modale
      modal.style.display = "none"; // on cache la modale
    }
  });

  window.addEventListener("keydown", function (event) {
    // écoute l'appui sur une touche du clavier
    if (event.key === "Escape") {
      // si la touche Echap est pressée
      modal.style.display = "none"; // on cache la modale
    }
  });

  //********************************************************************* //
  //***********************| FENETRE MODALE SINGLE |********************* //
  //********************************************************************* //
});
