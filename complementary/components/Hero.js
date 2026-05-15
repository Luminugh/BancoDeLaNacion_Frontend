import styles from './Hero.module.css'

export default function Hero(){
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Préstamos para gobierno nacional, regional y locales</h1>
        <p>Para la ejecución de sus proyectos de inversión pública (PIP).</p>
        <button className={styles.cta}>Ingresa Aquí</button>
      </div>
      <img src="/image/entidades-prestamos-gobiernos.png" alt="hero" className={styles.heroImage}/>
    </section>
  )
}
