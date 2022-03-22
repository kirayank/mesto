const editbutton = document.querySelector('.profile__editbutton');
/*const form = document.querySelector('.popup__container');*/
const popup = document.querySelector('.popup');
const exitbutton = document.querySelector('.popup__exit');
const exitbutton_addForm = document.querySelector('#popup__exit_addform');
const addbutton = document.querySelector('.profile__addbutton');
const form = document.querySelector('.popup__editform');
const addform = document.querySelector('.popup__addform');
let nameInput = document.querySelector('#popup__input_name'); 
let jobInput = document.querySelector('#popup__input_about');
let nameProfile = document.getElementById('popup__profile_name'); //получила значение всей строки (что написано в заголовке)
let aboutProfile = document.getElementById('popup__profile_about');
const elementsContainer = document.querySelector('.elements__list');//обращение в списку картиночек

let titleInput = document.querySelector('#popup__input_title'); //поле названия картинки
let linkInput = document.querySelector('#popup__input_link'); //поле с ссылкой на картинку





//массив картиночек
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



function loadPictures (item){
    
  const elementTemplate = document.querySelector('#element-template').content;
  const pictureElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  pictureElement.querySelector('.elements__image').src = item.link; //вставим картиночку
  pictureElement.querySelector('.elements__name').textContent = item.name; //вставим имя в заголовок

  return pictureElement;
    
}

function renderPicture (item){
  const pictureElement = loadPictures(item);
  elementsContainer.append(pictureElement); //вставляем карточку

  
  //открытие попапа
  /*pictureElement.addEventListener('click', function(){
    console.log('я нажался');
    const bigPicture = pictureElement.querySelector('.popup__picture');
    let bigTitle = pictureElement.querySelector('.popup__name');
    bigPicture.src = item.link;
    bigTitle.textContent = item.textContent;
  })*/
}

function deletePicture () {
  const deleteButtons = document.querySelectorAll('.elements__trash');
  for (let i=0; i<deleteButtons.length; i++){
    let deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', function (evt){
      evt.target.closest('.elements__element').remove();
    });
  } 
}


function openForm () {
  nameInput.value = nameProfile.textContent; //присвоила значению инпута значение тега
  jobInput.value = aboutProfile.textContent;
  popup.classList.add('popup_opened');
}

function closeForm () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
  nameProfile.textContent = titleInput.value;
  aboutProfile.textContent = linkInput.value;
  closeForm();
}


function openAddForm(){
  let add_container = addform.parentElement;
  let add_popup = add_container.parentElement;
  add_popup.classList.add('popup_opened');
}

function closeAddForm(){
  let add_container = addform.parentElement;
  let add_popup = add_container.parentElement;
  add_popup.classList.remove('popup_opened');
}

function addPicture(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
  const elementTemplate = document.querySelector('#element-template').content;
  const pictureElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  pictureElement.querySelector('.elements__name').textContent = titleInput.value;
  pictureElement.querySelector('.elements__image').src = linkInput.value;
  elementsContainer.prepend(pictureElement);
  closeAddForm();
}


function likePicture(){
  const likeButtons = document.querySelectorAll('.elements__like');
  for (i=0; i<likeButtons.length; i++){
    let likeButton = likeButtons[i];
    likeButton.addEventListener('click', function(){
      if (likeButton.classList.contains('elements__like_active') === true){
        likeButton.classList.remove('elements__like_active');
      }
      else {
        likeButton.classList.add('elements__like_active');
      }
    });
  }
}






addbutton.addEventListener('click', openAddForm);
editbutton.addEventListener('click', openForm);
exitbutton.addEventListener('click', closeForm);
exitbutton_addForm.addEventListener('click', closeAddForm);
form.addEventListener('submit', formSubmitHandler);
addform.addEventListener('submit', addPicture);


initialCards.forEach(renderPicture);//вызываем для каждого объекта массива функцию создания карточки


deletePicture();
likePicture()









