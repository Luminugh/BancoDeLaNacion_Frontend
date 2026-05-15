import styles from './News.module.css'

export default function News(){
  const news = [
    {img:'/image/04052026-miembros-mesa-pueden-cobrar-bn.jpg', title:'Pago a miembros', desc:'Banco de la Nación actualiza sus procesos.'},
    {img:'/image/13052026-pago-fonavista-reintegro-quinto-grupo.jpg', title:'Comunicado institucional', desc:'Nuevos horarios y atención.'},
    {img:'/image/13052026-feraido-compensable-puquio.jpg', title:'Campaña 2026', desc:'Promociones para clientes.'},
  ]

  return (
    <section className={styles.news}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Noticias</h4>
          <a href="#">Ver más &gt;</a>
        </div>
        <div className={styles.row}>
          {news.map(n=> (
            <div key={n.title} className={styles.card}>
              <img src={n.img} className={styles.img} alt=""/>
              <h6>{n.title}</h6>
              <p className="small text-muted">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
