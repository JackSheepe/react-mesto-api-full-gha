import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../utils/useFormValidation.js";

export default function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(values.name, values.link);
  }

  React.useEffect(() => {
    if (props.isOpen) {
      resetForm();
    }
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"card"}
      title={"Новое место"}
      ariaLabelText={"Кнопка создать фото-карточку"}
      submitText={"Создать"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      children={
        <>
          <label className="popup__form-label">
            <input
              type="text"
              id="card-name-field"
              name="name"
              className="popup__form-text"
              value={values.name || ""}
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
              onChange={handleChange}
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
              type="url"
              id="link-field"
              name="link"
              className="popup__form-text"
              value={values.link || ""}
              placeholder="Ссылка на картинку"
              required
              onChange={handleChange}
            />
            <span
              className={
                !isValid
                  ? "popup__form-text-error popup__form-text-error_active"
                  : "popup__form-text-error"
              }
              id="avatar-link-field-error"
            >
              {errors.link}
            </span>
          </label>
        </>
      }
    />
  );
}
