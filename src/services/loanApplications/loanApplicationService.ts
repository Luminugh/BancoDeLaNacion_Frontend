import apiClient from '../api/apiClient'
import { LoanApplication } from '../../types/models'

const PATH = '/api/loan-applications'

export const getLoanApplications = async (): Promise<LoanApplication[]> => {
  const resp = await apiClient.get<LoanApplication[]>(PATH)
  return resp.data
}

export const createLoanApplication = async (payload: Partial<LoanApplication>): Promise<LoanApplication> => {
  const resp = await apiClient.post<LoanApplication>(PATH, payload)
  return resp.data
}

export default { getLoanApplications, createLoanApplication }
