import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../utils/useFormValidation.js";

export default function EditAvatarPopup(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(values.link);
  }

  React.useEffect(() => {
    if (props.isOpen) {
      resetForm();
    }
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"avatar"}
      title={"Обновить аватар"}
      ariaLabelText={"Кнопка сохранить новый аватар"}
      submitText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      children={
        <label className="popup__form-label">
          <input
            type="url"
            id="avatar-link-field"
            name="link"
            className="popup__form-text"
            placeholder="Ссылка на картинку"
            required
            onChange={handleChange}
            value={values.link || ""}
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
      }
    />
  );
}
