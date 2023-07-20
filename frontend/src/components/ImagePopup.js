export default function ImagePopup(props) {
  return (
    <div
      className={
        props.card.isOpen
          ? "popup popup_image popup_opened"
          : "popup popup_image"
      }
      id="image-popup"
    >
      <div className="popup__img-container">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__img"
        />
        <p className="popup__img-description">{props.card.name}</p>
        <button
          className="btn popup__close-btn"
          id="img-close-btn"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
