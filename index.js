import { elementsContainer, popupOpenImage } from './constants.js';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
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
//все остальное
const buttonEdit = document.querySelector('.profile__edit-button');
const popupOpenEditForm = document.querySelector('.popup_type_edit-form');
const buttonExit = document.querySelector('.popup__exit');
const buttonExitAddForm = document.querySelector('#popup__exit_add-form');
const buttonAdd = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('.popup__edit-form');
const formAdd = document.querySelector('.popup__add-form');
const nameInput = document.querySelector('#popup__input_name'); 
const jobInput = document.querySelector('#popup__input_about');
const nameProfile = document.getElementById('popup__profile_name'); //получила значение всей строки (что написано в заголовке)
const aboutProfile = document.getElementById('popup__profile_about');
const titleInput = document.querySelector('#popup__input_title'); //поле названия картинки
const linkInput = document.querySelector('#popup__input_link'); //поле с ссылкой на картинку
const popups = document.querySelectorAll('.popup');
const buttonExitPopup = document.querySelector('#popup__exit_picture');
const popupOpenAddForm = document.querySelector('.popup_type_add-form');

function pressEscapeButton(evt) {
  if(evt.key === "Escape"){
    const popupOpened = document.querySelector('.popup_opened');
    closePopup (popupOpened);
    }
 }

function clickOverlay(popups) {
  Array.from(popups).forEach(popup => {
    popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains('popup_opened')) { 
      closePopup(popup);}
    })
  })
}

 export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscapeButton);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscapeButton);
}

function openEditUserForm () {
  nameInput.value = nameProfile.textContent; //присвоила значению инпута значение тега
  jobInput.value = aboutProfile.textContent;
  openPopup(popupOpenEditForm);
}

function closeEditForm () {
  closePopup(popupOpenEditForm);
}


function handleSubmitEditForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
  nameProfile.textContent = nameInput.value; //titleInput.value;
  aboutProfile.textContent = jobInput.value; //linkInput.value;
  closeEditForm();
  //disableSubmitButton(popupOpenEditForm);
}

function openAddForm(){
  openPopup(popupOpenAddForm);
}

function closeAddForm(){
  closePopup(popupOpenAddForm);
}

function createCard(item){
  const card = new Card(item, '#element-template');
  const newCard = card.generateCard(item);
  return newCard
};

function handlerSubmitAddForm (evt) {
  evt.preventDefault();
  const newCard = {link: linkInput.value, name: titleInput.value};
  const cardPaste = createCard(newCard);
  elementsContainer.prepend(cardPaste);
  closePopup(popupOpenAddForm);
  evt.target.reset();
  formAddValidator.toggleButtonState();
}

formAdd.addEventListener('submit', handlerSubmitAddForm);
buttonAdd.addEventListener('click', openAddForm);
buttonEdit.addEventListener('click', openEditUserForm);
buttonExit.addEventListener('click', closeEditForm);
buttonExitAddForm.addEventListener('click', closeAddForm);
formEdit.addEventListener('submit', handleSubmitEditForm);
buttonExitPopup.addEventListener('click', function (){
  closePopup(popupOpenImage);
});
clickOverlay(popups);

const formAddValidator = new FormValidator(objectData, formAdd);
formAddValidator.enableValidation();
const formEditValidator = new FormValidator(objectData, formEdit);
formEditValidator.enableValidation();

function renderPicture() {
  initialCards.forEach((item) => {
      const pictureElement = createCard(item);
      elementsContainer.prepend(pictureElement);
  });
};

renderPicture();
