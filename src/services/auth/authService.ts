import apiClient from '../api/apiClient'
import { AuthResponse, User } from '../../types/models'

const PATH = '/api/auth'

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const resp = await apiClient.post<AuthResponse>(`${PATH}/login`, { email, password })
  return resp.data
}

export const register = async (payload: Partial<User> & { password: string }): Promise<User> => {
  const resp = await apiClient.post<User>(`${PATH}/register`, payload)
  return resp.data
}

export const getProfile = async (): Promise<User> => {
  const resp = await apiClient.get<User>('/api/profiles')
  return resp.data
}

export const getProfileById = async (id: string): Promise<User> => {
  const resp = await apiClient.get<User>(`/api/profiles/${id}`)
  return resp.data
}

export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } catch (e) {
    // ignore
  }
}

export default { login, register, getProfile, logout }
