import axios from 'axios'

const API = 'http://localhost:8080/api/v1/members'

export const getMembers = () => {
  return axios.get(API)
}

export const getMemberById = (memberId) => {
  return axios.get(`${API}/${memberId}`)
}

export const addMember = (memberData) => {
  return axios.post(API, memberData)
}

export const updateMember = (memberId, memberData) => {
  return axios.put(`${API}/${memberId}`, memberData)
}

export const deleteMember = (memberId) => {
  return axios.delete(`${API}/${memberId}`)
}

export const getMemberBooks = (memberId) => {
  return axios.get(`${API}/${memberId}/books`)
}

export const getMemberActiveIssues = (memberId) => {
  return axios.get(`${API}/${memberId}/active-issues`)
}