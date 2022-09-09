import Popup from './Popup.js';
class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__picture');
        this._popupImageTitle = this._popup.querySelector('.popup__name');
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImageTitle.textContent = name;
        this._popupImage.alt = name;
        super.open();
    }
}
export { PopupWithImage };