import { useRef, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import { usePet } from '../../pet/usePet'
import styles from './HuntGame.module.css'

const THINGS = [
  { id: 'clouds', e: '☁️', name: 'Clouds', color: 'sky' },
  { id: 'window', e: '🪟', name: 'Window', color: 'grape' },
  { id: 'tray', e: '🍽️', name: 'Tray table', color: 'sun' },
  { id: 'light', e: '💡', name: 'Wing light', color: 'coral' },
  { id: 'cart', e: '🧳', name: 'Luggage cart', color: 'grass' },
  { id: 'seat', e: '💺', name: 'Seat', color: 'pink' },
  { id: 'phones', e: '🎧', name: 'Headphones', color: 'sky' },
  { id: 'drinks', e: '🥤', name: 'Drinks cart', color: 'sun' },
  { id: 'wing', e: '✈️', name: 'Airplane wing', color: 'grape' },
]

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function shuffled() {
  const list = [...THINGS]
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

export default function HuntGame({ onHome }) {
  const [board, setBoard] = useState(shuffled)
  const [found, setFound] = useState([])
  const bingos = useRef(new Set())
  const { addStars } = usePet()

  const done = found.length === THINGS.length

  const tap = (item) => {
    if (found.includes(item.id)) return
    const next = [...found, item.id]
    setFound(next)
    addStars(1)

    const fresh = LINES.filter(
      (line, n) => !bingos.current.has(n) && line.every((i) => next.includes(board[i].id)),
    )
    fresh.forEach((line) => bingos.current.add(LINES.indexOf(line)))

    if (next.length < THINGS.length && fresh.length) addStars(1)
  }

  const again = () => {
    bingos.current = new Set()
    setFound([])
    setBoard(shuffled())
  }

  return (
    <GameShell title="🪟" onHome={onHome}>
      <div className={styles.grid}>
        {board.map((item) => {
          const got = found.includes(item.id)
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.name}
              aria-pressed={got}
              className={`${styles.cell} ${styles[item.color]} ${got ? styles.got : ''}`}
              onClick={() => tap(item)}
            >
              <span className={styles.emoji}>
                <FluentEmoji>{item.e}</FluentEmoji>
              </span>
              <span className={styles.name}>{item.name}</span>
              {got && (
                <span className={styles.stamp} aria-hidden="true">
                  <FluentEmoji>✅</FluentEmoji>
                  <span className={styles.pop}>
                    <FluentEmoji>⭐</FluentEmoji>
                  </span>
                </span>
              )}
            </button>
          )
        })}
      </div>
      {done && (
        <WinBanner emoji="🎉">
          <BigButton emoji="🔁" ariaLabel="Hunt again" color="grass" onClick={again} />
        </WinBanner>
      )}
    </GameShell>
  )
}
