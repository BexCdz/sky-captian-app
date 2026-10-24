import { useEffect, useRef } from 'react'
import { usePet } from '../../pet/usePet'
import EmojiHero from './EmojiHero'
import FluentEmoji from './FluentEmoji'
import styles from './WinBanner.module.css'

const BITS = ['🎉', '⭐', '✨', '🎈', '🌟', '🎊']

export default function WinBanner({ emoji = '🎉', children }) {
  const { addStars } = usePet()

  // Each finished round earns one Flight Star to spend on the Co-Pilot.
  const awarded = useRef(false)
  useEffect(() => {
    if (awarded.current) return
    awarded.current = true
    addStars(1)
  }, [addStars])

  return (
    <div className={styles.overlay} role="dialog" aria-label="Well done">
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className={styles.bit}
          style={{
            left: `${(i * 7 + 3) % 96}%`,
            animationDelay: `${(i % 7) * 0.25}s`,
            animationDuration: `${2.6 + (i % 4) * 0.5}s`,
          }}
          aria-hidden="true"
        >
          <FluentEmoji>{BITS[i % BITS.length]}</FluentEmoji>
        </span>
      ))}
      <div className={styles.card}>
        <EmojiHero emoji={emoji} />
        <div className={styles.actions}>{children}</div>
      </div>
    </div>
  )
}
