'use client'
import React, { useEffect, useState } from 'react'
import { getLoans } from '../../services/loans/loanService'
import { getLoanApplications, createLoanApplication } from '../../services/loanApplications/loanApplicationService'
import { createLoan } from '../../services/loans/loanService'
import { Loan, LoanApplication } from '../../types/models'
import { useForm } from 'react-hook-form'
import ProtectedPage from '../../components/shared/ProtectedPage'
import styles from '../../components/shared/protected.module.css'

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [applications, setApplications] = useState<LoanApplication[]>([])
  const { register, handleSubmit, reset } = useForm<any>()
  const { register: registerLoan, handleSubmit: handleLoanSubmit, reset: resetLoan } = useForm<any>()

  useEffect(() => {
    getLoans().then(setLoans).catch(()=>{})
    getLoanApplications().then(setApplications).catch(()=>{})
  }, [])

  const onSubmit = async (data: any) => {
    try {
      await createLoanApplication(data)
      alert('Solicitud enviada')
      reset()
      const updated = await getLoanApplications()
      setApplications(updated)
    } catch (e:any) { alert(e?.message || 'Error') }
  }

  const onCreateLoan = async (data: any) => {
    try {
      await createLoan(data)
      alert('Préstamo creado')
      resetLoan()
      const updated = await getLoans()
      setLoans(updated)
    } catch (e: any) {
      alert(e?.message || 'Error')
    }
  }

  return (
    <ProtectedPage
      eyebrow="Créditos"
      title="Préstamos"
      subtitle="Gestiona solicitudes, altas y seguimiento de saldos desde un solo panel crediticio."
      primaryAction={{ label: 'Ver dashboard', href: '/dashboard' }}
      secondaryAction={{ label: 'Cuentas', href: '/accounts' }}
      metrics={[
        { label: 'Préstamos', value: String(loans.length), hint: 'Vigentes y cerrados' },
        { label: 'Solicitudes', value: String(applications.length), hint: 'Pendientes de revisión' },
        { label: 'Flujo', value: 'Simplificado', hint: 'Interfaz más clara' },
        { label: 'Cobertura', value: '24/7', hint: 'Acceso continuo' },
      ]}
    >
      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Crear préstamo</h2>
              <p className={styles.cardText}>Formulario para registrar un nuevo préstamo en el sistema.</p>
            </div>
          </div>
          <div className={styles.formCard}>
            <form onSubmit={handleLoanSubmit(onCreateLoan)} className={styles.formGrid}>
              <div className={styles.formTwoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Monto solicitado</label>
                  <input {...registerLoan('requestedAmount')} className={styles.input} placeholder="0.00" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Plazo (meses)</label>
                  <input {...registerLoan('termMonths')} className={styles.input} placeholder="36" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Propósito</label>
                <input {...registerLoan('purpose')} className={styles.input} placeholder="Capital de trabajo, consumo, etc." />
              </div>
              <div className={styles.formTwoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Ingreso mensual</label>
                  <input {...registerLoan('monthlyIncome')} className={styles.input} placeholder="0.00" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>User ID</label>
                  <input {...registerLoan('userId')} className={styles.input} placeholder="ID del solicitante" />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.buttonPrimary}>Crear préstamo</button>
                <button type="button" className={styles.buttonGhost} onClick={() => resetLoan()}>Limpiar</button>
              </div>
            </form>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Solicitar préstamo</h2>
              <p className={styles.cardText}>Crea una solicitud con datos más ordenados y legibles.</p>
            </div>
          </div>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
              <div className={styles.formTwoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Monto solicitado</label>
                  <input {...register('requestedAmount')} className={styles.input} placeholder="0.00" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Plazo (meses)</label>
                  <input {...register('termMonths')} className={styles.input} placeholder="36" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Propósito</label>
                <input {...register('purpose')} className={styles.input} placeholder="Consolidación, consumo, etc." />
              </div>
              <div className={styles.formTwoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>Ingreso mensual</label>
                  <input {...register('monthlyIncome')} className={styles.input} placeholder="0.00" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>User ID</label>
                  <input {...register('userId')} className={styles.input} placeholder="ID del solicitante" />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.buttonPrimary}>Enviar solicitud</button>
                <button type="button" className={styles.buttonGhost} onClick={() => reset()}>Limpiar</button>
              </div>
            </form>
          </div>
        </article>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Lista de préstamos</h2>
              <p className={styles.cardText}>Portafolio de préstamos cargados desde el backend.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.panelList}>
              {loans.length > 0 ? (
                loans.map((loan) => (
                  <div key={loan.id} className={styles.panelItem}>
                    <div className={styles.itemMain}>
                      <div className={styles.itemTitle}>{loan.loanNumber}</div>
                      <div className={styles.itemSubtitle}>{loan.status} • {loan.termMonths} meses</div>
                    </div>
                    <div className={styles.badge}>S/ {Number(loan.remainingBalance).toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>No hay préstamos registrados aún.</div>
              )}
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Solicitudes de préstamo</h2>
              <p className={styles.cardText}>Revisiones y solicitudes que esperan estado de aprobación.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.panelList}>
              {applications.length > 0 ? (
                applications.map((application) => (
                  <div key={application.id} className={styles.panelItem}>
                    <div className={styles.itemMain}>
                      <div className={styles.itemTitle}>{application.purpose}</div>
                      <div className={styles.itemSubtitle}>{application.status} • {application.termMonths} meses</div>
                    </div>
                    <div className={styles.badge}>S/ {Number(application.requestedAmount).toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>No hay solicitudes para mostrar todavía.</div>
              )}
            </div>
          </div>
        </article>
      </section>
    </ProtectedPage>
  )
}
