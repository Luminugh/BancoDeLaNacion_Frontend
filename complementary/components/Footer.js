import styles from './Footer.module.css'

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.columns}>
          <div>
            <h5>Nosotros</h5>
            <ul>
              <li>¿Quiénes somos?</li>
              <li>60 Años BN</li>
            </ul>
          </div>
          <div>
            <h5>Información de interés</h5>
            <ul>
              <li>Cronograma de pagos</li>
              <li>Tasas y Comisiones</li>
            </ul>
          </div>
          <div>
            <h5>Servicio al Cliente</h5>
            <div className={styles.card}>Consultas, uso en el extranjero y bloqueo de tarjetas las 24 horas.</div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>© BN | Todos los derechos reservados</div>
    </footer>
  )
}
