import React from 'react'
import styles from './landing.module.css'

const products = [
  {title:'Préstamo BN', img:'/image/prestamos-multired.png'},
  {title:'Crédito Hipotecario', img:'/image/credito-hipotecario.png'},
  {title:'Tarjeta de crédito', img:'/image/tarjeta-credito.png'},
  {title:'Seguro para tarjetas', img:'/image/seguro-tarjeta-debito.png'},
  {title:'Seguro cuota protegida', img:'/image/seguro-cuota-protegida.png'},
  {title:'Seguro Oncológico', img:'/image/seguro-oncologico.png'},
]

export default function ProductsGrid(){
  return (
    <section className={styles.section} id="productos">
      <h3 className={styles.sectionTitle}>Productos pensados en ti</h3>
      <div className={styles.productGrid}>
          {products.map(p=> (
            <div key={p.title} className={styles.productCard}>
              <div className={styles.productCardInner}>
                <img src={p.img} alt={p.title} />
                <span>{p.title}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
