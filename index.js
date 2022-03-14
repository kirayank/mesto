const editbutton = document.querySelector('.profile__editbutton');
const form = document.querySelector('.popup__container');
const exitbutton = document.querySelector('.popup__exit');
const savebutton = document.querySelector('.popup__save');
let nameInput = document.querySelector('#popup__input_name'); 
let jobInput = document.querySelector('#popup__input_about');
let nameProfile = document.getElementById('popup__profile_name'); //получила значение всей строки (что написано в заголовке)
let aboutProfile = document.getElementById('popup__profile_about');


function formOpen () {
  form.classList.add('popup__container_opened');
  nameInput.setAttribute('value', nameProfile.textContent); //присвоила значению инпута значение тега
  jobInput.setAttribute('value', aboutProfile.textContent);
}

function formClose () {
  form.classList.remove('popup__container_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
  let name = nameInput.getAttribute('value');
  let job = jobInput.getAttribute('value'); 
  nameProfile.textContent = name;
  aboutProfile.textContent = job;
  formClose();
}


editbutton.addEventListener('click', formOpen);
exitbutton.addEventListener('click', formClose);
savebutton.addEventListener('submit', formSubmitHandler);







