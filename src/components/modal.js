export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__status');

export const popupProfileEditing = document.querySelector('.popup_type_profile-editing');
export const ProfileInfoForm = document.forms.profileInfo;
export const nameInput = ProfileInfoForm.elements.name;
export const statusInput = ProfileInfoForm.elements.status;

export const popupAddCard = document.querySelector('.popup_type_add-card');
export const cardAddForm = document.forms.addCard;
export const cardNameInput = cardAddForm.elements.cardName;
export const cardLinkInput = cardAddForm.elements.cardLink;

export const popupPicture = document.querySelector('.popup_type_picture');
export const pictureElement = popupPicture.querySelector('.popup__picture');
export const pictureCaption = popupPicture.querySelector('.popup__caption');

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
} 

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}


