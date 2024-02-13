import { deleteCardApi, putLikeApi, deleteLikeApi } from './api.js';
import { openImage } from "./index";

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');

function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

function likeCard(event, cardId, countElement) {
  const likeCardButton = event.target;
  const checked = likeCardButton.classList.contains('card__like-button_is-active');
  if (checked) {
    deleteLikeApi(cardId)
    .then((res) => {
      likeCardButton.classList.remove('card__like-button_is-active');
      countElement.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    putLikeApi(cardId)
    .then((res) => {
      likeCardButton.classList.add('card__like-button_is-active');
      countElement.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export function createCardElement(card, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');
  const likeCardCount = cardElement.querySelector('.card__like-count');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  likeCardCount.textContent = card.likes.length;
  likeCardButton.addEventListener('click', (event) => likeCard(event, card._id, likeCardCount));
  cardImage.addEventListener('click', openImage);

  if (card.likes.some(item => item._id === userId)) {
    likeCardButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id === userId) {
    deleteCardButton.addEventListener('click', () => deleteCard(cardElement, card._id));
  } else {
    deleteCardButton.style.display = 'none';
  }

  return cardElement;
}

export function createCard(card, userId) {
  const cardElement = createCardElement(card, userId);
  cardsContainer.prepend(cardElement);
}

export function createCards(cards, userId) {
  cards.forEach(card => {
    const cardElement = createCardElement(card, userId);
    cardsContainer.append(cardElement);
  });
}