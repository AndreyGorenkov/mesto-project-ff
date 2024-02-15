export function openModal(element) {

  setTimeout(() => {
    element.classList.add('popup_is-opened');
  }, 50);
  element.classList.add('popup_is-animated');
  document.addEventListener('keydown', handleEscape);
  element.addEventListener('click', handleOverlay);

}

export function closeModal(element) {

  element.classList.remove('popup_is-opened');
  element.classList.remove('popup_is-animated');
  document.removeEventListener('keydown', handleEscape);
  element.removeEventListener('click', handleOverlay);

}

function handleEscape(event) {

  if (event.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'));
  }

}

function handleOverlay(event) {

  if (event.target.classList.contains('popup')) {
    closeModal(event.currentTarget);
  }

}