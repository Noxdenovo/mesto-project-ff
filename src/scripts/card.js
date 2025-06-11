const cardTemplate = document.querySelector('#card-template').content;

export function deleteCard(card) {
  card.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function addCard(card, deleteFunction, likeFunction, openModalFunction) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = newCard.querySelector('.card__like-button');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  likeButton.addEventListener('click', likeFunction);
  deleteButton.addEventListener('click', () => {
    deleteFunction(newCard);
  });
  cardImage.addEventListener('click', openModalFunction);
  return newCard;
}
