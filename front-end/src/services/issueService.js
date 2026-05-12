import axios from 'axios'

const API = 'http://localhost:8080/api/v1/issues'

export const getIssues = () => {
  return axios.get(API)
}

export const getActiveIssues = () => {
  return axios.get(`${API}/active`)
}

export const getReturnedIssues = () => {
  return axios.get(`${API}/returned`)
}

export const getIssueById = (issueId) => {
  return axios.get(`${API}/${issueId}`)
}
export const getOverdueBooks = () => {
  return axios.get(`${API}/overdue`)
}

export const issueBook = (issueData) => {
  return axios.post(`${API}/issue`, issueData)
}

export const returnBook = (issueId) => {
  return axios.put(`${API}/return/${issueId}`)
}