class Api {
  constructor(url) {
    this._url = url;
  }

  getUserts() {
    return fetch(this._url).then((res) => {
        //setItems
        //renderItems
    });
  }

  createUser(data){
      return fetch(this._url)
  }
}
