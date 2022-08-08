import { popupImage, popupImageTitle, popupOpenImage } from '../constants.js';
//import { openPopup } from './index.js';

export class Card {
    constructor(data) {
      this._name = data.name;
      this._link = data.link;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector('#element-template')
        .content
        .querySelector('.card')
        .cloneNode(true);
  
      return cardElement;
    }

    //генерация карточки
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.elements__image').src = this._link;
      this._element.querySelector('.elements__image').alt = this._name;
      this._element.querySelector('.elements__name').textContent = this._name;
      return this._element;
    }
  
    _handleOpenPreview() {
      popupImage.src = this._link;
      popupImageTitle.textContent = this._name;
      popupImage.alt = this._name;
      popupOpenImage.classList.add('popup_opened');
    }
  
    _handleClosePreview() {
      popupImage.src = '';
      popupOpenImage.classList.remove('popup_opened');
    }

    //удаление карточки
    _removeCard (evt){
      evt.target.closest('.card').remove();
    }

    //лайк
    _likeCard (evt){
      evt.target.classList.toggle('elements__like_active');
    }
  
    _setEventListeners() {
      this._element.querySelector('.elements__image').addEventListener('click', () => {
        this._handleOpenPreview();
      });

      this._element.querySelector('.elements__trash').addEventListener('click', (evt) => {
          this._removeCard(evt);
      });

      this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
        this._likeCard(evt);
      });
    }
  }
