import {createContext, useState, useEffect} from 'react'
import {post, get} from '../lib/api'

export const AuthContext = createContext(null)

export function AuthProvider({children}){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      // naive load
      get('/api/users/me').then(u=>setUser(u)).catch(()=>{})
    }
  },[])

  async function login(credentials){
    const res = await post('/api/auth/login', credentials)
    if(res && res.token){
      localStorage.setItem('token', res.token)
      const me = await get('/api/users/me')
      setUser(me)
      return true
    }
    return false
  }

  function logout(){
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
