'use client'
import React from 'react'
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
  const { register, handleSubmit } = useForm<FormValues>()
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    try {
      await authService.register({ ...data, role: 'CUSTOMER' })
      router.push('/login')
    } catch (e: any) {
      alert(e?.message || 'Error')
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
        </div>

        <div className={styles.gridTwo}>
          <div className={styles.field}>
            <label className={styles.label}>Nombre</label>
            <input {...register('firstName')} className={styles.input} placeholder="Tus nombres" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Apellido</label>
            <input {...register('lastName')} className={styles.input} placeholder="Tus apellidos" />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Correo</label>
          <input {...register('email')} className={styles.input} placeholder="correo@ejemplo.com" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Contrasena</label>
          <input type="password" {...register('password')} className={styles.input} placeholder="Minimo 8 caracteres" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Telefono</label>
          <input {...register('phone')} className={styles.input} placeholder="Celular de contacto" />
        </div>

        <div className={styles.helperNote}>
          Usaremos tus datos solo para validar tu identidad y activar tu banca digital.
        </div>

        <button type="submit" className={styles.primaryButton}>Crear cuenta</button>
      </form>
    </AuthShell>
  )
}
