export default function PopupWithForm(props) {
  return (
    <div
      className={props.isOpen ? "popup popup_opened" : "popup"}
      id={`${props.name}-popup`}
    >
      <div className="popup__container">
        <form
          className="popup__form"
          name={`${props.name}-form`}
          id={`${props.name}-form`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__form-name">{props.title}</h2>
          <div className="popup__form-texts">{props.children}</div>
          <button
            type="submit"
            value="Сохранить"
            className={
              props.isValid
                ? "popup__submit-btn"
                : "popup__submit-btn popup__submit-btn_disabled"
            }
            aria-label={`Кнопка ${props.ariaLabelText}`}
          >
            {props.submitText}
          </button>
          <button
            className="btn popup__close-btn"
            type="button"
            aria-label="Кнопка закрытия попапа"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}
