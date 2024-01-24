import '../pages/index.css';
import { initialCards } from './cards.js';
import { newCardSubmit, addCard, deleteCard, likeCard, newCardUrlInput, newCardNameInput } from './card.js';
import { handleFormSubmit, open, openImage, nameInput, jobInput } from './modal.js';

const content = document.querySelector('.content');
export const cardsContainer = content.querySelector('.places__list');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
const formElementEdit = document.forms.editprofile;
const formElementNew = document.forms.newplace;

initialCards.forEach(function(card) {

  const newCard = addCard(card, deleteCard, likeCard)
  cardsContainer.append(newCard);  

});

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const images = document.querySelectorAll('.card__image');

images.forEach(function(item) {
  item.addEventListener('click', openImage);
});

profileButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  open(profilePopup);
});

addCardButton.addEventListener('click', function() {
  newCardUrlInput.value = '';
  newCardNameInput.value = '';
  open(cardPopup);
});

formElementEdit.addEventListener('submit', handleFormSubmit);
formElementNew.addEventListener('submit', newCardSubmit); 