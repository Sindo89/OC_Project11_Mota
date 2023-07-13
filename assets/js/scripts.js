document.addEventListener("DOMContentLoaded", function () {
  const contactLink = document.querySelectorAll(".contact-btn a");
  const modal = document.querySelector(".modal");

  contactLink.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      modal.style.display = "flex";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
