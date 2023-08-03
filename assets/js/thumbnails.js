document.addEventListener("DOMContentLoaded", function () {
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const thumbnailPrev = document.querySelector(".nav-thumbnail-prev");
  const thumbnailNext = document.querySelector(".nav-thumbnail-next");

  if (next && prev) {
    next.addEventListener("mouseover", function () {
      thumbnailNext.style.visibility = "visible";
      console.log("ok");
    });

    next.addEventListener("mouseout", function () {
      thumbnailNext.style.visibility = "hidden";
    });

    prev.addEventListener("mouseover", function () {
      thumbnailPrev.style.visibility = "visible";
      console.log("ok");
    });

    prev.addEventListener("mouseout", function () {
      thumbnailPrev.style.visibility = "hidden";
    });
  }
});
