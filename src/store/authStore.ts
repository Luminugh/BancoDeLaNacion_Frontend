import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/models'
import * as authService from '../services/auth/authService'

interface AuthState {
  token: string | null
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (payload: any) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      login: async (email: string, password: string) => {
        const resp = await authService.login(email, password)
        const raw = resp as any
        const token = resp.accessToken || raw.token || raw.access_token
        const profile = resp.profile || raw.user || null

        if (!token) {
          throw new Error('Token no recibido')
        }

        // save token and user
        try {
          localStorage.setItem('token', token)
          if (profile) {
            localStorage.setItem('user', JSON.stringify(profile))
          }
        } catch (e) {
          // ignore
        }
        set({ token, user: profile })
      },
      register: async (payload: any) => {
        await authService.register(payload)
      },
      logout: () => {
        authService.logout()
        set({ token: null, user: null })
      },
    }),
    {
      name: 'bn-auth',
      storage: { getItem: (name) => { const str = localStorage.getItem(name); return str ? JSON.parse(str) : null; }, setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)), removeItem: (name) => localStorage.removeItem(name) },
    }
  )
)

export default useAuthStore
