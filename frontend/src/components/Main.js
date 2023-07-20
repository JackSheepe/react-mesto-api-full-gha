import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="аватар профиля"
            className="profile__avatar"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="btn profile__edit-btn"
              onClick={props.onEditProfile}
              type="button"
              aria-label="Кнопка редактирования профиля"
            ></button>
          </div>
          <p className="profile__bio">{currentUser.about}</p>
        </div>
        <button
          className="btn profile__add-btn"
          onClick={props.onAddPlace}
          type="button"
          aria-label="Кнопка добавления"
        ></button>
      </section>
      <section>
        <ul className="elements">
          {props.cards.map((card, i) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              setCards={props.setCards}
              onCardDel={props.onCardDel}
              onCardDelClick={props.onCardDelClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
