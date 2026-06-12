'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createAccount } from '../../../services/accounts/accountService'
import ProtectedPage from '../../../components/shared/ProtectedPage'
import styles from '../../../components/shared/protected.module.css'

type AccountRequestForm = {
  currency: string
}

export default function AccountRequestPage() {
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<AccountRequestForm>({
    defaultValues: { currency: 'PEN' },
  })

  const onSubmit = async (data: AccountRequestForm) => {
    try {
      await createAccount({ currency: data.currency, status: 'PENDING' })
      alert('Solicitud enviada para aprobación')
      reset()
      router.push('/accounts')
    } catch (error: any) {
      alert(error?.message || 'Error al enviar la solicitud de cuenta')
    }
  }

  return (
    <ProtectedPage
      eyebrow="Solicitud de cuentas"
      title="Nueva ventana de solicitud"
      subtitle="Selecciona la moneda para enviar la petición. El número de cuenta y el usuario se asignan automáticamente en la revisión."
      primaryAction={{ label: 'Volver a cuentas', href: '/accounts' }}
      secondaryAction={{ label: 'Ir al dashboard', href: '/dashboard' }}
    >
      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Formulario de solicitud</h2>
              <p className={styles.cardText}>Esta ventana es solo para pedir la creación de una cuenta nueva.</p>
            </div>
          </div>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Moneda</label>
                <select {...register('currency')} className={styles.select}>
                  <option value="PEN">Soles peruanos (PEN)</option>
                  <option value="USD">Dólares estadounidenses (USD)</option>
                  <option value="EUR">Euros (EUR)</option>
                </select>
                <p className={styles.cardText}>La solicitud quedará con estado pendiente de aprobación.</p>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.buttonPrimary}>Enviar solicitud</button>
                <button type="button" className={styles.buttonGhost} onClick={() => reset()}>Limpiar</button>
              </div>
            </form>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Cómo funciona</h2>
              <p className={styles.cardText}>El sistema completa automáticamente los datos sensibles.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.panelList}>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>1. Selecciona la moneda</div>
                  <div className={styles.itemSubtitle}>Solo se solicita el tipo de moneda de la cuenta</div>
                </div>
                <div className={styles.badge}>Paso 1</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>2. Se registra la solicitud</div>
                  <div className={styles.itemSubtitle}>El alta queda en estado pendiente para aprobación</div>
                </div>
                <div className={styles.badge}>Paso 2</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>3. El banco genera la cuenta</div>
                  <div className={styles.itemSubtitle}>Número de cuenta y usuario se asignan automáticamente</div>
                </div>
                <div className={styles.badge}>Paso 3</div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </ProtectedPage>
  )
}