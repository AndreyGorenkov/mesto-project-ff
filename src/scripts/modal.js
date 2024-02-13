export function openModal(element) {

  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeClose);
  element.addEventListener('click', overlayClose);

}

export function closeModal(element) {

  element.classList.remove('popup_is-opened');
  element.classList.add('popup_is-animated');
  document.removeEventListener('keydown', escapeClose);
  element.removeEventListener('click', overlayClose);

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