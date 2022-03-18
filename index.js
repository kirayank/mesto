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

function pagePictures (item){
    const elementTemplate = document.querySelector('#element-template').content;
    const pictureElement = elementTemplate.querySelector('.elements__element').cloneNode(true);

    pictureElement.querySelector('.elements__image').src = item.link; //вставим картиночку
    pictureElement.querySelector('.elements__name').textContent = item.name; //вставим имя в заголовок

    return pictureElement;
    
}

function renderPicture (item){
  const pictureElement = pagePictures(item);
  elementsContainer.append(pictureElement); //вставляем карточку
}


function openForm () {
  /*form.classList.add('popup__container_opened');*/
  /*nameInput.setAttribute('value', nameProfile.textContent); //присвоила значению инпута значение тега
  jobInput.setAttribute('value', aboutProfile.textContent);*/
  nameInput.value = nameProfile.textContent; //присвоила значению инпута значение тега
  jobInput.value = aboutProfile.textContent;
  popup.classList.add('popup_opened');
}

function closeForm () {
  /*form.classList.remove('popup__container_opened');*/
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = jobInput.value;
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



addbutton.addEventListener('click', openAddForm);
editbutton.addEventListener('click', openForm);
exitbutton.addEventListener('click', closeForm);
exitbutton_addForm.addEventListener('click', closeAddForm);
form.addEventListener('submit', formSubmitHandler);

initialCards.forEach(renderPicture);//вызываем для каждого объекта массива функцию создания карточки







