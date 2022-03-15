const editbutton = document.querySelector('.profile__editbutton');
/*const form = document.querySelector('.popup__container');*/
const popup = document.querySelector('.popup');
const exitbutton = document.querySelector('.popup__exit');
const form = document.querySelector('.popup__editform');
let nameInput = document.querySelector('#popup__input_name'); 
let jobInput = document.querySelector('#popup__input_about');
let nameProfile = document.getElementById('popup__profile_name'); //получила значение всей строки (что написано в заголовке)
let aboutProfile = document.getElementById('popup__profile_about');


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


editbutton.addEventListener('click', openForm);
exitbutton.addEventListener('click', closeForm);
form.addEventListener('submit', formSubmitHandler);







