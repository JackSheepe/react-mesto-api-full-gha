export default class Api {
  constructor(options) {
    this._options = options;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo({ name, bio }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: bio,
      }),
    }).then((res) => this._getResponseData(res));
  }

  postCard({ name, link }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  likeCard(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  unlikeCard(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.unlikeCard(id);
    } else {
      return this.likeCard(id);
    }
  }

  changeAvatar({ link }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: "https://api.mesto.pesto.nomoredomains.xyz",
});
