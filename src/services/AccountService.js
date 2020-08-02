import axios from 'axios'

const baseURL = 'https://localhost:5001/api/v1.0/account/'

export default class AccountService {
  static async login (user) {
    return axios
      .post(baseURL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('jwt', response.data.token)
          return response.data.token
        }

        return Promise.reject
      })
  }

  static async register (user) {
    return axios
      .post(baseURL + 'register', {
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('jwt', response.data.token)
          return response.data.token
        } else {
          return Promise.reject(response.data.message)
        }
      })
  }
}
