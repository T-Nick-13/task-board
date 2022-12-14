export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res)
  }

  getTasks() {
    return fetch(`${this._url}/tasks`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServerResponse);
  }

  createTask(data) {
    return fetch(`${this._url}/tasks`, {
      method: 'POST',
      body: data
    })
    .then(this._checkServerResponse);
  }

  deleteTask(taskId) {
    return fetch(`${this._url}/${taskId}/tasks`, {
      method: 'DELETE'
    })
    .then(this._checkServerResponse);
  }

  editTask(data) {
    return fetch(`${this._url}/tasks/_method=PUT`, {
      method: 'POST',
      body: data
    })
    .then(this._checkServerResponse);
  }

  editField(data, taskId) {
    return fetch(`${this._url}/${taskId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    })
    .then(this._checkServerResponse);
  }

  editTaskOnBoard(data) {
    return fetch(`${this._url}/tasks/board`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServerResponse);
  }

  getProjects() {
    return fetch(`${this._url}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServerResponse);
  }

  createProject(data) {
    return fetch(`${this._url}`, {
      method: 'POST',
      body: data
    })
    .then(this._checkServerResponse);
  }





}
