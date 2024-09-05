const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };

  const config = {
    dataUrl: 'https://jsonplaceholder.typicode.com',
  };

  class Api {
    constructor({ dataUrl, 
                 }) {
      this._dataUrl = dataUrl;
    }
  
    //Auth

    getUsers(num) {
      return fetch(`${this._dataUrl}/users/${num}`).then(onResponce);
    }

    sendUsers(obj) {
      return fetch(`${this._dataUrl}/posts`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(onResponce);
    }
  }  

const api = new Api(config);

export default api;