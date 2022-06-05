//class FormValidator

const objectData = {
    //formSelector: '.popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__span-element',
    errorClass: 'popup__input_type_error'
};

class FormValidator {
    constructor(object, formSelector) {
        this._object = object; //Сам обьект
        this._formSelector = formSelector; //Селектор формы, на которую накладывается валидация
        this._inputList = Array.from(
            this._formSelector.querySelectorAll(this._object.inputSelector)
        );
        //this._buttonElement = this.formElement.querySelector(this._object.submitButtonSelector);
        this._buttonElement = this._formSelector.querySelector(
            this._object.submitButtonSelector
        );
        this._errorElement = this._formSelector.querySelector(
            `.${this._object.inputSelector.id}-error`
        );
    }

    _showInputError = (inputElement) => {
        // this._errorElement = findErrorElement(formElement, inputElement);
        const errorElement = this._formSelector.querySelector(
            `.${inputElement.id}-error`
        );
        inputElement.classList.add(this._object.inputErrorClass); // добавили стили ошибочному инпуту
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._object.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._object.inputErrorClass);
        errorElement.classList.remove(this._object.errorClass);
        errorElement.textContent = "";
    };

    // Функция, которая проверяет валидность поля
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            // showInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._showInputError(inputElement);
        } else {
            // hideInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // Функция принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять

    _toggleButtonState = () => {

        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._object.inactiveButtonClass);
            this._buttonElement.disabled = "disabled";
        } else {
            this._buttonElement.classList.remove(
                this._object.inactiveButtonClass
            );
            this._buttonElement.disabled = "";
        }
    };

    _setEventListeners = () => {
        this._buttonElement;
        this._toggleButtonState(); // Вызвали проверку
        // Пробежались по массиву инпутов, навесили обработчик
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._setEventListeners();
    };
}

function formValidate() {
    const enableValidationAddForm = new FormValidator(objectData, '.popup__addform');
    enableValidationAddForm.enableValidation();
    const enableValidationEditForm = new FormValidator(objectData, '.popup__editform');
    enableValidationEditForm.enableValidation();
};

formValidate();