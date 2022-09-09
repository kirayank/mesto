export const popupElement = document.querySelector('.popup');
export const popupCloseButton = document.querySelector('.popup__exit');
export const popupImage = document.querySelector('.popup__picture'); //обозначила в классе
export const popupImageTitle = document.querySelector('.popup__name'); //обозначила в классе
export const elementsContainer = document.querySelector('.elements__list');//обращение в списку картиночек
export const popupOpenImage = document.querySelector('.popup_type_image');

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const formEdit = document.querySelector('.popup__edit-form');
export const formAdd = document.querySelector('.popup__add-form');
export const nameInput = document.querySelector('#popup__input_name'); 
export const jobInput = document.querySelector('#popup__input_about');
//для валидатора
export const objectData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__span-element'
  };
  //для карточки
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];