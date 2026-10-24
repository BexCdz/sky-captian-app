import BigButton from './BigButton'
import FluentEmoji from './FluentEmoji'
import { Wing } from './Wings'
import styles from './GameShell.module.css'

export default function GameShell({ title, emblem = false, onHome, scroll = false, children }) {
  return (
    <main className={styles.shell}>
      <header className={styles.bar}>
        <div className={styles.slot}>
          {onHome && <BigButton size="compact" emoji="🏠" ariaLabel="Home" color="coral" onClick={onHome} />}
        </div>
        <h1 className={emblem ? styles.metal : styles.badge}>
          {emblem && <Wing className={styles.wing} />}
          <span className={emblem ? styles.plate : styles.title}>
            <span className={styles.title}>
              <FluentEmoji>{title}</FluentEmoji>
            </span>
          </span>
          {emblem && <Wing className={styles.wing} flip />}
        </h1>
        <div className={styles.slot} />
      </header>
      <section className={`${styles.content} ${scroll ? styles.scroll : ''}`}>{children}</section>
    </main>
  )
}
