import React from 'react'
import styles from './landing.module.css'

const features = [
  {title:'Conoce BN Beneficios', img:'/image/AppBN-60.png', desc:'Acompañamos tus gestiones...'},
  {title:'Inclusión Financiera', img:'/image/inclusion-financiera-bn.png', desc:'Servicios y herramientas...'},
  {title:'Seguridad y fraude', img:'/image/altoalfraude.png', desc:'Medidas y recomendaciones...'},
]

export default function FeatureGrid(){
  return (
    <section className={styles.section} id="beneficios">
      <div className={styles.dualSection}>
          {features.map(f=> (
            <div key={f.title} className={styles.promoBlock}>
              <img src={f.img} alt={f.title} className={styles.promoImage} />
              <div className={styles.promoBody}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
