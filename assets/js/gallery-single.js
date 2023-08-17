document.addEventListener("DOMContentLoaded", function () {
  let page = 1;
  const loadBtn = document.querySelector(".load-btn");
  const itemsGallery = document.querySelector(".items-gallery");
  const xhr = new XMLHttpRequest();
  const selectedCategory = document
    .querySelector(".category-single")
    .getAttribute("data-category");
  const selectedID = document
    .querySelector(".category-single")
    .getAttribute("data-id");

  function ajaxRequestLoadMore() {
    xhr.open("POST", "/wp-admin/admin-ajax.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const response = xhr.responseText;
        itemsGallery.insertAdjacentHTML("beforeend", response);
        loadBtn.style.display = "none";
      } else {
        console.error("Request failed. Error:", xhr.statusText);
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
    console.log(data);
    xhr.send(data);
  }

  loadBtn.addEventListener("click", function () {
    itemsGallery.innerHTML = "";
    ajaxRequestLoadMore();
  });
});
