import { profileName, profileJob } from './index.js';

const imagePopup = document.querySelector('.popup_type_image');

export const openImage = function (event) {

  const url = event.target.src;
  imagePopup.querySelector(".popup__image").src = url;
  open(imagePopup);

}

export function open(element) {

  const closeButton = element.querySelector('.popup__close');

  element.classList.add('popup_is-opened');
  closeButton.addEventListener('click', close);
  document.addEventListener('keydown', escapeClose);
  element.addEventListener('click', overlayClose);

}
  
export function close() {
  
  const popupOpen = document.querySelector('.popup_is-opened');
  const closeButton = popupOpen.querySelector('.popup__close');

  popupOpen.classList.remove('popup_is-opened');
  popupOpen.classList.add('popup_is-animated');
  closeButton.removeEventListener('click', close);
  document.removeEventListener('keydown', escapeClose);
  popupOpen.removeEventListener('click', overlayClose);

}
  
function escapeClose(event) {

  if (event.key === "Escape") {
    close();
  }

}
  
function overlayClose(event) {

  if (event.target.classList.contains('popup')) {
    close();
  }

}

const formElement = document.querySelector('.popup__form');
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');

export function handleFormSubmit(event) {

    event.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;

    close()

}