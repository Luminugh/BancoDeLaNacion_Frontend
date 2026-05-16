'use client'
import React, { useEffect, useState } from 'react'
import { getAccounts } from '../../services/accounts/accountService'
import { getLoans } from '../../services/loans/loanService'
import { Account, Loan } from '../../types/models'
import useAuthStore from '../../store/authStore'
import ProtectedPage from '../../components/shared/ProtectedPage'
import styles from '../../components/shared/protected.module.css'

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const user = useAuthStore((s) => s.user)

  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance || 0), 0)
  const activeLoans = loans.filter((loan) => loan.status === 'ACTIVE').length

  useEffect(() => {
    getAccounts().then((r) => setAccounts(r)).catch(() => {})
    getLoans().then((r) => setLoans(r)).catch(() => {})
  }, [])

  return (
    <ProtectedPage
      eyebrow="Panel de control"
      title={`Bienvenido${user ? `, ${user.firstName}` : ''}`}
      subtitle="Consulta tus cuentas, presta seguimiento a tus préstamos y accede a las operaciones clave desde un solo lugar."
      primaryAction={{ label: 'Ver cuentas', href: '/accounts' }}
      secondaryAction={{ label: 'Nueva transferencia', href: '/transfers' }}
      metrics={[
        { label: 'Cuentas', value: String(accounts.length), hint: 'Productos activos' },
        { label: 'Saldo total', value: `S/ ${totalBalance.toFixed(2)}`, hint: 'Suma consolidada' },
        { label: 'Préstamos', value: String(loans.length), hint: 'Operaciones registradas' },
        { label: 'Activos', value: String(activeLoans), hint: 'Préstamos vigentes' },
      ]}
    >
      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Resumen de cuentas</h2>
              <p className={styles.cardText}>Un vistazo rápido a tus cuentas y estado actual.</p>
            </div>
            <span className={styles.badge}>{accounts.length} cuentas</span>
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
                    <div className={styles.badge}>{a.currency} {Number(a.balance).toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>Todavía no tienes cuentas cargadas en esta sesión.</div>
              )}
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Alertas y seguimiento</h2>
              <p className={styles.cardText}>Indicadores rápidos para guiar tu siguiente acción.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.panelList}>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Préstamos vigentes</div>
                  <div className={styles.itemSubtitle}>Estado actual de tus productos crediticios</div>
                </div>
                <div className={styles.badge}>{activeLoans}</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Acceso rápido</div>
                  <div className={styles.itemSubtitle}>Ve a transferencias o cuentas cuando lo necesites</div>
                </div>
                <div className={styles.badge}>Disponible</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Seguridad</div>
                  <div className={styles.itemSubtitle}>Tu sesión está protegida por token autenticado</div>
                </div>
                <div className={styles.badge}>Activa</div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Préstamos recientes</h2>
            <p className={styles.cardText}>Detalle de tus préstamos y saldos pendientes.</p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.gridThree}>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <article key={loan.id} className={styles.metricCard}>
                  <div className={styles.metricLabel}>{loan.loanNumber}</div>
                  <div className={styles.metricValue}>S/ {Number(loan.remainingBalance).toFixed(2)}</div>
                  <div className={styles.metricHint}>{loan.status} • {loan.termMonths} meses</div>
                </article>
              ))
            ) : (
              <div className={styles.emptyState}>No hay préstamos para mostrar todavía.</div>
            )}
          </div>
        </div>
      </section>
    </ProtectedPage>
  )
}
