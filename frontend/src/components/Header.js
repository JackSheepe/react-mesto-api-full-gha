import logo from "../images/logo.svg";
import NavBar from "./NavBar";

export default function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Лого Место" className="header__logo" />
      <NavBar
        loggedIn={props.loggedIn}
        email={props.email}
        onExit={props.onExit}
      />
    </header>
  );
}
