import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { useFormWithValidation } from "../utils/useFormValidation.js";

export default function EditProfilePopup(props) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormWithValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    values.name = currentUser.name;
    values.bio = currentUser.about;
    setIsValid(true);
  }, [currentUser, props.isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ name: values.name, about: values.bio });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"edit"}
      title={"Редактировать профиль"}
      ariaLabelText={"Кнопка сохранить изменения в профиле"}
      submitText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      children={
        <>
          <label className="popup__form-label">
            <input
              type="text"
              id="name-field"
              name="name"
              className="popup__form-text"
              title={values.name || ""}
              value={values.name || ""}
              onChange={handleChange}
              minLength="2"
              maxLength="40"
              required
            />
            <span
              className={
                !isValid
                  ? "popup__form-text-error popup__form-text-error_active"
                  : "popup__form-text-error"
              }
              id="avatar-link-field-error"
            >
              {errors.name}
            </span>
          </label>
          <label className="popup__form-label">
            <input
              type="text"
              id="bio-field"
              name="bio"
              className="popup__form-text"
              title={values.bio || ""}
              value={values.bio || ""}
              onChange={handleChange}
              minLength="2"
              maxLength="200"
              required
            />
            <span
              className={
                !isValid
                  ? "popup__form-text-error popup__form-text-error_active"
                  : "popup__form-text-error"
              }
              id="avatar-link-field-error"
            >
              {errors.bio}
            </span>
          </label>
        </>
      }
    />
  );
}
