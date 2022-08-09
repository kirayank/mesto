export class FormValidator {
    constructor(validationConfig, formElement) {
        this.validationConfig = validationConfig; //Сам обьект
        this._formElement = formElement; //Селектор формы, на которую накладывается валидация
        this._inputList = Array.from(this._formElement.querySelectorAll(this.validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this.validationConfig.submitButtonSelector);
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); //изначальное
        inputElement.classList.add(this.validationConfig.inputErrorClass); // добавили стили ошибочному инпуту
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.validationConfig.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.validationConfig.inputErrorClass);
        errorElement.classList.remove(this.validationConfig.errorClass);
        errorElement.textContent = "";
    };

    // Функция, которая проверяет валидность поля
    _checkValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = () => {

        if ((this._hasInvalidInput(this._inputList)) || (this.value === '')) {
            this._buttonElement.classList.add(this.validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = "disabled";
        } else {
            this._buttonElement.classList.remove(this.validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = "";
        }
    };

    _setEventListeners = () => {
        //this._buttonElement;
        if (this._buttonElement){
            this._toggleButtonState(); // Вызвали проверку
        }
        // Пробежались по массиву инпутов, навесили обработчик
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._setEventListeners();
    };
}