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
  //***********************| FENETRE MODALE SINGLE AVEC REF |********** * //
  //********************************************************************* //

  const contactBtnSingle = document.querySelector(".contact-btn-single");
  const refPhoto = document
    .querySelector(".reference-single")
    .getAttribute("data-ref"); // récupère la valeur de l'attribut data-ref de l'élément .reference-single
  const refField = document.querySelector(".ref-field"); // récupère l'élément .ref-field

  contactBtnSingle.addEventListener("click", function (event) {
    // écoute le click sur le bouton contact de la page single
    event.preventDefault(); // empêche le comportement par défaut de l'événement
    refField.value = refPhoto; // remplace la valeur de l'attribut value de l'élément .ref-field par la valeur de l'attribut data-ref de l'élément .reference-single
    modal.style.display = "flex"; // affiche la modale
  });
});
