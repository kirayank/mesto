function enableValidation () {
  form.addEventListener('submit', handlerFormSubmit);
  form.addEventListener('input', handlerFormInput);
}

function handlerFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const isValid = form.checkValidity();
  alert(isValid);
}

function handlerFormInput(evt) {
  const form = evt.currentTarget;
  const input = evt.target;

  //1. найти невалидные поля и установить тексты ошибок
  setCustomError(input);
  //2. Показать ошибки пользователям
  setFieldError(input);
  //3. Деактивировать кнопку на невалидной форме

}

function setCustomError(input) {
  const validity = input.validity;

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

enableValidation();

/*const showInputError = (formElement, inputElement, errorMessage, element) => {
  const spanErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(element.inputErrorElement);
  spanErrorElement.textContent = errorMessage;
  spanErrorElement.classList.add(element.spanErrorElement);
};
  
  /*const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };*/
  
  /*const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
     setEventListeners(formElement);
    });
  };
  
  enableValidation({
    formElement: '.popup',
    inputElement: 'input.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorElement: 'popup__input_type_error',
    spanErrorClass: 'popup__input_type_span-error'
  }); */
  