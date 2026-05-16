import apiClient from '../api/apiClient'
import { Loan } from '../../types/models'

const PATH = '/api/loans'

export const getLoans = async (): Promise<Loan[]> => {
  const resp = await apiClient.get<Loan[]>(PATH)
  return resp.data
}

export const getLoanById = async (id: string): Promise<Loan> => {
  const resp = await apiClient.get<Loan>(`${PATH}/${id}`)
  return resp.data
}

export const createLoan = async (payload: Partial<Loan>): Promise<Loan> => {
  const resp = await apiClient.post<Loan>(PATH, payload)
  return resp.data
}

export default { getLoans, getLoanById, createLoan }
