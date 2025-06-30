const cardTemplate = document.querySelector('#card-template').content;

export function deleteCard(card) {
  card.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function addCard(card, handleDeleteClick, likeFunction, openModalFunction, userID) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = newCard.querySelector('.card__like-button');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const cardLikes = newCard.querySelector('.card__likes_display');
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;

  likeButton.addEventListener('click', (evt) => {
    likeFunction(evt, card._id)
      .then((likes) => (cardLikes.textContent = likes.length))
      .catch((err) => {
        console.log(err);
      });
  });
  cardLikes.textContent = card.likes.length;

  const userIDArray = card.likes.map((user) => user._id);
  if (userIDArray.includes(userID)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  if (userID === card.owner._id) {
    deleteButton.addEventListener('click', () => {
      handleDeleteClick(newCard, card._id);
    });
  } else {
    deleteButton.remove();
  }
  cardImage.addEventListener('click', openModalFunction);
  return newCard;
}
