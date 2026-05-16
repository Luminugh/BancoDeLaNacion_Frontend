import axios, { AxiosInstance } from 'axios'
import { ApiResponse } from '../../types/api'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach token
apiClient.interceptors.request.use((config) => {
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }
  } catch (e) {
    // ignore
  }
  return config
})

// Response interceptor to unwrap ApiResponse<T>
apiClient.interceptors.response.use(
  (response) => {
    // Backend always returns ApiResponse<T> in body
    const data: ApiResponse<any> = response.data
    // If it's not the ApiResponse shape, return data as-is
    if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
      if (!data.success) {
        // Convert to error to be handled downstream
        return Promise.reject({ message: data.message || 'Server error', response: { data } })
      }
      // replace Axios response with nested data value
      response.data = data.data
      return response
    }
    return response
  },
  (error) => {
    // You can centralize error handling here (401 logout, toasts, etc.)
    // If response contains ApiResponse, propagate its message
    if (error?.response?.data) {
      const possible: ApiResponse<any> = error.response.data
      if (possible && typeof possible === 'object' && 'message' in possible) {
        error.message = possible.message
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
