document.addEventListener("DOMContentLoaded", function () {
  let page = 1;
  const loadBtn = document.querySelector(".load-btn");
  const itemsGallery = document.querySelector(".items-gallery");
  const xhr = new XMLHttpRequest();
  const selectedCategory = document
    .querySelector(".category-single") // récupérer l'attribut data-category de la div category-single
    .getAttribute("data-category");
  const selectedID = document
    .querySelector(".category-single") // récupérer l'attribut data-id de la div category-single
    .getAttribute("data-id");

  function ajaxRequestLoadMore() {
    xhr.open("POST", "/wp-admin/admin-ajax.php"); // ouvrir la requête ajax
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // définir le type de contenu
    xhr.addEventListener("load", () => {
      // écouter la requête ajax
      if (xhr.status === 200) {
        // 200 = OK
        const response = xhr.responseText; // récupérer le contenu de la requête ajax
        itemsGallery.insertAdjacentHTML("beforeend", response); // ajouter le contenu de la requête ajax à la fin de la div items-gallery
        loadBtn.style.display = "none"; // masquer le bouton charger plus
      } else {
        // 404 = Not Found
        console.error("Request failed. Error:", xhr.statusText); // afficher l'erreur dans la console
      }
    });

    let data =
      "action=load_more_photos" +
      "&paged=" +
      page +
      "&category=" +
      selectedCategory +
      "&post__not_in=" +
      selectedID;
    xhr.send(data); // envoyer la requête ajax avec les données
  }

  loadBtn.addEventListener("click", function () {
    itemsGallery.innerHTML = ""; // vider la div items-gallery
    ajaxRequestLoadMore(); // lancer la requête ajax
  });
});
