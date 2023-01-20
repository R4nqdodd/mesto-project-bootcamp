import './../pages/index.css';
import { renderUploadedCard, renderAddedCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { profileInformation, uploadedCards, changeProfileInformation, changeProfileAvatar, addNewCard } from "./api.js";
import { enableValidation, updateFormValidation } from "./validate.js";

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileAvatar = document.querySelector('.profile__avatar');

const popupProfileEditing = document.querySelector('.popup_type_profile-editing');
const profileInfoForm = document.forms.profileInfo;
const nameInput = profileInfoForm.elements.name;
const statusInput = profileInfoForm.elements.status;

const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddForm = document.forms.addCard;
const cardNameInput = cardAddForm.elements.cardName;
const cardLinkInput = cardAddForm.elements.cardLink;

const popupAvatarEditing = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms.avatarEdit;
const avatarLink = avatarForm.elements.avatarLink;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-edit-button');

const profileEditingSubmitButton = popupProfileEditing.querySelector('.popup__save-button');
const cardAddSubmitButton = popupAddCard.querySelector('.popup__save-button');
const avatarSubmitButton = popupAvatarEditing.querySelector('.popup__save-button');

export let profileId;

const popupValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

Promise.all([profileInformation(), uploadedCards()])
  .then(result => {
    profileName.textContent = result[0].name;
    profileStatus.textContent = result[0].about;
    profileAvatar.src = result[0].avatar;
    profileId = result[0]._id;
    result[1].forEach(element => {
      renderUploadedCard(element);
    });
  })
  .catch(err => console.log(`Ошибка: ${err}`));


editButton.addEventListener('click', function () {
  openPopup(popupProfileEditing);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  updateFormValidation(popupProfileEditing, popupValidationSettings);
});

const renderLoading = (isLoading, buttonElement, prevButtonText) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = prevButtonText;
  }
}

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardAddForm.reset();
  updateFormValidation(popupAddCard, popupValidationSettings);
});

avatarButton.addEventListener('click', () => {
  openPopup(popupAvatarEditing);
  avatarForm.reset();
  updateFormValidation(popupAvatarEditing, popupValidationSettings);
})


profileInfoForm.addEventListener('submit', handleFormSubmit);

cardAddForm.addEventListener('submit', cardFormSubmit);

avatarForm.addEventListener('submit', avatarFormSubmit);

function cardFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, cardAddSubmitButton, 'Создать');

  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then(res => {
      renderAddedCard(res);
      closePopup(popupAddCard);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => renderLoading(false, cardAddSubmitButton, 'Создать'));

}

function handleFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, profileEditingSubmitButton, 'Сохранить');

  changeProfileInformation(nameInput.value, statusInput.value)
    .then((res) => {      
      profileName.textContent = res.name;
      profileStatus.textContent = res.about;
      closePopup(popupProfileEditing);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => renderLoading(false, profileEditingSubmitButton, 'Сохранить'));

}

function avatarFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, avatarSubmitButton, 'Сохранить');

  changeProfileAvatar(avatarLink.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closePopup(popupAvatarEditing);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => renderLoading(false, avatarSubmitButton, 'Сохранить'));
}

enableValidation(popupValidationSettings);