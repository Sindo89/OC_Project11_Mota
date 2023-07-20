document.addEventListener("DOMContentLoaded", function () {
  //********************************************************************* //
  //**************************| FILTRES |******************************** //
  //********************************************************************* //

  // récupère mes élements html
  const categorySelect = document.getElementById("category-select");
  const formatSelect = document.getElementById("format-select");
  const dateSelect = document.getElementById("date-select");
  const galleryItems = document.querySelectorAll(".item-gallery");

  // écoute le changement de valeur des selects
  categorySelect.addEventListener("change", filterGallery);
  formatSelect.addEventListener("change", filterGallery);
  dateSelect.addEventListener("change", filterGallery);

  function filterGallery() {
    // récupère la valeur des selects
    const selectedCategory = categorySelect.value;
    const selectedFormat = formatSelect.value;
    const selectedYear = dateSelect.value;

    galleryItems.forEach(function (item) {
      // récupère les valeurs des attributs data
      const itemCategory = item.getAttribute("data-category");
      const itemFormat = item.getAttribute("data-format");
      const itemYear = item.getAttribute("data-year");

      // compare les valeurs des selects avec les valeurs des attributs data
      const showCategory =
        selectedCategory === "" || selectedCategory === itemCategory;
      const showFormat = selectedFormat === "" || selectedFormat === itemFormat;
      const showYear = selectedYear === "" || selectedYear === itemYear;

      if (showCategory && showFormat && showYear) {
        // si les valeurs correspondent
        item.style.display = "block"; // Affiche l'élément s'il correspond aux sélections effectuées
      } else {
        // sinon
        item.style.display = "none"; // Masque l'élément s'il ne correspond pas aux sélections effectuées
      }
    });

    if (
      // si tous les selects sont vides
      categorySelect.value === "" &&
      formatSelect.value === "" &&
      dateSelect.value === ""
    ) {
      // affiche tous les éléments
      galleryItems.forEach(function (item) {
        item.style.display = "block";
      });
    }
  }

  //********************************************************************* //
  //*****************| PERSONNALISER LES FILTRES |*********************** //
  //********************************************************************* //

  var x, i, j, l, ll, selElmnt, a, b, c;

  x = document.getElementsByClassName("custom-select"); // récupère tous les éléments avec la class custom-select

  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;

    // pour chaque élément ajoute une DIV qui contiendra la liste des options
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);

    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      // pour chaque option dans le select, ajoute une DIV qui contiendra le nom de l'option
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        // quand un élément est cliqué, met à jour le select original, et le DIV custom
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            filterGallery();
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
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

  document.addEventListener("click", closeAllSelect);

  //********************************************************************* //
  //************************| CHARGER PLUS |***************************** //
  //********************************************************************* //

  let page = 1;
  const loadBtn = document.querySelector(".load-btn");
  const itemsGallery = document.querySelector(".items-gallery");
  const xhr = new XMLHttpRequest();

  function ajaxRequest() {
    xhr.open("POST", "wp-admin/admin-ajax.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const response = xhr.responseText;
        itemsGallery.insertAdjacentHTML("beforeend", response);

        const newPhotos = document.querySelectorAll(".item-gallery");
        const expectedPhotosPerPage = 16;
        if (newPhotos.length <= expectedPhotosPerPage) {
          loadBtn.style.display = "none"; // Masquer le bouton s'il n'y a plus de photos à charger
        }
      } else {
        console.error("Request failed. Error:", xhr.statusText);
      }
    });

    let data = "action=load_more_photos" + "&paged=" + page;
    xhr.send(data);
  }

  loadBtn.addEventListener("click", function () {
    page++;
    ajaxRequest();
  });
});
