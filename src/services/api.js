import axios from 'axios'
import store from '@/store'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/v1'
})

const conf = {
  headers: {
    'Content-Type': 'application/json'
  }
}
api.interceptors.request.use(
  (config) => {
    const token = store.state.jwt
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const property = {
  all: params => api.get('/property', { params }),
  find: params => api.get('/property/find', { params }),
  byId: params => api.get(`/property/${params}`, { params }),
  post: params => api.post('/property', params, conf),
  delete: params => api.delete('/property', { params })
}
const review = {
  all: params => api.get('/reviews', { params })
}
const dates = {
  check: params => api.get('/availability/checkdates', { params }),
  post: params => api.post('/availability', params, conf),
  allFor: params => api.get('/availability', { params })

}
const reservations = {
  all: params => api.get('/reservation', { params }),
  post: params => api.post('/reservation', params, conf)
}
const rooms = {
  all: params => api.get(`/room/${params}`, { params }),
  post: params => api.post('/room', params, conf),
  byId: params => api.get(`/room/${params}`, { params })
}
const policies = {
  all: params => api.get('/policy', { params }),
  post: params => api.post('/policy', params, conf)
}
export default {
  property,
  review,
  dates,
  reservations,
  rooms,
  policies
}
