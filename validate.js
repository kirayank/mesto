const objectData = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__span-element',
  errorClass: 'popup__input_type_error'
};

const findErrorElement = (formElement, inputElement) => {
  return formElement.querySelector(`#${inputElement.id}-error`);
};

const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = findErrorElement(formElement, inputElement);
  //inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

const hideInputError = (formElement, inputElement, object) => {
  const errorElement = findErrorElement(formElement, inputElement);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля

const isValid = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, object);
  }
};

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  if (buttonElement){
    toggleButtonState(inputList, buttonElement, object);
  }
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, object) => {
  
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.disabled = "disabled";
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.disabled = "";
  }
}; 

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    setEventListeners(formElement, object);
    });
  };
  
  enableValidation(objectData);

