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




/*function createCard (item){
    
  const elementTemplate = document.querySelector('#element-template').content;
  const pictureElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const loadPicture = pictureElement.querySelector('.elements__image');
  const loadPictureName = pictureElement.querySelector('.elements__name');

  loadPicture.src = item.link; //вставим картиночку
  loadPictureName.textContent = item.name; //вставим имя в заголовок
  loadPicture.alt = item.name;

  // на клик откроем карточку
  function openCard (){
    popupImage.src = item.link;
    popupImageTitle.textContent = item.name;
    popupImage.alt = item.name;
    openPopup(popupOpenImage);
  }
  loadPicture.addEventListener('click', openCard);

  //удаление карточки
  function removeCard (evt){
    evt.target.closest('.elements__element').remove();
  }
  pictureElement.querySelector('.elements__trash').addEventListener('click', removeCard);

  //лайк
  function likeCard (evt){
    evt.target.classList.toggle('elements__like_active');
  }
  pictureElement.querySelector('.elements__like').addEventListener('click', likeCard);

  return pictureElement;   
}*/

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


//initialCards.forEach(renderPicture);//вызываем для каждого объекта массива функцию создания карточки











