export const openImage = function (event) {

  const imagePopup = document.querySelector('.popup_type_image');
  const url = event.target.src;
  const alt = event.target.alt;
  imagePopup.querySelector(".popup__image").src = url;
  imagePopup.querySelector(".popup__image").alt = alt;
  imagePopup.querySelector(".popup__caption").textContent = alt;
  openModal(imagePopup);

}

export function openModal(element) {

  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeClose);
  element.addEventListener('click', overlayClose);

}

export function closeModal(element) {

  element.classList.remove('popup_is-opened');
  element.classList.add('popup_is-animated');
  document.removeEventListener('keydown', escapeClose);

}

function escapeClose(event) {

  if (event.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'));
  }

}

function overlayClose(event) {

  if (event.target.classList.contains('popup')) {
    closeModal(event.currentTarget);
  }

}