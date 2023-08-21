document.addEventListener("DOMContentLoaded", function () {
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const thumbnailPrev = document.querySelector(".nav-thumbnail-prev");
  const thumbnailNext = document.querySelector(".nav-thumbnail-next");

  if (next && prev) {
    // si les éléments next et prev existent
    next.addEventListener("mouseover", function () {
      // écoute le survol de la flèche suivante
      thumbnailNext.style.visibility = "visible"; // affiche la photo suivante
    });

    next.addEventListener("mouseout", function () {
      // écoute la sortie du survol de la flèche suivante
      thumbnailNext.style.visibility = "hidden"; // cache la photo suivante
    });

    prev.addEventListener("mouseover", function () {
      // écoute le survol de la flèche précédente
      thumbnailPrev.style.visibility = "visible"; // affiche la photo précédente
    });

    prev.addEventListener("mouseout", function () {
      // écoute la sortie du survol de la flèche précédente
      thumbnailPrev.style.visibility = "hidden"; // cache la photo précédente
    });
  }
});
