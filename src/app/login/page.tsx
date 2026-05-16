'use client'
import React from 'react'
import LoginForm from '../../components/forms/LoginForm'
import AuthShell from '../../components/shared/AuthShell'

export default function LoginPage() {
  return (
    <AuthShell
      title="Iniciar sesion"
      subtitle="Accede con tu correo y contrasena para continuar."
      switchText="No tienes cuenta?"
      switchLinkText="Crear cuenta"
      switchHref="/register"
    >
      <LoginForm />
    </AuthShell>
  )
}
