import styles from './Header.module.css'
import Link from 'next/link'

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.topStripe} />

      <div className={styles.brandBar}>
        <div className={styles.brandWrap}>
          <div style={{display:'flex',alignItems:'center',gap:18}}>
            <div className={styles.multiredMark}>
              <span className={styles.multiredMain}>mult<i>Red</i></span>
              <span className={styles.multiredSub}>Virtual</span>
            </div>
            <div className={styles.bankMark}>
              <img src="/image/logoBN.png" alt="Banco de la Nación" className={styles.logo}/>
            </div>
          </div>

          <nav className={styles.headerNav}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/creditos">Créditos</Link>
            <Link href="/ahorros">Ahorros</Link>
            <Link href="/transferencias">Transferencias</Link>
            <Link href="/perfil">Perfil</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
