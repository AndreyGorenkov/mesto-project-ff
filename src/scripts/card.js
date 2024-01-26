export function likeCard(event) {

  const likeCardButton = event.target;
  likeCardButton.classList.toggle('card__like-button_is-active');

}

export function deleteCard(event) {

  const deleteCardButton = event.target;
  const card = deleteCardButton.closest('.card');
  card.remove();

}

export function createNewCard(card, deleteCard, likeCard, openImage) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  deleteCardButton.addEventListener('click', deleteCard);
  likeCardButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImage);

  return cardElement;

}