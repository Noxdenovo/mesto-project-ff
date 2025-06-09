const cardTemplate = document.querySelector('#card-template').content;

export function deleteCard(evt) {
  const listItem = evt.target.closest('.places__item');
  listItem.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function addCard(card, deleteFunction, likeFunction, openModalFunction) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = newCard.querySelector('.card__like-button');
  const deleteButton = newCard.querySelector('.card__delete-button');
  newCard.querySelector('.card__image').src = card.link;
  newCard.querySelector('.card__title').textContent = card.name;
  likeButton.addEventListener('click', likeFunction);
  deleteButton.addEventListener('click', deleteFunction);
  newCard.querySelector('.card__image').addEventListener('click', openModalFunction);
  return newCard;
}
