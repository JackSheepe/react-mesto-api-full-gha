import React from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DelCardPopup from "./DelCardPopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";

function App() {
  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const currentUserContext = React.useContext(CurrentUserContext);
  const [currentUser, setCurrentUser] = React.useState(currentUserContext);
  const [currentCard, setCurrentCard] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterSucces, setIsRegisterSucces] = React.useState(false);
  const [isDelCardPopupOpen, setisDelCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    likes: [],
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    owner: {},
    createdAt: "2019-07-05T08:10:57.741Z",
  });
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoToolTipOpen ||
    selectedCard.isOpen;
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDelCardClick(card) {
    setCurrentCard(card);
    setisDelCardPopupOpen(true);
  }
  function handleCardClick(card) {
    card.isOpen = true;
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisDelCardPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({ isOpen: false });
  }

  function handleCardLike(card, setCards) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card, setCards) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo({ name: name, bio: about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(link) {
    api
      .changeAvatar({ link: link })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .postCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAccExit() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  React.useEffect(() => {
    tokenCheck(jwt);
  }, [loggedIn, jwt]);

  const tokenCheck = (jwt) => {
    console.log(jwt);
    if (jwt) {
      Auth.getUser(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch(console.error);
    } else {
      setLoggedIn(false);
    }
  };

  function handleLogin(email, password) {
    Auth.login(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        navigate("/");
        setIsRegisterSucces(true);
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header loggedIn={loggedIn} email={email} onExit={handleAccExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDel={handleCardDelete}
                  onCardDelClick={handleDelCardClick}
                  cards={cards}
                  setCards={setCards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setIsRegisterSucces={setIsRegisterSucces}
                setIsInfoToolTipOpen={setIsInfoToolTipOpen}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                setIsRegisterSucces={setIsRegisterSucces}
                handleLogin={handleLogin}
              />
            }
          />
        </Routes>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <DelCardPopup
          isOpen={isDelCardPopupOpen}
          onClose={closeAllPopups}
          onDelCard={handleCardDelete}
          card={currentCard}
          setCards={setCards}
        />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          isValid={isRegisterSucces}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
