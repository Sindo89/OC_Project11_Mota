let currentPhotoIndex = -1;
const photos = document.querySelectorAll(".item-gallery");

function openLightbox(index) {
  currentPhotoIndex = index;
  const imageSrc = photos[index].querySelector("img").getAttribute("src");
  const lightboxImage = document.getElementById("lightbox-image");
  lightboxImage.src = imageSrc;
  document.getElementById("lightbox-container").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox-container").style.display = "none";
}

function changePhoto(delta) {
  currentPhotoIndex += delta;
  if (currentPhotoIndex >= photos.length) {
    currentPhotoIndex = 0;
  } else if (currentPhotoIndex < 0) {
    currentPhotoIndex = photos.length - 1;
  }
  openLightbox(currentPhotoIndex);
}

const fullscreenIcons = document.querySelectorAll(".icon-fullscreen");
fullscreenIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => openLightbox(index));
});

document
  .getElementById("lightbox-container")
  .addEventListener("click", closeLightbox);
