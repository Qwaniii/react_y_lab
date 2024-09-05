const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };

  const config = {
    dataUrl: 'https://jsonplaceholder.typicode.com/users/',
  };

  class Api {
    constructor({ dataUrl, 
                 }) {
      this._dataUrl = dataUrl;
    }
  
    //Auth

    getUsers(num) {
      return fetch(`${this._dataUrl}/${num}`).then(onResponce);
    }
  }  

const api = new Api(config);

export default api;