import apiClient from '../api/apiClient'
import { User } from '../../types/models'

const PATH = '/api/profiles'

export const getProfiles = async (): Promise<User[]> => {
  const resp = await apiClient.get<User[]>(PATH)
  return resp.data
}

export const getProfileById = async (id: string): Promise<User> => {
  const resp = await apiClient.get<User>(`${PATH}/${id}`)
  return resp.data
}

export const createProfile = async (payload: Partial<User> & { password: string }): Promise<User> => {
  const resp = await apiClient.post<User>(PATH, payload)
  return resp.data
}

export default { getProfiles, getProfileById, createProfile }
