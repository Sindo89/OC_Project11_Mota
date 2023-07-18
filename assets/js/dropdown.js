document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("category-select");
  const formatSelect = document.getElementById("format-select");
  const dateSelect = document.getElementById("date-select");
  const galleryItems = document.querySelectorAll(".item-gallery");

  categorySelect.addEventListener("change", filterGallery);
  formatSelect.addEventListener("change", filterGallery);
  dateSelect.addEventListener("change", filterGallery);

  function filterGallery() {
    const selectedCategory = categorySelect.value;
    const selectedFormat = formatSelect.value;
    const selectedYear = dateSelect.value;

    galleryItems.forEach(function (item) {
      const itemCategory = item.getAttribute("data-category");
      const itemFormat = item.getAttribute("data-format");
      const itemYear = item.getAttribute("data-year");

      const showCategory =
        selectedCategory === "" || selectedCategory === itemCategory; //
      const showFormat = selectedFormat === "" || selectedFormat === itemFormat;
      const showYear = selectedYear === "" || selectedYear === itemYear;

      if (showCategory && showFormat && showYear) {
        item.style.display = "block"; // Affiche l'élément s'il correspond aux sélections effectuées
      } else {
        item.style.display = "none"; // Masque l'élément s'il ne correspond pas aux sélections effectuées
      }
    });
  }

  // Personnaliser les select

  var x, i, j, l, ll, selElmnt, a, b, c;

  x = document.getElementsByClassName("custom-select"); // Récupère tous les éléments avec la class custom-select

  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;

    // Pour chaque élément, crée un nouveau DIV qui contiendra la liste des options: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);

    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      // Pour chaque option dans le select, crée un nouveau DIV qui contiendra le nom de l'option
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        // Quand un élément est cliqué, met à jour le select original, et le DIV custom
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
      // Quand l'élément custom est cliqué, ferme tous les autres éléments custom, et ouvre/masque le sien
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    // Ferme tous les éléments custom, sauf celui passé en paramètre
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

  // Si l'utilisateur clique n'importe où en dehors de l'élément, ferme tous les éléments custom
  document.addEventListener("click", closeAllSelect);
});
