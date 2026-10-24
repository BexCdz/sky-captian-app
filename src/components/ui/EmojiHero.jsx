import FluentEmoji from './FluentEmoji'
import styles from './EmojiHero.module.css'

export default function EmojiHero({ emoji, still = false }) {
  return (
    <div className={`${styles.hero} ${still ? styles.still : ''}`} aria-hidden="true">
      <FluentEmoji>{emoji}</FluentEmoji>
    </div>
  )
}
