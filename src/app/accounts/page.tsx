'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createAccount, getAccounts } from '../../services/accounts/accountService'
import { Account } from '../../types/models'
import ProtectedPage from '../../components/shared/ProtectedPage'
import styles from '../../components/shared/protected.module.css'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const { register, handleSubmit, reset } = useForm<{ accountNumber: string; currency: string; userId: string }>()

  useEffect(() => { getAccounts().then((r) => setAccounts(r)).catch(() => {}) }, [])

  const onSubmit = async (data: { accountNumber: string; currency: string; userId: string }) => {
    try {
      await createAccount(data)
      reset()
      const updated = await getAccounts()
      setAccounts(updated)
    } catch (error: any) {
      alert(error?.message || 'Error al crear la cuenta')
    }
  }

  return (
    <ProtectedPage
      eyebrow="Gestión de cuentas"
      title="Cuentas bancarias"
      subtitle="Crea, consulta y controla el estado de tus cuentas con una interfaz más espaciosa y clara."
      primaryAction={{ label: 'Ir al dashboard', href: '/dashboard' }}
      secondaryAction={{ label: 'Transferencias', href: '/transfers' }}
      metrics={[
        { label: 'Cuentas registradas', value: String(accounts.length), hint: 'En esta sesión' },
        { label: 'Moneda principal', value: 'PEN', hint: 'Moneda local' },
        { label: 'Estado', value: 'Activo', hint: 'Conectado al backend' },
        { label: 'Operaciones', value: '24/7', hint: 'Acceso continuo' },
      ]}
    >
      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Nueva cuenta</h2>
              <p className={styles.cardText}>Completa los datos básicos para registrar una cuenta.</p>
            </div>
          </div>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Número de cuenta</label>
                <input {...register('accountNumber')} className={styles.input} placeholder="000123456789" />
              </div>
              <div className={styles.formTwoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Moneda</label>
                  <input {...register('currency')} placeholder="PEN" className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>User ID</label>
                  <input {...register('userId')} className={styles.input} placeholder="ID del cliente" />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.buttonPrimary}>Crear cuenta</button>
                <button type="button" className={styles.buttonGhost} onClick={() => reset()}>Limpiar</button>
              </div>
            </form>
          </div>
        </article>

        <article className={styles.card}>
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
        </article>
      </section>
    </ProtectedPage>
  )
}
