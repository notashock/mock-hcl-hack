import axios from 'axios'

const API = 'http://localhost:8080/api/v1/auth'

export const registerUser = (userData) => {
  return axios.post(`${API}/register`, userData)
}

export const loginUser = (loginData) => {
  return axios.post(`${API}/login`, loginData)
}

export const logoutUser = () => {
  localStorage.removeItem('token')
}