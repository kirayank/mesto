const editbutton = document.querySelector('.profile__editbutton');
const form = document.querySelector('.profile__container');

editbutton.addEventListener('click', () => {
  form.classList.add('open');
});

const exitbutton = document.querySelector('.editform__exit');
exitbutton.addEventListener('click', () => {
    form.classList.add('close');
  });


let nameInput = document.querySelector('.editform__name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.editform__about');// Воспользуйтесь инструментом .querySelector()

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм
    nameInput.getAttribute('value');
    jobInput.getAttribute('value'); // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

