import axios from 'axios'

const API = 'http://localhost:8080/api/v1/books'

export const getBooks = () => {
  return axios.get(API)
}

export const getAvailableBooks = () => {
  return axios.get(`${API}/available`)
}

export const getBookById = (bookId) => {
  return axios.get(`${API}/${bookId}`)
}

export const searchBooks = (keyword) => {
  return axios.get(`${API}/search?keyword=${keyword}`)
}

export const addBook = (bookData) => {
  return axios.post(API, bookData)
}

export const updateBook = (bookId, bookData) => {
  return axios.put(`${API}/${bookId}`, bookData)
}

export const deleteBook = (bookId) => {
  return axios.delete(`${API}/${bookId}`)
}