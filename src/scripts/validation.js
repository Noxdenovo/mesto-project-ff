export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export function showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

export function hideError(formElement, inputElement, errorClass, inputErrorClass) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.textContent = '';
  error.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

export function isInputValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  } else {
    hideError(
      formElement,
      inputElement,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isInputValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const formButton = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((input) => {
    hideError(formElement, input, validationConfig.errorClass, validationConfig.inputErrorClass);
  });
  formButton.classList.add(validationConfig.inactiveButtonClass);
}
