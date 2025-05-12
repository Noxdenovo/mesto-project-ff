const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function deleteCard(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
}

function addCard(initialCard, deleteFunction) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  newCard.querySelector(".card__image").src = initialCard.link;
  newCard.querySelector(".card__title").textContent = initialCard.name;
  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) => deleteFunction(evt));
  return newCard;
}

initialCards.forEach((element) => {
  placesList.append(addCard(element, deleteCard));
});
