import apiClient from '../api/apiClient'
import { Account } from '../../types/models'

const PATH = '/api/accounts'

export type AccountCreationRequest = {
  currency: string
  status?: Account['status']
}

export const getAccounts = async (): Promise<Account[]> => {
  const resp = await apiClient.get<Account[]>(PATH)
  return resp.data
}

export const getAccountById = async (id: string): Promise<Account> => {
  const resp = await apiClient.get<Account>(`${PATH}/${id}`)
  return resp.data
}

export const createAccount = async (payload: AccountCreationRequest): Promise<Account> => {
  const resp = await apiClient.post<Account>(PATH, payload)
  return resp.data
}

export default { getAccounts, getAccountById, createAccount }
