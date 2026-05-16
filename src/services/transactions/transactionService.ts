import apiClient from '../api/apiClient'
import { Transaction } from '../../types/models'

const PATH = '/api/transactions'

export const getTransactions = async (): Promise<Transaction[]> => {
  const resp = await apiClient.get<Transaction[]>(PATH)
  return resp.data
}

export const getTransactionsByAccount = async (accountId: string): Promise<Transaction[]> => {
  const resp = await apiClient.get<Transaction[]>(`${PATH}/account/${accountId}`)
  return resp.data
}

export default { getTransactions, getTransactionsByAccount }
