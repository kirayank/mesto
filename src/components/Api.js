export class Api {
    constructor(config) {
      this._url = config.url; //куда будут уходить наши запросы 
      this._headers = config.headers; 
    }

    getProfile(){
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
          })
          .then(res => res.ok ? res.json() : Promise.reject(res.status))
          .catch(console.log)
    }
    //получить список всех карточек в виде массива
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
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
          .then(res => res.ok ? res.json() : Promise.reject(res.status))
          .catch(console.log)
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
          .then(res => res.ok ? res.json() : Promise.reject(res.status))
          .catch(console.log)
      }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(res => res.ok ? res.json() : Promise.reject(res.status))
          .catch(console.log)
      }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(res => res.ok ? res.json() : Promise.reject(res.status))
          .catch(console.log)
      }

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._headers,
        })
          .then(res => res.ok ? res.json() : Promise.reject(res.status))
          .catch(console.log)
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
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }
  }
  
  