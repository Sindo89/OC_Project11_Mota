document.addEventListener("DOMContentLoaded", function () {
  const contactLink = document.querySelectorAll(".contact-btn a");
  const modal = document.querySelector(".modal");

  contactLink.forEach((item) => {
    // Récupère chaque élément contactLink
    item.addEventListener("click", function (event) {
      // Ajoute un écouteur d'événement sur chaque élément
      event.preventDefault(); // Empêche le comportement par défaut de l'événement
      modal.style.display = "flex"; // Affiche la modal
    });
  });

  window.addEventListener("click", function (event) {
    // Ajoute un écouteur d'événement sur la fenêtre
    if (event.target === modal) {
      // Si l'événement est la modal
      modal.style.display = "none"; // Cache la modal
    }
  });
});
