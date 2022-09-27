import './index.css';
import { objectData, buttonEdit, buttonAdd, formEdit, formAdd, nameInput, jobInput, avatarEdit } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '7da1b0a4-dc08-4bc8-a10f-4795c194d62d',
    'Content-Type': 'application/json'
  }
});

api.getProfile()
  .then(res => {
    console.log('кирулин профиль', res);
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
    console.log('userId', userId);
  })

api.getInitialCards()
  .then(cardList => {
      cardList.forEach(data => {
        const card = createCard({
          link: data.link,
          name: data.name,
          alt: data.name,
          likes: data.likes,
          id: data._id,
          userId: userId,
          ownerId: data.owner._id
        })
        initialCardList.addItem(card)
      })

    })

const createCard = (item) =>{
  const card = new Card({
    data: item, 
    handleCardClick: (link, name) => {
    previewImage.open(link, name)
    }, 
    handleDeleteClick: (id) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changeSubmitHandler(() => {
        //debugger;
        api.deleteCard(id)
          .then(res => {
            card.removeCard();
            popupDeleteConfirm.close();
          })
      })
    },
    handleLikeClick: (id) => {
      if(card.isLiked()){
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
      } else {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
      }
    }
  }, '#element-template');
  const newCard = card.generateCard(item);
  return newCard
};

const userInfo = new UserInfo({
  userNameSelector:'.profile__name',
  userInfoSelector:'.profile__about',
  userAvatarSelector:'.profile__avatar'
});

const formEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-form', 
  handleFormSubmit: (data) => {
    api.editProfile(data.name, data.info)
      .then((res) => {
        userInfo.setUserInfo(
          res.name,
          res.info
        );
        formEditProfile.close();
      })
  }
});
formEditProfile.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const {name, info} = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = info;
  formEditProfile.open();
});

const initialCardList = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item);
    initialCardList.addItem(card);
  }
}, '.elements__list');

const previewImage = new PopupWithImage('.popup_type_image');
previewImage.setEventListeners();

const popupDeleteConfirm = new PopupWithForm({
  popupSelector: '.popup_type_delete-confirm'
})
popupDeleteConfirm.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (data) => {
    api.editAvatar(data.source)
      .then((res) => {
        console.log('че по аватару', res);
        userInfo.setAvatar(res.avatar);
        popupEditAvatar.close();
      }
      )
  }
})
popupEditAvatar.setEventListeners();
avatarEdit.addEventListener('click', () => {
  popupEditAvatar.open();
})

const formAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-form',
  handleFormSubmit: (data) => {
    api.addCard(data.text, data.source)
      .then((res) => {
        const addedCard = createCard({
          link: res.link,
          name: res.name,
          alt: res.name,
          likes: res.likes,
          id: res._id,
          userId: userId,
          ownerId: res.owner._id
          //console.log('res', res)
      })
      initialCardList.addItem(addedCard);
      formAddCard.close()
      })
  }
});
formAddCard.setEventListeners();

buttonAdd.addEventListener("click", () => {
  formAddValidator.toggleButtonState();
  formAddCard.open();
});

const formAddValidator = new FormValidator(objectData, formAdd);
formAddValidator.enableValidation();
const formEditValidator = new FormValidator(objectData, formEdit);
formEditValidator.enableValidation();
