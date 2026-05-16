'use client'
import React from 'react'
import styles from './chrome.module.css'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.brandMark} />
        <div className={styles.brandText}>
          <div className={styles.brandTitle}>Banco de la Nación</div>
          <div className={styles.brandSubtitle}>Portal operativo interno</div>
        </div>
      </div>

      <div className={styles.userArea}>
        {user ? (
          <>
            <span className={styles.userChip}>
              <span className={styles.userDot} />
              {user.firstName} {user.lastName}
            </span>
            <button onClick={() => logout()} className={styles.logoutButton}>Salir</button>
          </>
        ) : (
          <span className={styles.userChip}>Invitado</span>
        )}
      </div>
    </nav>
  )
}
