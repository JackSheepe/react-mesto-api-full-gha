export const BASE_URL = "https ://api.mesto.pesto.nomoredomains.xyz";

function _getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then((res) => _getResponseData(res));
};

export const login = (email, password) => {
  console.log(email, password);
  console.log(`${BASE_URL}/signin`);

  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
    credentials: "include",
  }).then((res) => _getResponseData(res));
};

export const getUser = (JWT) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  }).then((res) => _getResponseData(res));
};
