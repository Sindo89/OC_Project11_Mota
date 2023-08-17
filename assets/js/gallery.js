document.addEventListener("DOMContentLoaded", function () {
  //********************************************************************* //
  //**************************| FILTRES |******************************** //
  //********************************************************************* //

  // récupère mes élements html
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
    console.log(e);
    selectedCategory = categorySelect.value;
    selectedFormat = formatSelect.value;
    selectedYear = dateSelect.value;
    currentSelect = e.id; // récupère l'id du select
    if (
      currentSelect === "category-select" && // si le select est celui des catégories et
      selectedCategory !== oldCategory // si la valeur du select est différente de la valeur précédente
    ) {
      page = 1;
      itemsGallery.innerHTML = "";
      ajaxRequest(selectedCategory, selectedFormat, selectedYear);
      oldCategory = selectedCategory;
    }

    if (currentSelect === "format-select" && selectedFormat !== oldFormat) {
      page = 1;
      itemsGallery.innerHTML = "";
      ajaxRequest(selectedCategory, selectedFormat, selectedYear);
      oldFormat = selectedFormat;
    }

    if (currentSelect === "date-select" && selectedYear !== oldYear) {
      page = 1;
      itemsGallery.innerHTML = "";
      ajaxRequest(selectedCategory, selectedFormat, selectedYear);
      oldYear = selectedYear;
    }
    if (
      // si tous les selects sont vides
      selectedCategory === "" &&
      selectedFormat === "" &&
      selectedYear === ""
    ) {
      // affiche seulement les photos de départ
    }
    console.log(page);
  }

  //********************************************************************* //
  //*****************| PERSONNALISER LES FILTRES |*********************** //
  //********************************************************************* //

  var x, i, j, l, ll, selElmnt, a, b, c;

  const dropdown = document.querySelectorAll(".dropdown"); // récupère tous les éléments avec la class dropdown
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
            filterGallery(s); // appel de la fonction filterGallery avec en paramètre le select
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
        itemsGallery.innerHTML = response;
        console.log(response);
        // masquer le bouton charger plus si un filtre est appliqué
        loadBtn.style.display = "none";
      } else {
        console.error("Request failed. Error:", xhr.statusText);
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
    xhr.send(data);
  }

  function ajaxRequestLoadMore() {
    xhr.open("POST", "wp-admin/admin-ajax.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const response = xhr.responseText;
        itemsGallery.insertAdjacentHTML("beforeend", response);
        console.log(response);
        loadBtn.style.display = "none";
      } else {
        console.error("Request failed. Error:", xhr.statusText);
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
    xhr.send(data);
  }

  loadBtn.addEventListener("click", function () {
    page++;
    selectedCategory = categorySelect.value;
    selectedFormat = formatSelect.value;
    selectedYear = dateSelect.value;
    ajaxRequestLoadMore(selectedCategory, selectedFormat, selectedYear);
  });
});
