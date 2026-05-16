"use client"
import React from 'react'
import Link from 'next/link'
import styles from './landing.module.css'

export default function HeaderMain(){
  return (
    <header className={styles.headerRoot}>
      <div className={styles.topStrip}>
        <div className={styles.topStripLeft}>
          <img src="/image/escudo.png" alt="Escudo del Perú" className={styles.escudoIcon} />
          <span className={styles.peBadge}>República del Perú</span>
          <nav className={styles.utilityTabs}>
            <span className={styles.active}>Clientes</span>
            <span>Ciudadanos</span>
            <span>Entidades del Gobierno</span>
          </nav>
        </div>
        <div className={styles.topStripRight}>
          <span>Portal de Transparencia</span>
          <img src="/image/PTE.png" alt="Portal de Transparencia" className={styles.pteIcon} />
        </div>
      </div>

      <div className={styles.brandBar}>
        <div className={styles.brandRow}>
          <div className={styles.brandLeft}>
            <img src="/image/logoBN.png" alt="Banco de la Nación" className={styles.brandLogo} />
            <nav className={styles.navLinks}>
              <Link href="#productos">Productos y Servicios</Link>
              <Link href="#canales">Canales Digitales</Link>
              <Link href="#beneficios">BN Beneficios</Link>
            </nav>
          </div>

          <div className={styles.brandRight}>
            <form onSubmit={(e)=>e.preventDefault()} className={styles.searchBox}>
              <img src="/image/lupa.png" alt="Buscar" width={16} height={16} />
              <input placeholder="Buscar" />
            </form>
            <a href="https://www.pagalo.pe/" target="_blank" rel="noreferrer" className={styles.pagaloButton} aria-label="págalo.pe">
              <img src="/image/logo-pagalo.png" alt="págalo.pe" className={styles.pagaloLogo} />
            </a>
            <div className={styles.authButtons}>
              <Link href="/login" className={styles.loginButton}>Iniciar Sesión</Link>
              <Link href="/register" className={styles.registerButton}>Registrarse</Link>
            </div>
            <a href="/banca" className={styles.internetButton}>Banca por Internet</a>
          </div>
        </div>
      </div>
    </header>
  )
}
