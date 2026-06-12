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
      <div className={styles.pageBrand}>
        <img src="/image/logoBN.png" alt="Banco de la Nacion" className={styles.pageBrandLogo} />
      </div>
      <div className={styles.authFrame}>
        <section className={styles.authCard}>
          <div className={styles.cardHeader}>
            <Link className={styles.backLink} href="/">Volver al inicio</Link>
            <span className={styles.cardBadge}>Banca por Internet</span>
            <h2 className={styles.cardTitle}>{title}</h2>
            {subtitle ? <p className={styles.cardText}>{subtitle}</p> : null}
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
