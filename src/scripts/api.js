const authorization = '8ea6f8e0-e13a-4f60-9040-cf1deae5ef7b';

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function getUserInfoApi() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
        method: 'GET',
        headers: {
            authorization
        }
    })
    .then(handleResponse)
}

export function getCardsApi() {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards`, {
        method: 'GET',
        headers: {
            authorization
        }
    })
    .then(handleResponse)
}

export function updateUserInfoApi({ name, about }) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
        method: 'PATCH',
        headers: {
            authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            about,
        })
    })
    .then(handleResponse)
}

export function updateUserPhotoApi(avatar) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar ', {
        method: 'PATCH',
        headers: {
            authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar,
        })
    })
    .then(handleResponse)
}

export function createCardApi({ name, link }) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-6/cards', {
        method: 'POST',
        headers: {
            authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            link,
        })
    })
    .then(handleResponse)
}

export function deleteCardApi(id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization,
        },
    })
    .then(handleResponse)
}

export function putLikeApi(id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization,
        },
    })
    .then(handleResponse)
}

export function deleteLikeApi(id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization,
        },
    })
    .then(handleResponse)
}