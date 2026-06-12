'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import useAuthStore from '../../store/authStore'
import styles from '../shared/auth.module.css'

type FormValues = {
  email: string
  password: string
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { email: '', password: '' } })
  const login = useAuthStore((s) => s.login)
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.email, data.password)
      router.push('/dashboard')
    } catch (e: any) {
      alert(e?.message || 'Error al iniciar sesion')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Correo</label>
        <input
          {...register('email', { required: true })}
          className={styles.input}
          placeholder="correo@ejemplo.com"
          type="email"
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Contrasena</label>
        <input
          {...register('password', { required: true })}
          type="password"
          className={styles.input}
          placeholder="Ingresa tu contrasena"
        />
      </div>
      <div className={styles.actionRow}>
        <a className={styles.inlineLink} href="#">Olvide mi contrasena</a>
      </div>
      <button type="submit" className={styles.primaryButton}>Ingresar</button>
    </form>
  )
}
