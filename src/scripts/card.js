import { cardsContainer } from './index.js';
import { openImage, close } from './modal.js';

const newCardContainer = document.querySelector('.popup_type_new-card');
export const newCardUrlInput = newCardContainer.querySelector('.popup__input_type_url');
export const newCardNameInput = newCardContainer.querySelector('.popup__input_type_card-name');

export function likeCard(event) {

  const likeCardButton = event.target;
  likeCardButton.classList.toggle('card__like-button_is-active');

}

export function deleteCard(event) {

  const deleteCardButton = event.target;
  const card = deleteCardButton.closest('.card');
  const cardImage = card.querySelector('.card__image');

  deleteCardButton.removeEventListener('click', deleteCard);
  cardImage.removeEventListener('click', openImage);
  card.remove();

}

export function addCard(card, deleteCard, likeCard) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  deleteCardButton.addEventListener('click', deleteCard);
  likeCardButton.addEventListener('click', likeCard);

  return cardElement;

}

function createNewCard(url, name, deleteCard, likeCard) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = url;
  cardTitle.textContent = name;
  deleteCardButton.addEventListener('click', deleteCard);
  likeCardButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImage);
    
  return cardElement;
  
}

export function newCardSubmit(event) {

    event.preventDefault();

    const cardUrl = newCardUrlInput.value;
    const cardName = newCardNameInput.value;

    const newCard = createNewCard(cardUrl, cardName, deleteCard, likeCard)
    cardsContainer.prepend(newCard);

    close()
}