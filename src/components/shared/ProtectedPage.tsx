'use client'

import React from 'react'
import Link from 'next/link'
import styles from './protected.module.css'

type Metric = {
  label: string
  value: string
  hint?: string
}

type ProtectedPageProps = {
  title: string
  subtitle: string
  eyebrow?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  metrics?: Metric[]
  children: React.ReactNode
}

export default function ProtectedPage({
  title,
  subtitle,
  eyebrow = 'Zona privada',
  primaryAction,
  secondaryAction,
  metrics = [],
  children,
}: ProtectedPageProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div>
              <span className={styles.kicker}>{eyebrow}</span>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            {(primaryAction || secondaryAction) && (
              <div className={styles.heroActions}>
                {primaryAction ? (
                  <Link className={styles.primaryAction} href={primaryAction.href}>
                    {primaryAction.label}
                  </Link>
                ) : null}
                {secondaryAction ? (
                  <Link className={styles.secondaryAction} href={secondaryAction.href}>
                    {secondaryAction.label}
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </section>

        {metrics.length > 0 ? (
          <section className={styles.metrics}>
            {metrics.map((metric) => (
              <article key={metric.label} className={styles.metricCard}>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricValue}>{metric.value}</div>
                {metric.hint ? <div className={styles.metricHint}>{metric.hint}</div> : null}
              </article>
            ))}
          </section>
        ) : null}

        {children}
      </div>
    </div>
  )
}
