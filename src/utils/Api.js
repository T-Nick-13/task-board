export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
  }

  getHeaders() {
   const token = localStorage.getItem('token');
    return {
      ...this.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res)
  }

  getTasks() {
    return fetch(`${this._url}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServerResponse);
  }

  createTask(data) {
    return fetch(`${this._url}`, {
      method: 'POST',
      body: data
    })
    .then(this._checkServerResponse);
  }

  deleteTask(taskId) {
    return fetch(`${this._url}/${taskId}`, {
      method: 'DELETE'
    })
    .then(this._checkServerResponse);
  }

  editTask(data) {
    return fetch(`${this._url}/_method=PUT`, {
      method: 'POST',
      body: data
    })
    .then(this._checkServerResponse);
  }

  editField(data, taskId) {
    return fetch(`${this._url}/${taskId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    })
    .then(this._checkServerResponse);
  }



}
