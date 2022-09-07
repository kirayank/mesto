import { buttonEdit, buttonAdd, formEdit, formAdd, nameInput, jobInput } from '../constants.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';
//для валидатора
const objectData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-element'
};
//для карточки
const initialCards = [
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


function createCard(item){
  const card = new Card({data: item, handleCardClick: (link, name) => {
    previewImage.open(link, name)
  }}, '#element-template');
  const newCard = card.generateCard(item);
  return newCard
};

const userInfo = new UserInfo({
  userNameSelector:'.profile__name',
  userInfoSelector:'.profile__about'
});

const formEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-form', 
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(
      data.name,
      data.info
    );
    formEditProfile.close();
    formEditProfile.removeEventListeners();
  }
});
formEditProfile.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const {name, info} = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = info;
  formEditProfile.open();
});

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    initialCardList.addItem(card);
  }
}, '.elements__list');

const previewImage = new PopupWithImage('.popup_type_image');
previewImage.setEventListeners();

const formAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-form',
  handleFormSubmit: (data) => {
    const addedCard = createCard({
      link: data.source,
      name: data.text,
      alt: data.text
    });
    initialCardList.addItem(addedCard);
    formAddCard.close()
    formAddCard.removeEventListeners()
  }
})
formAddCard.setEventListeners()

buttonAdd.addEventListener("click", () => {
  formAddCard.open();
});

const formAddValidator = new FormValidator(objectData, formAdd);
formAddValidator.enableValidation();
const formEditValidator = new FormValidator(objectData, formEdit);
formEditValidator.enableValidation();

initialCardList.renderElements();
