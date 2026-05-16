import apiClient from '../api/apiClient'
import { Transfer } from '../../types/models'

const PATH = '/api/transfers'

export const createTransfer = async (payload: Partial<Transfer>): Promise<Transfer> => {
  const resp = await apiClient.post<Transfer>(PATH, payload)
  return resp.data
}

export default { createTransfer }
