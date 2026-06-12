'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as authService from '../../services/auth/authService'
import AuthShell from '../../components/shared/AuthShell'
import styles from '../../components/shared/auth.module.css'

type FormValues = {
  dni: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    clearErrors()
    setSubmitError(null)
    try {
      await authService.register({ ...data, role: 'CUSTOMER' })
      router.push('/login')
    } catch (e: any) {
      const message = String(e?.message || 'Error al crear la cuenta. Intenta nuevamente.')

      const isDni = /\bdni\b/i.test(message)
      const isEmail = /(correo|email)/i.test(message)
      const isPhone = /(tel[eé]fono|phone|celular)/i.test(message)
      const matchCount = [isDni, isEmail, isPhone].filter(Boolean).length

      if (matchCount === 1) {
        if (isDni) {
          setError('dni', { type: 'server', message: 'Ya existe una cuenta con este DNI.' })
        } else if (isEmail) {
          setError('email', { type: 'server', message: 'Ya existe una cuenta con este correo.' })
        } else if (isPhone) {
          setError('phone', { type: 'server', message: 'Ya existe una cuenta con este teléfono.' })
        }
      } else {
        setSubmitError(message)
      }
    }
  }

  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Completa tus datos y activa tu banca digital en minutos."
      switchText="Ya tienes cuenta?"
      switchLinkText="Inicia sesion"
      switchHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>DNI</label>
          <input
            {...register('dni')}
            className={styles.input}
            placeholder="Ingresa tu DNI"
            maxLength={8}
          />
          {errors.dni?.message && <div className={styles.errorMessage}>{errors.dni.message}</div>}
        </div>

        <div className={styles.gridTwo}>
          <div className={styles.field}>
            <label className={styles.label}>Nombres</label>
            <input {...register('firstName')} className={styles.input} placeholder="Tus nombres" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Apellidos</label>
            <input {...register('lastName')} className={styles.input} placeholder="Tus apellidos" />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Correo</label>
          <input {...register('email')} className={styles.input} placeholder="correo@ejemplo.com" />
          {errors.email?.message && <div className={styles.errorMessage}>{errors.email.message}</div>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Contrasena</label>
          <input
            type="password"
            {...register('password')}
            className={styles.input}
            placeholder="Minimo 8 caracteres"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Telefono</label>
          <input {...register('phone')} className={styles.input} placeholder="Celular de contacto" />
          {errors.phone?.message && <div className={styles.errorMessage}>{errors.phone.message}</div>}
        </div>

        {submitError && !errors.dni?.message && !errors.email?.message && !errors.phone?.message ? (
          <div className={styles.formError}>{submitError}</div>
        ) : null}

        <div className={styles.helperNote}>
          Usaremos tus datos solo para validar tu identidad y activar tu banca digital.
        </div>

        <button type="submit" className={styles.primaryButton}>Crear cuenta</button>
      </form>
    </AuthShell>
  )
}
