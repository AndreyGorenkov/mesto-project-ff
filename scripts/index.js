// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const addButton = content.querySelector('.profile__edit-button');

function deleteCard(event) {
  const deleteCardButton = event.target;
  const card = deleteCardButton.closest('.card');
  card.remove();
}

function addCard(card, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__description').textContent = card.name;
    
    deleteCardButton.addEventListener('click', deleteCard);
    
    return cardElement;
}

initialCards.forEach(function(card) {
  const newCard = addCard(card, deleteCard)
  cardsContainer.append(newCard);  
});