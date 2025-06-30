export const apiConfig = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'e13d59dc-9935-43f6-b43b-16019efceb77',
    'Content-Type': 'application/json',
  },
};

export function getUserInfo() {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: 'GET',
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res.status);
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

export function syncUserInfo(avatarElement, profileNameElement, profileDescriptionElement) {
  getUserInfo().then((data) => {
    avatarElement.style.backgroundImage = `url(${data.avatar})`;
    profileNameElement.textContent = data.name;
    profileDescriptionElement.textContent = data.about;
    console.log(data.about);
  });
}

export function getAllCards() {
  return fetch(`${apiConfig.baseURL}/cards`, { method: 'GET', headers: apiConfig.headers }).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise(reject(`Ошибка:${res.status}`));
    }
  );
}

export function editUser(name, about) {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({ name: name, about: about }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise(reject(`Ошибка:${res.status}`));
  });
}

export function addCardAPI(name, link) {
  return fetch(`${apiConfig.baseURL}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({ name: name, link: link }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise(reject(`Ошибка:${res.status}`));
  });
}

export function deleteCardAPI(cardID) {
  return fetch(`${apiConfig.baseURL}/cards/${cardID}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise(reject(`Ошибка:${res.status}`));
  });
}

export function likeCardAPI(cardID) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise(reject(`Ошибка:${res.status}`));
  });
}

export function unlikeCardAPI(cardID) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise(reject(`Ошибка:${res.status}`));
  });
}

export function editProfileImageAPI(avatarURL) {
  return fetch(`${apiConfig.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({ avatar: avatarURL }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise(reject(`Ошибка:${res.status}`));
  });
}
