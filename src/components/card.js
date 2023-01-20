import { openPopup } from "./modal.js";
import { myId, deleteCard, getLike, deleteLike } from "./api.js";

const popupPicture = document.querySelector('.popup_type_picture');
const pictureElement = popupPicture.querySelector('.popup__picture');
const pictureCaption = popupPicture.querySelector('.popup__caption');

const elementsContainer = document.querySelector('.elements__container');
const elementTemplate = document.querySelector('#element').content;

const createNewCard = (card) => {

  const newCard = elementTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__caption').textContent = card.name;

  myId()
    .then((obj) => {
      if (card.owner._id === obj._id) {
        addTrash(newCard);
      }
      card.likes.forEach(element => {
        if (element._id === obj._id) {
          newCard.querySelector('.element__like').classList.add('element__like_active');
        }
      });
    })
    .catch((err) => console.log(`Ошибка: ${err}`));


  newCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__like')) {
      if (evt.target.classList.contains('element__like_active')) {
        deleteLike(card._id)
          .then(res => {
            likes.textContent = `${res.likes.length}`;
          })
      } else {
        getLike(card._id)
          .then(res => {
            likes.textContent = `${res.likes.length}`;
          })
      }
      evt.target.classList.toggle('element__like_active');
    }
    if (evt.target.classList.contains('element__trash')) {
      deleteCard(card._id);
      const cardRemove = evt.target.closest('.element');
      cardRemove.remove();
    }
    if (evt.target.classList.contains('element__image')) {
      openPopup(popupPicture);
      pictureElement.src = evt.target.src;
      pictureCaption.textContent = evt.target.alt;
      pictureElement.alt = evt.target.alt;
    }
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

const addTrash = (element) => {
  const trash = document.createElement('button');
  trash.setAttribute('type', 'button');
  trash.setAttribute('aria-label', 'Удалить карточку');
  trash.classList.add('element__trash');
  element.prepend(trash);
}
