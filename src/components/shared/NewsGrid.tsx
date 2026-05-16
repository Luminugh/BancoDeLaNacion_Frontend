import React from 'react'
import styles from './landing.module.css'

const news = [
  {title:'Pago a miembros de mesa', img:'/image/04052026-miembros-mesa-pueden-cobrar-bn.jpg'},
  {title:'Reintegro FONAVISTA', img:'/image/13052026-pago-fonavista-reintegro-quinto-grupo.jpg'},
  {title:'Avisos y campañas 2026', img:'/image/13052026-feraido-compensable-puquio.jpg'},
]

export default function NewsGrid(){
  return (
    <section className={styles.section} id="canales">
      <div className="flex items-center justify-between mb-4">
          <h3 className={styles.sectionTitle} style={{marginBottom: 0, textAlign: 'left'}}>Conoce nuestras campañas</h3>
          <a href="#noticias" className={styles.secondaryButton} style={{background:'#fff', color:'#c71d17', border:'1px solid #c71d17', padding:'10px 16px'}}>Ver más</a>
        </div>
      <div className={styles.newsGrid}>
          {news.map(n=> (
            <article key={n.title} className={styles.newsCard}>
              <img src={n.img} alt={n.title} />
              <div className={styles.newsBody}><h4>{n.title}</h4></div>
            </article>
          ))}
      </div>
    </section>
  )
}
