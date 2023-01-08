const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const popup = document.querySelector('.popup');
const popupProfileEditing = document.querySelector('.popup_type_profile-editing');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const changeProfileInfoForm = popupProfileEditing.querySelector('.popup__form');
const nameInput = popupProfileEditing.querySelector('#input-name');
const statusInput = popupProfileEditing.querySelector('#input-status');
const editCloseButton = popupProfileEditing.querySelector('.popup__close-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardForm = popupAddCard.querySelector('.popup__form');
const cardNameInput = popupAddCard.querySelector('#input-card-name');
const cardLinkInput = popupAddCard.querySelector('#input-card-link');
const cardCloseButton = popupAddCard.querySelector('.popup__close-button');

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

const elementTemplate = document.querySelector('#element').content;

const elementsList = document.querySelector('.elements__list');

const newElement = [];

initialCards.forEach(function (item, index) {
  newElement[index] = elementTemplate.querySelector('.element').cloneNode(true);

  newElement[index].querySelector('.element__caption').textContent = item.name;
  newElement[index].querySelector('.element__text');
  newElement[index].querySelector('.element__image').src = item.link;
  newElement[index].querySelector('.element__image').alt = item.name;
  newElement[index].querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  newElement[index].querySelector('.element__trash').addEventListener('click', function (evt) {
    const cardRemove = evt.target.closest('.element');
    cardRemove.remove();
  })



  elementsList.prepend(newElement[index]);
})

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  popupProfileEditing.classList.remove('popup_opened');
}

nameInput.value = profileName.textContent;
statusInput.value = profileStatus.textContent;

editButton.addEventListener('click', function () {
  popupProfileEditing.classList.add('popup_opened');
});

editCloseButton.addEventListener('click', function () {
  popupProfileEditing.classList.remove('popup_opened');
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
});

changeProfileInfoForm.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', function () {
  popupAddCard.classList.add('popup_opened');
})

cardCloseButton.addEventListener('click', function () {
  popupAddCard.classList.remove('popup_opened');
  cardNameInput.value = '';
  cardLinkInput.value = '';
})

function cardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = elementTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__caption').textContent = cardNameInput.value;
  newCard.querySelector('.element__like');
  newCard.querySelector('.element__text');
  newCard.querySelector('.element__image').src = cardLinkInput.value;
  newCard.querySelector('.element__image').alt = cardNameInput.value;
  newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  newCard.querySelector('.element__trash').addEventListener('click', function (evt) {
    const cardRemove = evt.target.closest('.element');
    cardRemove.remove();
  })
  elementsList.prepend(newCard);

  cardNameInput.value = '';
  cardLinkInput.value = '';

  popupAddCard.classList.remove('popup_opened');
}

addCardForm.addEventListener('submit', cardFormSubmit);

