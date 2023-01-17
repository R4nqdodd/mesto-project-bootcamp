import './../pages/index.css';
import { enableValidation, hideInputError } from "./validate.js";
import { renderCard, initialCards, elementsContainer } from "./card.js";
import { cardNameInput, cardLinkInput, nameInput, statusInput, openPopup, closePopup, pictureElement,
pictureCaption, cardAddForm, ProfileInfoForm, popupPicture, popupAddCard, popupProfileEditing, profileName, profileStatus } from "./modal.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
});
 
editButton.addEventListener('click', function () {
  openPopup(popupProfileEditing);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  hideInputError(popupProfileEditing, nameInput);
  hideInputError(popupProfileEditing, statusInput);
  enableValidation();
});

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
  document.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
});

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardAddForm.reset();
  hideInputError(popupAddCard, cardNameInput);
  hideInputError(popupAddCard, cardLinkInput);
  enableValidation();
});

ProfileInfoForm.addEventListener('submit', handleFormSubmit);

cardAddForm.addEventListener('submit', cardFormSubmit);

elementsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    openPopup(popupPicture);
    pictureElement.src = evt.target.src;
    pictureCaption.textContent = evt.target.alt;
    pictureElement.alt = evt.target.alt;
  }
});

function cardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value);

  closePopup(popupAddCard);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  closePopup(popupProfileEditing);
}

enableValidation();

