import { openPopup } from "./modal.js";

const popupPicture = document.querySelector('.popup_type_picture');
const pictureElement = popupPicture.querySelector('.popup__picture');
const pictureCaption = popupPicture.querySelector('.popup__caption');

export const elementsContainer = document.querySelector('.elements__container');
const elementTemplate = document.querySelector('#element').content;

export const initialCards = [
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

function createNewCard(cardName, cardLink) {
  
  const newCard = elementTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__caption').textContent = cardName;

  newCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__like')) {
      evt.target.classList.toggle('element__like_active');
    }
    if (evt.target.classList.contains('element__trash')) {
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

  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  return newCard;
}

export function renderCard(cardName, cardLink) {
  elementsContainer.prepend(createNewCard(cardName, cardLink));
}