import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { deleteCard, addCard, likeCard } from './card.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileModal = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const pictureModal = document.querySelector('.popup_type_image');
const popupImage = pictureModal.querySelector('.popup__image');
const popupImageCaption = pictureModal.querySelector('.popup__caption');
const modals = [profileModal, addCardModal, pictureModal];
const profileEditForm = profileModal.querySelector('.popup__form');
const editNameInput = profileEditForm.elements.name;
const editDescriptionInput = profileEditForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newPlaceForm = addCardModal.querySelector('.popup__form');
const newPlaceNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const newPlaceImageInput = newPlaceForm.querySelector('.popup__input_type_url');

function openPictureModal(evt) {
  popupImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target
    .closest('.card')
    .querySelector('.card__title').textContent;
  openModal(pictureModal);
  popupImage.alt = popupImageCaption.textContent;
}

initialCards.forEach((element) => {
  placesList.append(addCard(element, deleteCard, likeCard, openPictureModal));
});

profileEditButton.addEventListener('click', () => {
  openModal(profileModal);
  editDescriptionInput.value = profileDescription.textContent;
  editNameInput.value = profileTitle.textContent;
});

addButton.addEventListener('click', () => {
  openModal(addCardModal);
});

modals.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_content')) {
      evt.stopPropagation();
    }
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
});

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  evt.target.reset();
  closeModal(evt.target.closest('.popup'));
});

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = { name: `${newPlaceNameInput.value}`, link: `${newPlaceImageInput.value}` };
  placesList.prepend(addCard(newCard, deleteCard, likeCard, openPictureModal));
  evt.target.reset();
  closeModal(evt.target.closest('.popup'));
});
