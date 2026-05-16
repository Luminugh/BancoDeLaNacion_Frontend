'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './chrome.module.css'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/accounts', label: 'Cuentas' },
    { href: '/transfers', label: 'Transferencias' },
    { href: '/loans', label: 'Préstamos' },
    { href: '/profile', label: 'Perfil' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHead}>
        <div className={styles.sidebarTitle}>Navegación</div>
        <div className={styles.sidebarText}>Acceso rápido a las funciones principales del portal.</div>
      </div>
      <nav className={styles.sidebarNav}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
