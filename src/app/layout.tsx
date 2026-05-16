'use client'
import React, { useEffect } from 'react'
import '../styles/globals.css'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '../store/authStore'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const pathname = usePathname()
  const router = useRouter()
  const isPublicRoute = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/banca'

  useEffect(() => {
    // Protect routes: if no token and not on /login or /register, redirect to /login
    const protectedPaths = ['/dashboard', '/accounts', '/transfers', '/loans', '/profile']
    if (!token && protectedPaths.some((p) => pathname?.startsWith(p))) {
      router.push('/login')
    }
  }, [token, pathname, router])

  return (
    <html lang="es">
      <body>
        {isPublicRoute ? (
          children
        ) : (
          <>
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </>
        )}
      </body>
    </html>
  )
}
