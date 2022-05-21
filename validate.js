const objectData = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__span',
  errorClass: 'popup__input_type_error'
};

const findErrorElement = (formElement, inputElement) => {
  return formElement.querySelector(`#${inputElement.id}-error`);
};

const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = findErrorElement(formElement, inputElement);
  inputElement.classList.add(object.inputErrorClass);
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
// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

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

// Вызовем функцию isValid на каждый ввод символа

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

// Функция принимает массив полей

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


//РАБОЧИЙ ВАРИК БЫЛ

/*function enableValidation () {
  editForm.addEventListener('submit', handlerFormSubmit);
  editForm.addEventListener('input', handlerFormInput);
  addForm.addEventListener('submit', handlerFormSubmit);
  addForm.addEventListener('input', handlerFormInput);
}

function handlerFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const isValid = form.checkValidity();
  //alert(isValid);
}

function handlerFormInput(evt) {
  const form = evt.currentTarget;
  const input = evt.target;

  //1. найти невалидные поля и установить тексты ошибок
  setCustomError(input);
  //2. Показать ошибки пользователям
  setFieldError(input);
  //3. Деактивировать кнопку на невалидной форме
  setSubmitButtonState(form);
}

function setCustomError(input) {
  const validity = input.validity;

  input.setCustomValidity('');

  if (validity.tooShort || validity.tooLong){
    const currentLength = input.value.length;
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength');
    input.setCustomValidity(`Строка имеет неверную длину. Диапазон символов от ${min} до ${max}. Текущее количество символов: ${currentLength}.`);
  }

  if (input.typeMismatch){
    input.setCustomValidity(`Чето не то`);
  }
}

function setFieldError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form){
  const buttonSave = form.querySelector('.popup__save');
  const isValid = form.checkValidity();

  if (isValid){
    buttonSave.classList.add('popup__save_valid');
    buttonSave.classList.remove('popup__save_invalid');
    buttonSave.removeAttribute('disabled');
  }
  else{
    buttonSave.classList.remove('popup__save_valid');
    buttonSave.classList.add('popup__save_invalid');
    buttonSave.setAttribute('disabled','disabled');
  }
}

enableValidation();*/