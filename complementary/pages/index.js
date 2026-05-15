import styles from './index.module.css'
import {useState, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <section className={styles.notice}>
          <span className={styles.lock}>🔒</span>
          <p>
            Usted se encuentra en una <span>zona segura</span>
          </p>
        </section>

        <section className={styles.card} aria-label="Acceso a banca por internet">
          <form className={styles.form} onSubmit={e=>e.preventDefault()}>
            <div className={styles.fieldRow}>
              <label htmlFor="producto">Seleccione:</label>
              <select id="producto" defaultValue="multired">
                <option value="multired">Multired Global Débito</option>
                <option value="corriente">Cuenta Corriente</option>
                <option value="ahorro">Cuenta de Ahorro</option>
              </select>
            </div>

            <div className={styles.fieldRow}>
              <label htmlFor="tarjeta">Número de tarjeta:</label>
              <input id="tarjeta" type="text" defaultValue="4214" onChange={()=>{}} />
            </div>

            <div className={styles.fieldRow}>
              <label htmlFor="documentoTipo">Tipo y N° Documento:</label>
              <div className={styles.documentGroup}>
                <select id="documentoTipo" defaultValue="seleccione">
                  <option value="seleccione">Seleccione...</option>
                  <option value="dni">DNI</option>
                  <option value="ce">Carné de extranjería</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
                <input type="text" aria-label="Número de documento" />
              </div>
            </div>

            <div className={styles.keySection}>
              <div className={styles.keyTitle}>Ingresa tu clave usando el teclado virtual:</div>
              <div className={styles.keypad} aria-hidden="true">
                <button type="button">7</button>
                <button type="button">8</button>
                <button type="button">3</button>
                <button type="button">4</button>
                <button type="button">9</button>
                <button type="button">0</button>
                <button type="button">6</button>
                <button type="button">2</button>
                <button type="button">5</button>
                <button type="button">1</button>
                <button type="button" className={styles.clear}>LIMPIAR</button>
              </div>

              <div className={styles.keyActions}>
                <a href="#">Genera tu Clave de Internet</a>
                <label htmlFor="claveInternet">Ingresa tu Clave de Internet (06 dígitos)</label>
                <input id="claveInternet" type="password" inputMode="numeric" />
                <a href="#" className={styles.recover}>Olvidé mi clave</a>
              </div>
            </div>

            <div className={styles.captchaRow}>
              <div className={styles.captchaLabel}>Ingresa el texto de la imagen:</div>
              <div className={styles.captchaBox} aria-hidden="true">9KRCW</div>
              <a href="#" className={styles.refresh}>Cambiar texto</a>
              <input type="text" aria-label="Texto de la imagen" />
            </div>

            <LoginButton />
          </form>

          <div className={styles.footerLinks}>
            <a href="#">Recomendaciones de Seguridad</a>
            <div className={styles.guideLinks}>
              <a href="#">Guía Cuenta de Ahorro</a>
              <a href="#">Guía Cuentas Corrientes</a>
            </div>
          </div>
        </section>

        <section className={styles.bankInfo}>
          <strong>Banco de la Nación | Ministerio de Economía y Finanzas</strong>
          <p>Oficina Principal: Av. Javier Prado Este 2499, San Borja. Central Telefónica: 519 2000.</p>
          <p>Atención en Oficinas Administrativas: Lunes a Viernes de 08:30 a 17:30. Refrigero de 13:00 - 14:00.</p>
        </section>
      </main>
    </div>
  )
}

function LoginButton(){
  const {login} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handle(){
    setLoading(true)
    setError(null)
    try{
      const ok = await login({username:'demo.user', password:'secret'})
      if(!ok) setError('Credenciales inválidas')
    }catch(e){
      setError('Error de conexión')
    }finally{ setLoading(false) }
  }

  return (
    <>
      <button className={styles.submit} type="button" onClick={handle} disabled={loading}>{loading? '...' : 'INGRESAR'}</button>
      {error && <div style={{color:'#c21818',marginTop:8,fontSize:12}}>{error}</div>}
    </>
  )
}
