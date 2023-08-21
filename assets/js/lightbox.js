document.addEventListener("DOMContentLoaded", function () {
  // LightBox

  const lightbox = document.querySelector(".lightbox-container");
  const fullscreen = document.querySelectorAll(".icon-fullscreen");
  let currentPhotoIndex = -1;
  const photos = document.querySelectorAll(".item-gallery");
  const arrowPrev = document.querySelector(".lightbox-arrow-prev");
  const arrowNext = document.querySelector(".lightbox-arrow-next");
  const lightboxClose = document.querySelectorAll(".lightbox-close");

  function openLightbox(index) {
    // fonction qui affiche la lightbox
    currentPhotoIndex = index; // on stocke l'index de la photo courante
    const imageSrc = photos[index].querySelector("img").getAttribute("src"); // on récupère l'attribut src de l'image
    const lightboxImage = document.querySelector(".lightbox-image"); // on récupère l'élément lightbox-image
    lightboxImage.src = imageSrc; // on remplace l'attribut src de l'image de la lightbox par l'attribut src de l'image cliquée
    const lightboxRef = document.querySelector(".lightbox-ref"); // on récupère l'élément lightbox-ref
    const lightboxCat = document.querySelector(".lightbox-cat"); // on récupère l'élément lightbox-cat
    lightboxRef.textContent =
      photos[index].querySelector(".photo-reference").textContent; // on remplace le contenu de l'élément lightbox-ref par le contenu de l'élément photo-reference de l'image cliquée
    lightboxCat.textContent =
      photos[index].querySelector(".photo-category").textContent; // on remplace le contenu de l'élément lightbox-cat par le contenu de l'élément photo-category de l'image cliquée
    document.querySelector(".lightbox-container").style.display = "flex"; // on affiche la lightbox
  }

  fullscreen.forEach((item, index) => {
    // récupère chaque élément fullscreen
    item.addEventListener("click", function (event) {
      // écoute le click sur chaque élément
      event.stopPropagation();
      openLightbox(index); // affiche la lightbox
    });
  });

  arrowPrev.addEventListener("click", function () {
    // écoute le click sur la flèche précédente
    if (currentPhotoIndex > 0) {
      // si l'index de la photo courante est supérieur à 0
      openLightbox(currentPhotoIndex - 1); // on affiche la photo précédente
    }
  });

  arrowNext.addEventListener("click", function () {
    // écoute le click sur la flèche suivante
    if (currentPhotoIndex < photos.length - 1) {
      // si l'index de la photo courante est inférieur au nombre de photos - 1
      openLightbox(currentPhotoIndex + 1); // on affiche la photo suivante
    }
  });

  window.addEventListener("click", function (event) {
    // écoute le click sur la fenêtre
    if (event.target === lightbox) {
      // si la lightbox est ouverte et que l'utilisateur clique en dehors de la lightbox
      lightbox.style.display = "none"; // on cache la lightbox
    }
  });

  window.addEventListener("keydown", function (event) {
    // écoute l'appui sur une touche du clavier
    if (event.key === "Escape") {
      // si la touche Echap est pressée
      lightbox.style.display = "none"; // on cache la lightbox
    }
  });

  lightboxClose.forEach((item) => {
    item.addEventListener("click", function (event) {
      // écoute le click sur la croix de la lightbox
      event.preventDefault(); // empêche le comportement par défaut de l'événement
      lightbox.style.display = "none"; // on cache la lightbox
    });
  });

  // SingleLightBox

  const lightboxSingle = document.querySelector(".single-lightbox-container");
  const fullscreenSingle = document.querySelectorAll(".single-icon-fullscreen");
  const lightboxImageSingle = document.querySelector(".single-lightbox-image");
  const lightboxCloseSingle = document.querySelector(".single-lightbox-close");

  function openLightboxSingle(imageUrl) {
    // fonction qui affiche la lightbox
    lightboxImageSingle.src = imageUrl; // on remplace l'attribut src de l'image de la lightbox par l'attribut src de l'image cliquée
    document.querySelector(".single-lightbox-container").style.display = "flex"; // on affiche la lightbox
  }

  fullscreenSingle.forEach((item) => {
    item.addEventListener("click", function (event) {
      // écoute le click sur chaque élément fullscreen
      event.stopPropagation();
      openLightboxSingle(item.dataset.fullscreen); // affiche la lightbox
    });
  });

  window.addEventListener("click", function (event) {
    // écoute le click sur la fenêtre
    if (event.target === lightboxSingle) {
      // si la lightbox est ouverte et que l'utilisateur clique en dehors de la lightbox
      document.querySelector(".single-lightbox-container").style.display =
        "none"; // on cache la lightbox
    }
  });

  window.addEventListener("keydown", function (event) {
    // écoute l'appui sur une touche du clavier
    if (event.key === "Escape") {
      // si la touche Echap est pressée
      document.querySelector(".single-lightbox-container").style.display =
        "none"; // on cache la lightbox
    }
  });

  lightboxCloseSingle.addEventListener("click", function (event) {
    // écoute le click sur la croix de la lightbox
    event.preventDefault(); // empêche le comportement par défaut de l'événement
    document.querySelector(".single-lightbox-container").style.display = "none"; // on cache la lightbox
  });
});
