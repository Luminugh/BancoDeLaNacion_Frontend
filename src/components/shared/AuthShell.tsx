'use client'

import React from 'react'
import Link from 'next/link'
import styles from './auth.module.css'

type AuthShellProps = {
  title: string
  subtitle: string
  switchText: string
  switchLinkText: string
  switchHref: string
  children: React.ReactNode
}

export default function AuthShell({
  title,
  subtitle,
  switchText,
  switchLinkText,
  switchHref,
  children
}: AuthShellProps) {
  return (
    <div className={styles.authPage}>
      <div className={styles.authFrame}>
        <section className={styles.authVisual}>
          <div className={styles.visualTop}>
            <img src="/image/logoBN.png" alt="Banco de la Nacion" className={styles.visualLogo} />
            <span className={styles.visualBadge}>Banca digital</span>
          </div>

          <h1 className={styles.visualTitle}>Banca por Internet con seguridad bancaria</h1>
          <p className={styles.visualCopy}>
            Accede a transferencias, pagos y servicios en segundos con validacion reforzada.
          </p>

          <div className={styles.visualHighlights}>
            <div className={styles.highlightCard}>
              <span className={styles.highlightTitle}>Seguridad</span>
              <span className={styles.highlightText}>Proteccion en cada ingreso</span>
            </div>
            <div className={styles.highlightCard}>
              <span className={styles.highlightTitle}>Rapidez</span>
              <span className={styles.highlightText}>Operaciones en tiempo real</span>
            </div>
            <div className={styles.highlightCard}>
              <span className={styles.highlightTitle}>Soporte</span>
              <span className={styles.highlightText}>Atencion digital 24/7</span>
            </div>
            <div className={styles.highlightCard}>
              <span className={styles.highlightTitle}>Canales</span>
              <span className={styles.highlightText}>Web y App BN disponibles</span>
            </div>
          </div>

          <div className={styles.visualFoot}>
            <img src="/image/escudo.png" alt="Escudo del Peru" className={styles.visualSeal} />
            <span>Banco de la Nacion | Ministerio de Economia y Finanzas</span>
          </div>
        </section>

        <section className={styles.authCard}>
          <div className={styles.cardHeader}>
            <Link className={styles.backLink} href="/">Volver al inicio</Link>
            <span className={styles.cardBadge}>Banca por Internet</span>
            <h2 className={styles.cardTitle}>{title}</h2>
            <p className={styles.cardText}>{subtitle}</p>
          </div>

          {children}

          <div className={styles.switchRow}>
            <span>{switchText}</span>
            <Link href={switchHref} className={styles.switchLink}>{switchLinkText}</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
