'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createTransfer } from '../../services/transfers/transferService'
import ProtectedPage from '../../components/shared/ProtectedPage'
import styles from '../../components/shared/protected.module.css'

type FormValues = {
  senderAccountId: string
  receiverAccountId: string
  amount: number
  description?: string
}

export default function TransfersPage() {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    try {
      await createTransfer(data)
      alert('Transferencia creada')
    } catch (e: any) {
      alert(e?.message || 'Error')
    }
  }

  return (
    <ProtectedPage
      eyebrow="Movimientos"
      title="Transferencias"
      subtitle="Envía dinero entre cuentas con una interfaz limpia, más cómoda y preparada para operar rápido."
      primaryAction={{ label: 'Ver dashboard', href: '/dashboard' }}
      secondaryAction={{ label: 'Mis cuentas', href: '/accounts' }}
      metrics={[
        { label: 'Estado', value: 'En línea', hint: 'Conexión al servicio' },
        { label: 'Límite', value: 'Disponible', hint: 'Según tu perfil' },
        { label: 'Seguridad', value: 'Alta', hint: 'Autenticación activa' },
        { label: 'Tiempo', value: 'Inmediato', hint: 'Procesamiento ágil' },
      ]}
    >
      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Nueva transferencia</h2>
              <p className={styles.cardText}>Ingresa los datos de origen, destino y monto a transferir.</p>
            </div>
          </div>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Cuenta origen</label>
                <input {...register('senderAccountId')} className={styles.input} placeholder="ID de cuenta origen" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Cuenta destino</label>
                <input {...register('receiverAccountId')} className={styles.input} placeholder="ID de cuenta destino" />
              </div>
              <div className={styles.formTwoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Monto</label>
                  <input type="number" {...register('amount', { valueAsNumber: true })} className={styles.input} placeholder="0.00" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Descripción</label>
                  <input {...register('description')} className={styles.input} placeholder="Pago, envío, etc." />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.buttonPrimary}>Enviar transferencia</button>
                <button type="button" className={styles.buttonGhost} onClick={() => {}}>Cancelar</button>
              </div>
            </form>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Recomendaciones</h2>
              <p className={styles.cardText}>Reduce errores antes de confirmar una operación.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.panelList}>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Verifica la cuenta destino</div>
                  <div className={styles.itemSubtitle}>Confirma el ID antes de enviar fondos.</div>
                </div>
                <div className={styles.badge}>Paso 1</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Revisa el monto</div>
                  <div className={styles.itemSubtitle}>Evita errores de digitación en operaciones sensibles.</div>
                </div>
                <div className={styles.badge}>Paso 2</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Guarda el comprobante</div>
                  <div className={styles.itemSubtitle}>Usa el mensaje de confirmación como respaldo.</div>
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
