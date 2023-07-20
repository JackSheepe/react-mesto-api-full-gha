import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.handleLogin(email, password);
  };

  return (
    <div className="sign-in-up">
      <h1 className="sign-in-up__heading">Вход</h1>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
