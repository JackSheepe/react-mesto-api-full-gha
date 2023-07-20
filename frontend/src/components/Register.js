import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth.js";

function Register(props) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  function handleRegisterSucces() {
    props.setIsInfoToolTipOpen(true);
    props.setIsRegisterSucces(true);
  }

  function handleRegisterError() {
    props.setIsInfoToolTipOpen(true);
    props.setIsRegisterSucces(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    Auth.register(email, password)
      .then((res) => {
        console.log(res);
        if (!res.error) {
          navigate("/sign-in");
          handleRegisterSucces();
        } else {
          handleRegisterError();
        }
      })
      .catch((err) => {
        console.error(err);
        handleRegisterError();
      });
  };

  return (
    <div className="sign-in-up">
      <h1 className="sign-in-up__heading">Регистрация</h1>
      <form className="sign-in-up__form" onSubmit={handleSubmit}>
        <div className="sign-in-up__form-inputs">
          <input
            className="sign-in-up__form-input"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            className="sign-in-up__form-input"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Пароль"
          />
        </div>
        <button className="sign-in-up__form-submit" type="submit">
          Зарегестрироваться
        </button>
      </form>
      <Link to="/sign-in" className="sign-in-up__login-link btn">
        Уже зарегестрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
