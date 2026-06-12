'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAccounts } from '../../services/accounts/accountService'
import { getLoans } from '../../services/loans/loanService'
import { Account, Loan } from '../../types/models'
import useAuthStore from '../../store/authStore'
import styles from '../../components/shared/protected.module.css'

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const user = useAuthStore((s) => s.user)

  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance || 0), 0)
  const activeLoans = loans.filter((loan) => loan.status === 'ACTIVE').length

  const lastSession = new Date().toLocaleString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const quickActions = [
    { label: 'Transferir dinero', href: '/transfers' },
    { label: 'Pagar tarjetas', href: '/accounts' },
    { label: 'Pagar servicios', href: '/accounts' },
    { label: 'Ver estados de cuenta', href: '/accounts' },
  ]

  useEffect(() => {
    getAccounts().then((r) => setAccounts(r)).catch(() => {})
    getLoans().then((r) => setLoans(r)).catch(() => {})
  }, [])

  return (
    <div className={styles.dashboardShell}>
      <header className={styles.dashboardHeader}>
        <div>
          <div className={styles.dashboardBadge}>Banco de la Nación</div>
          <h1 className={styles.dashboardTitle}>Portal operativo interno</h1>
          <p className={styles.dashboardSubtitle}>Acceso rápido a las funciones principales del portal.</p>
        </div>
        <div className={styles.dashboardUserArea}>
          <div className={styles.dashboardWelcome}>Bienvenido{user ? `, ${user.firstName}` : ''}</div>
          <div className={styles.dashboardMeta}>Última sesión: {lastSession}</div>
        </div>
      </header>

      <section className={styles.metrics}>
        <article className={styles.metricCard}>
          <div className={styles.metricLabel}>Cuentas</div>
          <div className={styles.metricValue}>{accounts.length}</div>
          <div className={styles.metricHint}>Productos activos</div>
        </article>
        <article className={styles.metricCard}>
          <div className={styles.metricLabel}>Saldo total</div>
          <div className={styles.metricValue}>S/ {totalBalance.toFixed(2)}</div>
          <div className={styles.metricHint}>Saldo consolidado</div>
        </article>
        <article className={styles.metricCard}>
          <div className={styles.metricLabel}>Préstamos vigentes</div>
          <div className={styles.metricValue}>{activeLoans}</div>
          <div className={styles.metricHint}>Operaciones abiertas</div>
        </article>
        <article className={styles.metricCard}>
          <div className={styles.metricLabel}>Movimientos</div>
          <div className={styles.metricValue}>{accounts.length * 2}</div>
          <div className={styles.metricHint}>Consultas recientes</div>
        </article>
      </section>

      <section className={styles.sectionRow}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Acceso rápido</h2>
              <p className={styles.cardText}>Selecciona la función más importante para ti.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.quickActions}>
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} className={styles.quickActionCard}>
                  <div className={styles.quickActionTitle}>{action.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Mis productos</h2>
              <p className={styles.cardText}>Tus cuentas activas y su saldo.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.productCards}>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <div key={account.id} className={styles.productCard}>
                    <div>
                      <div className={styles.productLabel}>{account.currency} • {account.status}</div>
                      <div className={styles.productTitle}>{account.accountNumber}</div>
                    </div>
                    <div className={styles.productBalance}>S/ {Number(account.balance).toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>No hay cuentas cargadas aún.</div>
              )}
            </div>
          </div>
        </article>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Resumen de préstamos</h2>
            <p className={styles.cardText}>Estado actual de tus compromisos financieros.</p>
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
    </div>
  )
}
