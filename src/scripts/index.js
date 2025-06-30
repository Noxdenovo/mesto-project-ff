import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { deleteCard, addCard } from './card.js';
import { enableValidation, clearValidation, validationConfig } from './validation.js';
import {
  getAllCards,
  editUser,
  getUserInfo,
  syncUserInfo,
  addCardAPI,
  deleteCardAPI,
  unlikeCardAPI,
  likeCardAPI,
  editProfileImageAPI,
} from './api.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileModal = document.querySelector('.popup_type_edit');
const profileImageEditButton = document.querySelector('.profile__image-edit_button');
const addButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const editProfilePictureModal = document.querySelector('.popup_type_edit_profile_image');
const pictureModal = document.querySelector('.popup_type_image');
const popupImage = pictureModal.querySelector('.popup__image');
const popupImageCaption = pictureModal.querySelector('.popup__caption');
const modals = [profileModal, addCardModal, pictureModal, editProfilePictureModal];
const profileEditForm = profileModal.querySelector('.popup__form');
const editNameInput = profileEditForm.elements.name;
const editDescriptionInput = profileEditForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const newPlaceForm = addCardModal.querySelector('.popup__form');
const newPlaceNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const newPlaceImageInput = newPlaceForm.querySelector('.popup__input_type_url');
const editProfileImageForm = editProfilePictureModal.querySelector('.popup__form');
const editProfileImageInput = editProfileImageForm.querySelector('.popup__input_type_url');
let userID = null;

function openPictureModal(evt) {
  popupImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target
    .closest('.card')
    .querySelector('.card__title').textContent;
  openModal(pictureModal);
  popupImage.alt = popupImageCaption.textContent;
}

function handleDeleteClick(card, id) {
  deleteCardAPI(id)
    .then(() => deleteCard(card))
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeClick(evt, cardID) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    return unlikeCardAPI(cardID)
      .then((cardData) => {
        evt.target.classList.remove('card__like-button_is-active');
        return cardData.likes;
      })
      .then((likes) => likes);
  } else {
    return likeCardAPI(cardID).then((cardData) => {
      evt.target.classList.add('card__like-button_is-active');
      return cardData.likes;
    });
  }
}

profileEditButton.addEventListener('click', () => {
  const profileEditForm = profileModal.querySelector('.popup__form');
  console.log(profileEditForm);
  openModal(profileModal);
  editDescriptionInput.value = profileDescription.textContent;
  editNameInput.value = profileTitle.textContent;
  clearValidation(profileEditForm, validationConfig);
});

addButton.addEventListener('click', () => {
  openModal(addCardModal);
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
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
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  editUser(editNameInput.value, editDescriptionInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      closeModal(profileModal);
    });
});

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  addCardAPI(newPlaceNameInput.value, newPlaceImageInput.value)
    .then((cardData) => {
      placesList.prepend(
        addCard(
          cardData,
          handleDeleteClick,
          handleLikeClick,
          openPictureModal,
          userID,
          deleteCardAPI
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.target.reset();
      submitButton.textContent = 'Сохранить';
      closeModal(evt.target.closest('.popup'));
    });
});

editProfileImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  editProfileImageAPI(editProfileImageInput.value)
    .then((data) => (profileAvatar.style.backgroundImage = `url(${data.avatar})`))
    .catch((err) => console.log(err))
    .finally(() => {
      evt.target.reset();
      submitButton.textContent = 'Сохранить';
      closeModal(editProfilePictureModal);
    });
});

profileImageEditButton.addEventListener('click', () => {
  openModal(editProfilePictureModal);
  clearValidation(editProfileImageForm, validationConfig);
  editProfileImageForm.reset();
});

enableValidation(validationConfig);

syncUserInfo(profileAvatar, profileTitle, profileDescription);

Promise.all([getAllCards(), getUserInfo()])
  .then(([cardData, userData]) => {
    userID = userData._id;

    cardData.forEach((card) => {
      placesList.append(
        addCard(card, handleDeleteClick, handleLikeClick, openPictureModal, userID, deleteCardAPI)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
