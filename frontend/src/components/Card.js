import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card, props.setCards);
  }

  function handleDeleteClick() {
    props.onCardDelClick(props.card);
  }
  return (
    <li className="elements__element">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="elements__image"
        loading="lazy"
      />
      <div className="elements__description">
        <h2 className="elements__name">{props.card.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайка"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-num">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className="elements__delete"
          onClick={handleDeleteClick}
          type="button"
          aria-label="Кнопка удаления карточки"
        />
      )}
    </li>
  );
}
