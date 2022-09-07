import Popup from './Popup.js';
class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}){ //кроме селектора попапа принимает в конструктор колбэк сабмита формы
        super(popupSelector);
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    //собирает данные всех полей формы
    _getInputValues(){
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
            //console.log(input.name, input.value);
        })
        console.log(this._inputValues);
        return this._inputValues;
    }

    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
          });
    }

    //при закрытии попапа форма должна ещё и сбрасываться
    close(){
        super.close();
        this._form.reset();
    }
}

export { PopupWithForm };

