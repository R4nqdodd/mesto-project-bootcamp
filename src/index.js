const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const popupProfileEditing = document.querySelector('.popup_type_profile-editing');
const ProfileInfoForm = document.forms.profileInfo;
const nameInput = ProfileInfoForm.elements.name;
const statusInput = ProfileInfoForm.elements.status;
const profileEditCloseButton = popupProfileEditing.querySelector('.popup__close-button');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddForm = document.forms.addCard;
const cardNameInput = cardAddForm.elements.cardName;
const cardLinkInput = cardAddForm.elements.cardLink;
const cardCloseButton = popupAddCard.querySelector('.popup__close-button');

const popupPicture = document.querySelector('.popup_type_picture');
const pictureElement = popupPicture.querySelector('.popup__picture');
const pictureCaption = popupPicture.querySelector('.popup__caption');
const pictureCloseButton = popupPicture.querySelector('.popup__close-button');

const initialCards = [
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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  const popupInputErrorRemove = Array.from(popup.querySelectorAll('.popup__input'));
  popupInputErrorRemove.forEach((input) => {
    hideInputError(popup, input);
  }); 
}

const elementsContainer = document.querySelector('.elements__container');

elementsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  } else if (evt.target.classList.contains('element__image')) {
    openPopup(popupPicture);
    pictureElement.src = evt.target.src;
    pictureCaption.textContent = evt.target.alt;
    pictureElement.alt = evt.target.alt;
  } else if (evt.target.classList.contains('element__trash')) {
    const cardRemove = evt.target.closest('.element');
    cardRemove.remove();
  }
});

initialCards.forEach(function (item) {
  renderCard(elementsContainer, item.name, item.link);
});

function createNewCard(cardName, cardLink) {
  const elementTemplate = document.querySelector('#element').content;
  
  const newCard = elementTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__caption').textContent = cardName;

  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  return newCard;
}

function renderCard(container, cardName, cardLink) {
  container.prepend(createNewCard(cardName, cardLink));
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  closePopup(popupProfileEditing);
}

editButton.addEventListener('click', function () {
  openPopup(popupProfileEditing);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  enableValidation();
}); 

profileEditCloseButton.addEventListener('click', function () {
  closePopup(popupProfileEditing);
});

ProfileInfoForm.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardAddForm.reset();
  enableValidation();
});

cardCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

function cardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(elementsContainer, cardNameInput.value, cardLinkInput.value);

  closePopup(popupAddCard);
}

pictureCloseButton.addEventListener('click', function () {
  closePopup(popupPicture);
});

cardAddForm.addEventListener('submit', cardFormSubmit);

function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_type_error');
}

function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement,) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setFormEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setFormEventListeners(form);
  })
}

function hasInvalidInput (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

enableValidation();