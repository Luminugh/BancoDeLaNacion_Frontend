'use client'
import React, { useEffect, useState } from 'react'
import { getAccounts } from '../../services/accounts/accountService'
import { Account } from '../../types/models'
import ProtectedPage from '../../components/shared/ProtectedPage'
import styles from '../../components/shared/protected.module.css'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    getAccounts().then((r) => setAccounts(r)).catch(() => {})
  }, [])

  return (
    <ProtectedPage
      eyebrow="Gestión de cuentas"
      title="Cuentas bancarias"
      subtitle="Consulta tus cuentas y abre la ventana de solicitud cuando necesites pedir una nueva."
      primaryAction={{ label: 'Solicitar nueva cuenta', href: '/accounts/request' }}
      secondaryAction={{ label: 'Transferencias', href: '/transfers' }}
      metrics={[
        { label: 'Cuentas registradas', value: String(accounts.length), hint: 'En esta sesión' },
        { label: 'Moneda principal', value: 'PEN', hint: 'Moneda local' },
        { label: 'Solicitud', value: 'Disponible', hint: 'Se abre en una ventana dedicada' },
        { label: 'Proceso', value: 'Automático', hint: 'Número y usuario se asignan solos' },
      ]}
    >
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Cuentas disponibles</h2>
            <p className={styles.cardText}>Resumen de las cuentas cargadas desde el backend.</p>
          </div>
          <span className={styles.badge}>{accounts.length}</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.panelList}>
            {accounts.length > 0 ? (
              accounts.map((a) => (
                <div key={a.id} className={styles.panelItem}>
                  <div className={styles.itemMain}>
                    <div className={styles.itemTitle}>{a.accountNumber}</div>
                    <div className={styles.itemSubtitle}>{a.currency} • {a.status}</div>
                  </div>
                  <div className={styles.badge}>{Number(a.balance).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>Aún no hay cuentas para mostrar.</div>
            )}
          </div>
        </div>
      </section>
    </ProtectedPage>
  )
}
