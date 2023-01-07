const editButton = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.popup__save-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const changeProfileInfoForm = document.querySelector('.popup__change-profile-info');
const nameInput = document.querySelector('.popup__input_name');
const statusInput = document.querySelector('.popup__input_status');

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

const userElement = [];

initialCards.forEach(function(item, index) {
  userElement[index] = elementTemplate.querySelector('.element').cloneNode(true);

  userElement[index].querySelector('.element__caption').textContent = item.name;
  userElement[index].querySelector('.element__like');
  userElement[index].querySelector('.element__text');
  userElement[index].querySelector('.element__image').src = item.link;
  userElement[index].querySelector('.element__image').alt = item.name;
  
  elementsList.append(userElement[index]);
})


function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value; 
  profileStatus.textContent = statusInput.value;

  popup.classList.remove('popup_opened');
}

nameInput.value = profileName.textContent;
statusInput.value = profileStatus.textContent;

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
});

changeProfileInfoForm.addEventListener('submit', handleFormSubmit);
