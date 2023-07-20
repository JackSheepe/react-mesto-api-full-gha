export function renderLoading({ submitBtn }, isLoading) {
  const intialText = submitBtn.value;
  if (isLoading === true) {
    submitBtn.textContent = "Сохранение...";
  } else {
    submitBtn.textContent = intialText;
  }
}

export function openPopup(popup) {
  popup.open();
}

export function openEditPopup(popup, user, formValidity) {
  openPopup(popup);
  popup.setInputValues(user.getUserInfo());
  formValidity.enableSubmitButton();
}

export function openCardPopup(popup, formValidity) {
  openPopup(popup);
  formValidity.disableSubmitButton();
}
