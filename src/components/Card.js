export class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data.id;
      this._userId = data.userId;
      this._ownerId = data.ownerId;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick; 
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
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
      this._trash = this._element.querySelector('.elements__trash');
      this._like = this._element.querySelector('.elements__like');
      this._elementImage = this._element.querySelector('.elements__image');
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._element.querySelector('.elements__name').textContent = this._name;
      this.setLikes(this._likes);
      this.showTrash();
      this._setEventListeners();
      return this._element;
    }

    //удаление карточки
    removeCard (){
      this._element.remove();
    }
    //показать иконку помойки
    showTrash() {
      if(this._ownerId !== this._userId){
        this._trash.style.display = 'none';
      }
    }

    isLiked() {
      const likedCard = this._likes.find(user => user._id === this._userId);
      return likedCard
    }

    //лайк
    _likeCard (){
      this._like.classList.add('elements__like_active');
    }

    _dislikeCard(){
      this._like.classList.remove('elements__like_active');
    }

    setLikes(newLikes) {
      this._likes = newLikes;
      const likeCountElement = this._element.querySelector('.elements__like-count');
      likeCountElement.textContent = this._likes.length;
      if(this.isLiked()){
        this._likeCard();
      } else{
        this._dislikeCard();
      }
    }
  
    _setEventListeners() {
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
      this._trash.addEventListener('click', () => {
        this._handleDeleteClick(this._id);
      });
      this._like.addEventListener('click', () => {
        this._handleLikeClick(this._id);
      });
    }
  }
