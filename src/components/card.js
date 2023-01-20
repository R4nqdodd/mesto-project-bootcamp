import { openPopup, closePopup } from "./modal.js";
import { deleteCard, getLike, deleteLike } from "./api.js";
import { profileId } from "./index.js";

const popupPicture = document.querySelector('.popup_type_picture');
const pictureElement = popupPicture.querySelector('.popup__picture');
const pictureCaption = popupPicture.querySelector('.popup__caption');

const elementsContainer = document.querySelector('.elements__container');
const elementTemplate = document.querySelector('#element').content;

const createNewCard = (card) => {

  const newCard = elementTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__caption').textContent = card.name;

  const trash = newCard.querySelector('.element__trash');

  trash.addEventListener('click', () => {  
    deleteCard(card._id)
        .then(() => {
          const cardRemove = trash.closest('.element');
          cardRemove.remove();
        })
        .catch(err => console.log(`Ошибка: ${err}`)); 
  });

  if (card.owner._id !== profileId) {
    trash.remove();
  }
  card.likes.forEach(element => {
    if (element._id === profileId) {
      newCard.querySelector('.element__like').classList.add('element__like_active');
    }
  });

  const like = newCard.querySelector('.element__like');

  like.addEventListener('click', () => {
    if (like.classList.contains('element__like_active')) {
      deleteLike(card._id)
        .then(res => {
          likes.textContent = `${res.likes.length}`;
          like.classList.remove('element__like_active');
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    } else {
      getLike(card._id)
        .then(res => {
          likes.textContent = `${res.likes.length}`;
          like.classList.add('element__like_active');
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  });

  const picture = newCard.querySelector('.element__image');

  picture.addEventListener('click', () => {
    openPopup(popupPicture);
    pictureElement.src = picture.src;
    pictureCaption.textContent = picture.alt;
    pictureElement.alt = picture.alt;
  });

  const likes = newCard.querySelector('.element__like-counter');

  likes.textContent = `${card.likes.length}`;

  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  return newCard;
}

export const renderAddedCard = (card) => {
  elementsContainer.prepend(createNewCard(card));
}

export const renderUploadedCard = (card) => {
  elementsContainer.append(createNewCard(card));
}


