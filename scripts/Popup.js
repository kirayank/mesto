export default class Popup {
    constructor(popupSelector){
        this._popupSelector = document.querySelector(popupSelector);
        //this._popupSelector = popupSelector;
        //this._popup = document.querySelector(popupSelector);
        //this._popups = document.querySelectorAll('.popup');
        //this._buttonExit = document.querySelector('.popup__exit');
        this._handleEscClose = this._handleEscClose.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open() {
        console.log(this._popupSelector);
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
      
    close() {
        console.log('меня тыкнули');
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === "Escape"){
            this.close();
        }
    }

    _handleCloseOverlay = (evt) => {
        //this._buttonExit.addEventListener('click', close);
        /*Array.from(this._popups).forEach(popup => {
            popup.addEventListener("mousedown", (evt) => {
                if (evt.target.classList.contains('popup_opened')) { 
                    this.close();}
            })
        })*/
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonExit = this._popupSelector.querySelector('.popup__exit');
        this._popupSelector.addEventListener('mousedown', this._handleCloseOverlay);
        this._buttonExit.addEventListener('click', this.close);
    }

    removeEventListeners() {
        this._popupSelector.removeEventListener('mousedown', this._handleCloseOverlay);
        this._buttonExit.removeEventListener('click', this.close);
    }

}