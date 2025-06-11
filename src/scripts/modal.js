function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEscape);
}

function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEscape);
}

function closeModalEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export { openModal, closeModal, closeModalEscape };
