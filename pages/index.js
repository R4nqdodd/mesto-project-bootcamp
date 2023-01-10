const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfileEditing = document.querySelector('.popup_type_profile-editing');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const ProfileInfoForm = popupProfileEditing.querySelector('.popup__form');
const nameInput = popupProfileEditing.querySelector('#input-name');
const statusInput = popupProfileEditing.querySelector('#input-status');
const profileEditCloseButton = popupProfileEditing.querySelector('.popup__close-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddForm = popupAddCard.querySelector('.popup__form');
const cardNameInput = popupAddCard.querySelector('#input-card-name');
const cardLinkInput = popupAddCard.querySelector('#input-card-link');
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
}

const elementTemplate = document.querySelector('#element').content;

const elementsContainer = document.querySelector('.elements__list');

initialCards.forEach(function (item) {
  renderCard(elementsContainer, item.name, item.link);
});

function createNewCard(cardName, cardLink) {
  const newCard = elementTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__caption').textContent = cardName;

  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  cardImage.addEventListener('click', function () {
    openPopup(popupPicture);
    pictureElement.src = cardImage.src;
    pictureCaption.textContent = cardImage.alt;
    pictureElement.alt = cardImage.alt;
  });

  newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  newCard.querySelector('.element__trash').addEventListener('click', function (evt) {
    const cardRemove = evt.target.closest('.element');
    cardRemove.remove();
  });

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
}); 

profileEditCloseButton.addEventListener('click', function () {
  closePopup(popupProfileEditing);
});

ProfileInfoForm.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardNameInput.value = '';
  cardLinkInput.value = '';
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