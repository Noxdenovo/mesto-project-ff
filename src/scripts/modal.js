function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEscape);
}

function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEscape);
}

function openPictureModal(evt) {
  const pictureModal = document.querySelector('.popup_type_image');
  pictureModal.querySelector('.popup__image').src = evt.target.src;

  pictureModal.querySelector('.popup__caption').textContent = evt.target
    .closest('.card')
    .querySelector('.card__title').textContent;
  openModal(pictureModal);
}

function closeModalEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export { openModal, closeModal, closeModalEscape, openPictureModal };
