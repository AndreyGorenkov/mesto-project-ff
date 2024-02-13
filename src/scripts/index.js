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
const submitButtons = document.querySelectorAll('.popup__button');
const loadingButtons = document.querySelectorAll('.popup__loading-button');

export const openImage = function (event) {

  const imagePopup = document.querySelector('.popup_type_image');
  const url = event.target.src;
  const alt = event.target.alt;
  imagePopup.querySelector(".popup__image").src = url;
  imagePopup.querySelector(".popup__image").alt = alt;
  imagePopup.querySelector(".popup__caption").textContent = alt;
  openModal(imagePopup);

}

function renderLoading(isLoading) {

  if (isLoading) {
    loadingButtons.forEach(item => item.classList.add('loading-text_visible'))
    submitButtons.forEach(item => item.classList.add('button-text_hidden'))
  } else {
    loadingButtons.forEach(item => item.classList.remove('loading-text_visible'))
    submitButtons.forEach(item => item.classList.remove('button-text_hidden'))
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

function profileFormSubmit(event) {

  event.preventDefault();
  renderLoading(true);
  const data = { name: nameInput.value, about: jobInput.value };
  updateUserInfoApi(data).then(result => {
    setUser(result);
    closeModal(document.querySelector('.popup_is-opened'));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
  });
}

function newCardSubmit(event) {


  event.preventDefault();
  renderLoading(true);
  const data = { link: newCardUrlInput.value, name: newCardNameInput.value }
  createCardApi(data)
    .then(card => {
      createCard(card, card.owner._id);
      closeModal(document.querySelector('.popup_is-opened'))
      formElementNew.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function profilePhotoSubmit(event) {

  event.preventDefault();
  renderLoading(true);
  const data = photoInput.value;
  updateUserPhotoApi(data)
  .then(result => {
    setUser(result);
    closeModal(document.querySelector('.popup_is-opened'));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
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
});

profileAvatar.addEventListener('click', function() {
  clearValidation(photoPopup, validationConfig);
  openModal(photoPopup);
});

formElementEdit.addEventListener('submit', profileFormSubmit);
formElementNew.addEventListener('submit', newCardSubmit);
formElementPhoto.addEventListener('submit', profilePhotoSubmit);

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