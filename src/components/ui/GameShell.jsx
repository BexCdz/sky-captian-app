import BigButton from './BigButton'
import styles from './GameShell.module.css'

export default function GameShell({ title, onHome, onHint, scroll = false, children }) {
  return (
    <main className={styles.shell}>
      <header className={styles.bar}>
        <div className={styles.slot}>
          {onHome && <BigButton size="compact" emoji="🏠" ariaLabel="Home" color="coral" onClick={onHome} />}
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.slot}>
          {onHint && (
            <BigButton size="compact" emoji="🔊" ariaLabel="Hear it again" color="grape" onClick={onHint} />
          )}
        </div>
      </header>
      <section className={`${styles.content} ${scroll ? styles.scroll : ''}`}>{children}</section>
    </main>
  )
}
