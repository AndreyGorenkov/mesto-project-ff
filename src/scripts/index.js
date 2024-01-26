import '../pages/index.css';
import { initialCards } from './cards.js';
import { createNewCard, deleteCard, likeCard } from './card.js';
import { openModal, openImage, closeModal } from './modal.js';

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElementEdit = document.forms.editprofile;
const formElementNew = document.forms.newplace;
const closeButtons = document.querySelectorAll('.popup__close');
const newCardContainer = document.querySelector('.popup_type_new-card');
const newCardUrlInput = newCardContainer.querySelector('.popup__input_type_url');
const newCardNameInput = newCardContainer.querySelector('.popup__input_type_card-name');

closeButtons.forEach(item => {

  const closestPopup = item.closest('.popup');
  item.addEventListener('click', () => closeModal(closestPopup));

});

initialCards.forEach(function(card) {

  const newCard = createNewCard(card, deleteCard, likeCard, openImage)
  cardsContainer.append(newCard);

});

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function profileFormSubmit(event) {

    event.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;

    closeModal(document.querySelector('.popup_is-opened'))

}

function newCardSubmit(event) {

  event.preventDefault();

  const cardUrl = newCardUrlInput.value;
  const cardName = newCardNameInput.value;

  const newCard = createNewCard({link: cardUrl, name: cardName}, deleteCard, likeCard, openImage);
  cardsContainer.prepend(newCard);

  closeModal(document.querySelector('.popup_is-opened'))
  formElementNew.reset();
}

profileButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profilePopup);
});

addCardButton.addEventListener('click', function() {
  openModal(cardPopup);
});

formElementEdit.addEventListener('submit', profileFormSubmit);
formElementNew.addEventListener('submit', newCardSubmit); 