import './index.css';
import { initialCards, objectData, buttonEdit, buttonAdd, formEdit, formAdd, nameInput, jobInput } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

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
    //formEditProfile.removeEventListeners();
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
    //formAddCard.removeEventListeners()
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
