export class Api {
    constructor(config) {
      this._url = config.url; //куда будут уходить наши запросы 
      this._headers = config.headers; 
    }

    _checkResponse(res) {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
  }

    getProfile(){
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
          })
          .then(this._checkResponse)
    }
    //получить список всех карточек в виде массива
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
        .then(this._checkResponse)
    }

    editProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name,
            about
          })
        })
          .then(this._checkResponse)
      }

    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name,
            link
          })
        })
          .then(this._checkResponse)
      }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(this._checkResponse)
      }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(this._checkResponse)
      }

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._headers,
        })
          .then(this._checkResponse)
      }
  
    // обновление аватара
    editAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
        .then(this._checkResponse)
    }
  }
  
  