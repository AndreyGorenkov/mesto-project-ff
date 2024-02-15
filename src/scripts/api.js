const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: '8ea6f8e0-e13a-4f60-9040-cf1deae5ef7b',
      'Content-Type': 'application/json'
    }
  }

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function getUserInfoApi() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(handleResponse)
}

export function getCardsApi() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(handleResponse)
}

export function updateUserInfoApi({ name, about }) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
    .then(handleResponse)
}

export function updateUserPhotoApi(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
    .then(handleResponse)
}

export function createCardApi({ name, link }) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
    .then(handleResponse)
}

export function deleteCardApi(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        },
    })
    .then(handleResponse)
}

export function putLikeApi(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        },
    })
    .then(handleResponse)
}

export function deleteLikeApi(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        },
    })
    .then(handleResponse)
}