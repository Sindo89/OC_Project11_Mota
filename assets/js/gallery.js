document.addEventListener("DOMContentLoaded", function () {
  //********************************************************************* //
  //**************************| FILTRES |******************************** //
  //********************************************************************* //

  // récupère mes élements html et initialise les variables
  const categorySelect = document.getElementById("category-select");
  const formatSelect = document.getElementById("format-select");
  const dateSelect = document.getElementById("date-select");
  let oldCategory = null;
  let oldFormat = null;
  let oldYear = null;

  // écoute le changement de valeur des selects

  categorySelect.addEventListener("change", function () {
    filterGallery("category");
  });
  formatSelect.addEventListener("change", function () {
    filterGallery("format");
  });
  dateSelect.addEventListener("change", function () {
    filterGallery("date");
  });

  function filterGallery(e) {
    // récupère la valeur des selects
    selectedCategory = categorySelect.value;
    selectedFormat = formatSelect.value;
    selectedYear = dateSelect.value;
    currentSelect = e.id; // récupère l'id du select
    if (
      currentSelect === "category-select" && // si le select est celui des catégories et
      selectedCategory !== oldCategory // si la valeur du select est différente de la valeur précédente
    ) {
      page = 1; // remet la valeur de la page à 1
      itemsGallery.innerHTML = ""; // vide la div items-gallery
      ajaxRequest(selectedCategory, selectedFormat, selectedYear); // appel de la fonction ajaxRequest avec en paramètre la valeur du select
      oldCategory = selectedCategory; // met à jour la valeur du select
    }

    if (currentSelect === "format-select" && selectedFormat !== oldFormat) {
      // si le select est celui des formats et si la valeur du select est différente de la valeur précédente
      page = 1; // remet la valeur de la page à 1
      itemsGallery.innerHTML = ""; // vide la div items-gallery
      ajaxRequest(selectedCategory, selectedFormat, selectedYear); // appel de la fonction ajaxRequest avec en paramètre la valeur du select
      oldFormat = selectedFormat; // met à jour la valeur du select
    }

    if (currentSelect === "date-select" && selectedYear !== oldYear) {
      // si le select est celui des dates et si la valeur du select est différente de la valeur précédente
      page = 1; // remet la valeur de la page à 1
      itemsGallery.innerHTML = ""; // vide la div items-gallery
      ajaxRequest(selectedCategory, selectedFormat, selectedYear); // appel de la fonction ajaxRequest avec en paramètre la valeur du select
      oldYear = selectedYear; // met à jour la valeur du select
    }
    if (
      // si tous les selects sont vides
      selectedCategory === "" &&
      selectedFormat === "" &&
      selectedYear === ""
    ) {
      // affiche seulement les photos de départ
    }
  }

  //********************************************************************* //
  //*****************| PERSONNALISER LES FILTRES |*********************** //
  //********************************************************************* //

  var x, i, j, l, ll, selElmnt, a, b, c; // initialise les variables

  x = document.getElementsByClassName("custom-select"); // récupère tous les éléments avec la class custom-select

  l = x.length; // récupère le nombre d'éléments avec la class custom-select
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0]; // récupère le select
    ll = selElmnt.length; // récupère le nombre d'options dans le select

    // pour chaque élément ajoute une DIV qui contiendra la liste des options
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected"); // ajoute la class select-selected
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML; // récupère le nom de l'option sélectionnée
    x[i].appendChild(a); // ajoute la DIV à l'élément parent

    b = document.createElement("DIV"); // crée une DIV qui contiendra la liste des options
    b.setAttribute("class", "select-items select-hide"); // ajoute la class select-items et select-hide
    for (j = 1; j < ll; j++) {
      // pour chaque option dans le select, ajoute une DIV qui contiendra le nom de l'option
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        // quand un élément est cliqué, met à jour le select original, et le DIV custom
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0]; // récupère le select
        sl = s.length; // récupère le nombre d'options dans le select
        h = this.parentNode.previousSibling; // récupère le DIV qui contient le nom de l'option sélectionnée
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            // si le nom de l'option est le même que celui de l'élément cliqué
            s.selectedIndex = i; // met à jour le select
            h.innerHTML = this.innerHTML; // met à jour le DIV qui contient le nom de l'option sélectionnée
            y = this.parentNode.getElementsByClassName("same-as-selected"); // récupère tous les éléments avec la class same-as-selected
            yl = y.length; // récupère le nombre d'éléments avec la class same-as-selected
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class"); // supprime la class same-as-selected
            }
            this.setAttribute("class", "same-as-selected"); // ajoute la class same-as-selected
            filterGallery(s); // appel de la fonction filterGallery avec en paramètre le select
            break; // arrête la boucle
          }
        }
        h.click(); // ferme le select
      });
      b.appendChild(c); // ajoute la DIV à l'élément parent
    }
    x[i].appendChild(b); // ajoute la DIV à l'élément parent
    a.addEventListener("click", function (e) {
      // quand l'élément est cliqué, ferme tous les autres selects, et ouvre ou ferme le select cliqué
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
      if (window.matchMedia("(max-width: 1023px)").matches) {
        if (this.classList.contains("select-arrow-active")) {
          onSelectorOpen(this); // Appel de la fonction quand le select est ouvert
        } else {
          onSelectorClose(); // Appel de la fonction quand le select est fermé
        }
      }
    });
  }

  function closeAllSelect(elmnt) {
    // ferme tous les selects sauf celui cliqué
    var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllSelect(e.target); // Utilisation de l'élément cliqué pour fermer les sélecteurs
    if (window.matchMedia("(max-width: 1023px)").matches) {
      onSelectorClose(); // Appel de la fonction quand un élément est cliqué pour fermer les sélecteurs
    }
  });

  // pour la version mobile
  function onSelectorOpen(selector) {
    // Quand le select est ouvert
    const scrollHeight = selector.scrollHeight; // Récupére la taille du scroll
    const dropdownContainer = selector.closest(".dropdown-container"); // Récupére le conteneur du select
    dropdownContainer.style.height = scrollHeight - 11 + "rem"; // Ajuste la hauteur du conteneur en fonction de la taille du scroll
  }

  function onSelectorClose() {
    const dropdownContainers = document.querySelectorAll(".dropdown-container");
    dropdownContainers.forEach((container) => {
      container.style.height = ""; // Rétablir la hauteur d'origine
    });
  }

  //********************************************************************* //
  //************************| CHARGER PLUS |***************************** //
  //********************************************************************* //

  let page = 1;
  const loadBtn = document.querySelector(".load-btn");
  const itemsGallery = document.querySelector(".items-gallery");
  const xhr = new XMLHttpRequest();

  function ajaxRequest() {
    // fonction pour charger les photos avec les filtres
    xhr.open("POST", "wp-admin/admin-ajax.php"); // ouvre la requête ajax
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // défini le type de contenu
    xhr.addEventListener("load", () => {
      // écoute le chargement de la requête
      if (xhr.status === 200) {
        // si la requête est un succès
        const response = xhr.responseText; // récupère la réponse
        itemsGallery.innerHTML = response; // ajoute la réponse à la div items-gallery
        loadBtn.style.display = "none"; // cache le bouton charger plus
      } else {
        // si la requête est un échec
        console.error("Request failed. Error:", xhr.statusText); // affiche une erreur
      }
    });

    let data = "action=load_more_photos" + "&paged=" + page;
    if (selectedCategory != "") {
      data += "&category=" + selectedCategory;
    }
    if (selectedFormat != "") {
      data += "&format=" + selectedFormat;
    }
    if (selectedYear != "") {
      data += "&year=" + selectedYear;
    }
    xhr.send(data); // envoie la requête ajax avec les paramètres sélectionnés
  }

  function ajaxRequestLoadMore() {
    // fonction pour charger plus de photos
    xhr.open("POST", "wp-admin/admin-ajax.php"); // ouvre la requête ajax
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // défini le type de contenu
    xhr.addEventListener("load", () => {
      // écoute le chargement de la requête
      if (xhr.status === 200) {
        // si la requête est un succès
        const response = xhr.responseText; // récupère la réponse
        itemsGallery.insertAdjacentHTML("beforeend", response); // ajoute la réponse à la div items-gallery
        loadBtn.style.display = "none"; // cache le bouton charger plus
      } else {
        // si la requête est un échec
        console.error("Request failed. Error:", xhr.statusText); // affiche une erreur
      }
    });

    let data = "action=load_more_photos" + "&paged=" + page;
    if (selectedCategory != "") {
      data += "&category=" + selectedCategory;
    }
    if (selectedFormat != "") {
      data += "&format=" + selectedFormat;
    }
    if (selectedYear != "") {
      data += "&year=" + selectedYear;
    }
    xhr.send(data); // envoie la requête ajax avec les paramètres sélectionnés
  }

  loadBtn.addEventListener("click", function () {
    // écoute le clic sur le bouton charger plus
    page++; // incrémente la valeur de la page
    // récupère la valeur des selects
    selectedCategory = categorySelect.value;
    selectedFormat = formatSelect.value;
    selectedYear = dateSelect.value;
    ajaxRequestLoadMore(selectedCategory, selectedFormat, selectedYear); // appel de la fonction ajaxRequestLoadMore avec en paramètre la valeur des selects
  });
});
