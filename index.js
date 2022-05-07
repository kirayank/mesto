const buttonEdit = document.querySelector('.profile__editbutton');
/*const form = document.querySelector('.popup__container');*/
const popup = document.querySelector('.popup');
const buttonExit = document.querySelector('.popup__exit');
const buttonExitAddForm = document.querySelector('#popup__exit_addform');
const buttonAdd = document.querySelector('.profile__addbutton');
const form = document.querySelector('.popup__editform');
const addform = document.querySelector('.popup__addform');
const nameInput = document.querySelector('#popup__input_name'); 
const jobInput = document.querySelector('#popup__input_about');
const nameProfile = document.getElementById('popup__profile_name'); //получила значение всей строки (что написано в заголовке)
const aboutProfile = document.getElementById('popup__profile_about');
const elementsContainer = document.querySelector('.elements__list');//обращение в списку картиночек

const titleInput = document.querySelector('#popup__input_title'); //поле названия картинки
const linkInput = document.querySelector('#popup__input_link'); //поле с ссылкой на картинку

const popupImage = document.querySelector('.popup__picture');
const popupImageTitle = document.querySelector('.popup__name');

const popups = document.querySelectorAll('.popup');
const popupOpenImage = document.querySelector('.popup_type_image');

const buttonExitPopup = document.querySelector('#popup__exit_picture');

const popupOpenAddForm = document.querySelector('.popup_type_addform');






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





function createCard (item){
    
  const elementTemplate = document.querySelector('#element-template').content;
  const pictureElement = elementTemplate.querySelector('.elements__element').cloneNode(true);

  const loadPicture = pictureElement.querySelector('.elements__image');
  const loadPictureName = pictureElement.querySelector('.elements__name');

  loadPicture.src = item.link; //вставим картиночку
  loadPictureName.textContent = item.name; //вставим имя в заголовок

  
  // на клик откроем карточку
  loadPicture.addEventListener('click', function (loadPicture) {
    popupImage.src = item.link;
    popupImageTitle.textContent = item.name;
    openPopup(popupOpenImage);
  });


  pictureElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    evt.target.closest('.elements__element').remove();
  });

  pictureElement.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active');
  });
  

  return pictureElement;
    
}
function pressEscapeButton(evt) {
  if(evt.key === "Escape"){
    console.log('я нажался');
    closeForm();
    closeAddForm();}
 }
function openPopup(popups) {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscapeButton);
  /*(evt) => {
    if(evt.key === "Escape"){
      console.log('я нажался');
      closeForm();}
  }); */
}

function closePopup(popups) {
  popups.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscapeButton);
}


function renderPicture (item){
  const pictureElement = createCard(item);
  elementsContainer.append(pictureElement); //вставляем карточку

}


function openEditUserForm () {
  nameInput.value = nameProfile.textContent; //присвоила значению инпута значение тега
  jobInput.value = aboutProfile.textContent;
  openPopup(popup);
}

function closeForm () {
  closePopup(popup);
}

function handleSubmitEditForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
  nameProfile.textContent = nameInput.value; //titleInput.value;
  aboutProfile.textContent = jobInput.value; //linkInput.value;
  closeForm();
}


function openAddForm(){
  openPopup(popupOpenAddForm);
}

function closeAddForm(){
  closePopup(popupOpenAddForm);
}

addform.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementsContainer.prepend(createCard({link: linkInput.value, name: titleInput.value}));
  closePopup(popupOpenAddForm);
});


buttonAdd.addEventListener('click', openAddForm);
buttonEdit.addEventListener('click', openEditUserForm);
buttonExit.addEventListener('click', closeForm);
buttonExitAddForm.addEventListener('click', closeAddForm);
form.addEventListener('submit', handleSubmitEditForm);
buttonExitPopup.addEventListener('click', function (){
  closePopup(popupOpenImage);
})
popup.addEventListener('click', closeForm);

popup.addEventListener('click', closeAddForm); //пока не закрывается чет



initialCards.forEach(renderPicture);//вызываем для каждого объекта массива функцию создания карточки











