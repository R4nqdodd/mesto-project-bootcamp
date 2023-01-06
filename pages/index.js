const editButton = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.popup__save-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})