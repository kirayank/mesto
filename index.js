import { initialCards, popupElement, popupCloseButton, popupImage, popupImageTitle, elementsContainer, popupOpenImage, Card } from './card.js';
import { objectData, FormValidator } from './FormValidator.js';


const buttonEdit = document.querySelector('.profile__editbutton');
const popupOpenEditForm = document.querySelector('.popup_type_editform');
const buttonExit = document.querySelector('.popup__exit');
const buttonExitAddForm = document.querySelector('#popup__exit_addform');
const buttonAdd = document.querySelector('.profile__addbutton');
const editForm = document.querySelector('.popup__editform');
const addForm = document.querySelector('.popup__addform');
const nameInput = document.querySelector('#popup__input_name'); 
const jobInput = document.querySelector('#popup__input_about');
const nameProfile = document.getElementById('popup__profile_name'); //получила значение всей строки (что написано в заголовке)
const aboutProfile = document.getElementById('popup__profile_about');


const titleInput = document.querySelector('#popup__input_title'); //поле названия картинки
const linkInput = document.querySelector('#popup__input_link'); //поле с ссылкой на картинку

/*const popupImage = document.querySelector('.popup__picture');*/
//const popupImageTitle = document.querySelector('.popup__name');

const popups = document.querySelectorAll('.popup');
//const popupOpenImage = document.querySelector('.popup_type_image');

const buttonExitPopup = document.querySelector('#popup__exit_picture');

const popupOpenAddForm = document.querySelector('.popup_type_addform');




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
      closePopup(popup); }})})
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscapeButton);
  
}

function closePopup(popup) {
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

function disableSubmitButton(popup) {
  const button = popup.querySelector('.popup__save');
  button.classList.add('popup__save_invalid');
  button.disabled = "disabled";
}

function handleSubmitEditForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
  nameProfile.textContent = nameInput.value; //titleInput.value;
  aboutProfile.textContent = jobInput.value; //linkInput.value;
  closeEditForm();
  disableSubmitButton(popupOpenEditForm);
}


function openAddForm(){
  openPopup(popupOpenAddForm);
}

function closeAddForm(){
  closePopup(popupOpenAddForm);
}

function handlerSubmitAddForm (evt) {
  evt.preventDefault();
  const newCard = {link: linkInput.value, name: titleInput.value};
  renderPicture(newCard);
  closePopup(popupOpenAddForm);
  evt.target.reset();
  disableSubmitButton(popupOpenAddForm);
}

addForm.addEventListener('submit', handlerSubmitAddForm);


buttonAdd.addEventListener('click', openAddForm);
buttonEdit.addEventListener('click', openEditUserForm);
buttonExit.addEventListener('click', closeEditForm);
buttonExitAddForm.addEventListener('click', closeAddForm);
editForm.addEventListener('submit', handleSubmitEditForm);
buttonExitPopup.addEventListener('click', function (){
  closePopup(popupOpenImage);
});

clickOverlay(popups);

const enableValidationAddForm = new FormValidator(objectData, addForm);
enableValidationAddForm.enableValidation();
const enableValidationEditForm = new FormValidator(objectData, editForm);
enableValidationEditForm.enableValidation();

function renderPicture() {
  initialCards.forEach((item) => {
      const card = new Card(item, '#element-template');
      const pictureElement = card.generateCard(item);
      elementsContainer.prepend(pictureElement); //вставляем карточку
  });
};

renderPicture();

//initialCards.forEach(renderPicture);//вызываем для каждого объекта массива функцию создания карточки











