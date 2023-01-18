import './../pages/index.css';
import { enableValidation, hideInputError } from "./validate.js";
import { renderCard, initialCards } from "./card.js";
import { openPopup, closePopup } from "./modal.js";

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
 
const popupProfileEditing = document.querySelector('.popup_type_profile-editing');
const ProfileInfoForm = document.forms.profileInfo;
const nameInput = ProfileInfoForm.elements.name;
const statusInput = ProfileInfoForm.elements.status;
 
const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddForm = document.forms.addCard;
const cardNameInput = cardAddForm.elements.cardName;
const cardLinkInput = cardAddForm.elements.cardLink;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


const profileEditingSubmitButton = popupProfileEditing.querySelector('.popup__save-button');

const popupValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
});

editButton.addEventListener('click', function () {
  openPopup(popupProfileEditing);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  hideInputError(popupProfileEditing, nameInput, popupValidationSettings);
  hideInputError(popupProfileEditing, statusInput, popupValidationSettings);
  profileEditingSubmitButton.removeAttribute('disabled');
  profileEditingSubmitButton.classList.remove('popup__save-button_inactive');
});



addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardAddForm.reset();
  hideInputError(popupAddCard, cardNameInput, popupValidationSettings);
  hideInputError(popupAddCard, cardLinkInput, popupValidationSettings);
});

ProfileInfoForm.addEventListener('submit', handleFormSubmit);

cardAddForm.addEventListener('submit', cardFormSubmit);



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

enableValidation(popupValidationSettings);