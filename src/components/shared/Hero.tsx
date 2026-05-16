import React from 'react'
import styles from './landing.module.css'

export default function Hero(){
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1>Ahora le toca a mamá</h1>
          <p>Préstamo Multired: impulsa sus sueños con TCEA promocional desde 11.57%</p>
          <div className={styles.heroActions}>
            <a href="/loans" className={styles.heroButton}>Conoce más</a>
            <a href="/register" className={styles.secondaryButton}>Crear cuenta</a>
          </div>
          <div className={styles.heroDots} aria-label="Carrusel de promociones">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <img src="/image/entidades-prestamos-gobiernos.png" alt="Promoción Banco de la Nación" />
        </div>
      </div>
    </section>
  )
}
