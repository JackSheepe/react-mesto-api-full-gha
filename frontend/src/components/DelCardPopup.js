import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onDelCard(props.card, props.setCards);
  }

  return (
    <PopupWithForm
      isValid={true}
      isOpen={props.isOpen}
      name={"delete"}
      title={"Вы уверены?"}
      ariaLabelText={"Кнопка удалить попап"}
      submitText={"Да"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <input
          type="text"
          id="id-field"
          name="_id"
          className="popup__form-text popup__form-text_hidden"
          defaultValue=""
        />
      }
    />
  );
}
