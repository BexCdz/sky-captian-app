import { useEffect, useRef, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import { shuffle } from '../../utils/shuffle'
import styles from './MemoryGame.module.css'

const ANIMALS = ['🐶', '🐱', '🐵', '🦁', '🐸', '🐙', '🦄', '🐢', '🐼', '🐰', '🦋', '🐠']
const LEVELS = [3, 4, 6]

function deal(pairs) {
  const picks = shuffle(ANIMALS).slice(0, pairs)
  return shuffle([...picks, ...picks].map((emoji, id) => ({ id, emoji })))
}

export default function MemoryGame({ onHome }) {
  const [level, setLevel] = useState(0)
  const [cards, setCards] = useState(() => deal(LEVELS[0]))
  const [open, setOpen] = useState([])
  const [matched, setMatched] = useState([])
  const timer = useRef(null)

  const won = matched.length === cards.length

  useEffect(() => () => clearTimeout(timer.current), [])

  const flip = (id) => {
    if (open.length === 2 || open.includes(id) || matched.includes(id)) return
    const next = [...open, id]
    setOpen(next)
    if (next.length < 2) return
    const [a, b] = next.map((i) => cards.find((c) => c.id === i))
    if (a.emoji === b.emoji) {
      timer.current = setTimeout(() => {
        setMatched((m) => [...m, a.id, b.id])
        setOpen([])
      }, 500)
    } else {
      timer.current = setTimeout(() => setOpen([]), 1000)
    }
  }

  const start = (nextLevel) => {
    clearTimeout(timer.current)
    setLevel(nextLevel)
    setCards(deal(LEVELS[nextLevel]))
    setOpen([])
    setMatched([])
  }

  return (
    <GameShell title="🧠" onHome={onHome}>
      <div className={`${styles.grid} ${LEVELS[level] === 3 ? styles.three : styles.four}`}>
        {cards.map((card) => {
          const isMatched = matched.includes(card.id)
          const faceUp = isMatched || open.includes(card.id)
          return (
            <button
              key={card.id}
              type="button"
              aria-label={faceUp ? card.emoji : 'Hidden card'}
              className={`${styles.card} ${faceUp ? styles.up : ''} ${isMatched ? styles.matched : ''}`}
              onClick={() => flip(card.id)}
            >
              <span className={styles.inner}>
                <span className={`${styles.face} ${styles.back}`}><FluentEmoji>❓</FluentEmoji></span>
                <span className={`${styles.face} ${styles.front}`}><FluentEmoji>{card.emoji}</FluentEmoji></span>
              </span>
            </button>
          )
        })}
      </div>
      {won && (
        <WinBanner emoji="🧠">
          <BigButton emoji="🔁" ariaLabel="Play again" color="sun" onClick={() => start(level)} />
          <BigButton emoji="➡️" ariaLabel="Next" color="grass" onClick={() => start(Math.min(level + 1, LEVELS.length - 1))} />
        </WinBanner>
      )}
    </GameShell>
  )
}
