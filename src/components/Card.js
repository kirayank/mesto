export class Card {
    constructor({ data, handleCardClick }, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick; 
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
  
      return cardElement;
    }

    //генерация карточки
    generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.elements__image');
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._element.querySelector('.elements__name').textContent = this._name;
      this._setEventListeners();
      return this._element;
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
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });

      this._element.querySelector('.elements__trash').addEventListener('click', (evt) => {
          this._removeCard(evt);
      });

      this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
        this._likeCard(evt);
      });
    }
  }
