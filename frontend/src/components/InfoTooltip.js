import succesIcon from "../images/succes.svg";
import errorIcon from "../images/error.svg";

export default function InfoTooltip(props) {
  const succes = "Вы успешно зарегистрировались!";
  const err = "Что-то пошло не так! Попробуйте еще раз.";
  return (
    <div
      className={
        props.isOpen ? "popup popup_Info popup_opened" : "popup popup_Info"
      }
      id="info-popup"
    >
      <div className="popup_info__container">
        {props.isValid ? (
          <img src={succesIcon} alt={succes} className="popup_info__icon" />
        ) : (
          <img src={errorIcon} alt={err} className="popup_info__icon" />
        )}
        <p className="popup_info__text">{props.isValid ? succes : err}</p>
        <button
          className="btn popup__close-btn"
          id="info-close-btn"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
