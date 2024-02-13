export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonElementSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorSelector: '.popup__input-type-error_is-active',
    inputErrorClass: 'popup__input-type-error_is-active',
    errorSelector: '.popup__input-error_is-active',
    errorClass: 'popup__input-error_is-active'
};

export const clearValidation = (form, validationConfig) => {
  form.querySelectorAll(validationConfig.inputErrorSelector).forEach(error => {
    error.classList.remove(validationConfig.inputErrorClass);
  });
  
  form.querySelectorAll(validationConfig.errorSelector).forEach(input => {
    input.classList.remove(validationConfig.errorClass);
  });
  
  if (validationConfig.buttonElementSelector) {
    const buttonElement = document.querySelector(validationConfig.buttonElementSelector);
    if (buttonElement) {
      buttonElement.disabled = true;
    }
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
  
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement) => {
  
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 
  
const toggleButtonState = (inputList, buttonElement) => {
  
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}; 
  
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.buttonElementSelector);
  
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 
  
export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  
  setEventListeners(formElement);
  
  });
    
};