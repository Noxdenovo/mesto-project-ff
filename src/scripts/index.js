import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { deleteCard, addCard, checkLikeStatus, updateLikes } from './card.js';
import { enableValidation, clearValidation, validationConfig } from './validation.js';
import {
  getAllCards,
  editUser,
  getUserInfo,
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

function openPictureModal(cardName, cardLink) {
  popupImage.src = cardLink;
  popupImageCaption.textContent = cardName;
  popupImage.alt = cardName;
  openModal(pictureModal);
}

function handleDeleteClick(card, id) {
  deleteCardAPI(id)
    .then(() => deleteCard(card))
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeClick(likeButton, likesElement, cardID) {
  if (checkLikeStatus(likeButton)) {
    return unlikeCardAPI(cardID)
      .then((cardData) => {
        updateLikes(cardData.likes, likesElement, likeButton);
      })
      .catch((err) => console.log(err));
  } else {
    return likeCardAPI(cardID)
      .then((cardData) => {
        updateLikes(cardData.likes, likesElement, likeButton);
      })
      .catch((err) => console.log(err));
  }
}

profileEditButton.addEventListener('click', () => {
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
      closeModal(profileModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
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
      evt.target.reset();
      closeModal(evt.target.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

editProfileImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  editProfileImageAPI(editProfileImageInput.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      evt.target.reset();
      closeModal(editProfilePictureModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

profileImageEditButton.addEventListener('click', () => {
  openModal(editProfilePictureModal);
  clearValidation(editProfileImageForm, validationConfig);
  editProfileImageForm.reset();
});

enableValidation(validationConfig);

Promise.all([getAllCards(), getUserInfo()])
  .then(([cardData, userData]) => {
    userID = userData._id;
    console.log(userData);
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cardData.forEach((card) => {
      placesList.append(
        addCard(card, handleDeleteClick, handleLikeClick, openPictureModal, userID, deleteCardAPI)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
