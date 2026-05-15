import styles from './Products.module.css'

export default function Products(){
  const items = [
    {img:'/image/prestamos-multired.png', title:'Préstamo BN'},
    {img:'/image/credito-hipotecario.png', title:'Crédito Hipotecario'},
    {img:'/image/tarjeta-credito.png', title:'Tarjeta de crédito'},
    {img:'/image/seguro-tarjeta-debito.png', title:'Seguro para tarjetas'},
    {img:'/image/seguro-cuota-protegida.png', title:'Seguro cuota protegida'},
    {img:'/image/seguro-oncologico.png', title:'Seguro Oncológico'},
  ]

  return (
    <section className={styles.products}>
      <div className="container">
        <h3 className="text-center mb-4">Productos pensados en ti</h3>
        <div className={styles.grid}>
          {items.map(i=> (
            <div key={i.title} className={styles.card}>
              <img src={i.img} className={styles.icon} alt=""/>
              <div className={styles.title}>{i.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
