const editbutton = document.querySelector('.profile__editbutton');
const form = document.querySelector('.profile__container');
const overlay = document.querySelector('.overlay');

editbutton.addEventListener('click', () => {
  overlay.classList.add('open');
  form.classList.add('open');
});

let exitbutton = document.querySelector('.exit');
exitbutton.addEventListener('click', () => {
    overlay.classList.add('close');
    form.classList.add('close');
  });


let nameInput = document.querySelector('.editform__name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.editform__about');// Воспользуйтесь инструментом .querySelector()

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку форм

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

