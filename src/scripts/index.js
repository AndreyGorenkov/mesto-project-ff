import '../pages/index.css';
import { createCards, createCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { validationConfig, clearValidation, enableValidation } from './validation.js';
import { getCardsApi, getUserInfoApi, createCardApi, updateUserInfoApi, updateUserPhotoApi } from './api.js';

const formElementEdit = document.forms.editprofile;
const formElementNew = document.forms.newplace;
const formElementPhoto = document.forms.editprofilepfoto;
const closeButtons = document.querySelectorAll('.popup__close');
const profilePopup = document.querySelector('.popup_type_edit');
const profilePhotoPopup = document.querySelector('.popup_type_edit-photo');
const cardPopup = document.querySelector('.popup_type_new-card');
const photoPopup = document.querySelector('.popup_type_edit-photo');
const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const newCardUrlInput = newCardPopup.querySelector('.popup__input_type_url');
const newCardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const photoInput = profilePhotoPopup.querySelector('.popup__input_photo_url');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupElement = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');




// Крутое ревью. После сдачи практической обязательно перечитаю ещё раз все замечания и исправлю все "Можно лучше".




export const openImage = function (event) {

  imagePopupElement.src = event.target.src;
  imagePopupElement.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.alt;
  openModal(imagePopup);

}

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {

  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }

}

closeButtons.forEach(item => {
  const closestPopup = item.closest('.popup');
  item.addEventListener('click', () => closeModal(closestPopup));
});


function setUser({ name, avatar, about }) {
  profileName.textContent = name;
  profileJob.textContent = about;
  profileAvatar.src = avatar;
}

function handleProfileFormSubmit(event) {

  const button = event.submitter;
  event.preventDefault();
  renderLoading(true, button);
  const data = { name: nameInput.value, about: jobInput.value };
  updateUserInfoApi(data).then(result => {
    setUser(result);
    closeModal(profilePopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, button);
  });
}

function handleNewCardSubmit(event) {

  const button = event.submitter;
  event.preventDefault();
  renderLoading(true, button);
  const data = { link: newCardUrlInput.value, name: newCardNameInput.value }
  createCardApi(data)
    .then(card => {
      createCard(card, card.owner._id);
      closeModal(cardPopup)
      formElementNew.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

function handleProfilePhotoSubmit(event) {

  const button = event.submitter;
  event.preventDefault();
  renderLoading(true, button);
  const data = photoInput.value;
  updateUserPhotoApi(data)
  .then(result => {
    setUser(result);
    closeModal(photoPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, button);
  });
}

profileButton.addEventListener('click', function() {
  clearValidation(profilePopup, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profilePopup);
});

addCardButton.addEventListener('click', function() {
  clearValidation(cardPopup, validationConfig);
  openModal(cardPopup);
  enableValidation(validationConfig);
});

profileAvatar.addEventListener('click', function() {
  clearValidation(photoPopup, validationConfig);
  openModal(photoPopup);
});

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementNew.addEventListener('submit', handleNewCardSubmit);
formElementPhoto.addEventListener('submit', handleProfilePhotoSubmit);

enableValidation(validationConfig);

function init() {
  Promise.all([getUserInfoApi(), getCardsApi()])
    .then(([user, cards]) => {
      createCards(cards, user._id);
      setUser(user);
    })
    .catch((err) => {
      console.log(err);
    });
}

init()