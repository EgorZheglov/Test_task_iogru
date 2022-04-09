class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res.status);
    return Promise.reject();
  }

  getUsers() {
    return fetch(`${this._url}/`, this._headers).then(this._checkResponse);
  }

  saveUser(data) {
    return fetch(`${this._url}/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  updateUser(data) {
    return fetch(`${this._url}/`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteUser(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
    }).catch((e) => console.log("err", e));
  }
}

export default new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
