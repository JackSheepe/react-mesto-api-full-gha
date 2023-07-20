import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  const currentPath = window.location.pathname;
  console.log(props.onExit);
  return (
    <nav className="menu">
      {props.loggedIn ? (
        <span className="menu__email">
          {props.email}{" "}
          <button onClick={props.onExit} className="menu__exit-btn btn">
            Выйти
          </button>
        </span>
      ) : (
        <NavLink
          className="menu__link btn"
          to={currentPath === "/sign-in" ? "/sign-up" : "/sign-in"}
        >
          {currentPath === "/sign-in" ? "Регистрация" : "Войти"}
        </NavLink>
      )}
    </nav>
  );
}

export default NavBar;
