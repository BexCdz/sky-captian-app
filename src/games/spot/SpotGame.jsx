import { useEffect, useRef, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import { shuffle } from '../../utils/shuffle'
import styles from './SpotGame.module.css'

const POOL = [
  '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐸', '🐵', '🦁', '🐯', '🐮',
  '🍎', '🍌', '🍓', '🍇', '🍉', '🍕', '🍩', '🍪', '🌸', '⭐', '🚗', '🎈',
]
const CELLS = 12
const DIFFS = 3

function makeRound() {
  const left = shuffle(POOL).slice(0, CELLS)
  const diffs = shuffle(left.map((_, i) => i)).slice(0, DIFFS)
  const right = [...left]
  for (const i of diffs) {
    right[i] = shuffle(POOL.filter((e) => e !== left[i]))[0]
  }
  return { left, right, diffs }
}

export default function SpotGame({ onHome }) {
  const [round, setRound] = useState(makeRound)
  const [found, setFound] = useState([])
  const [wrong, setWrong] = useState(null)
  const timer = useRef(null)

  const done = found.length === DIFFS

  useEffect(() => () => clearTimeout(timer.current), [])

  const tap = (i) => {
    if (found.includes(i)) return
    if (round.diffs.includes(i)) {
      setFound((f) => [...f, i])
      return
    }
    setWrong(i)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setWrong(null), 350)
  }

  const next = () => {
    setRound(makeRound())
    setFound([])
  }

  const renderPanel = (cells, extra = '') => (
    <div className={styles.panel}>
      {cells.map((emoji, i) => (
        <button
          key={i}
          type="button"
          aria-label={emoji}
          className={`${styles.cell} ${extra} ${found.includes(i) ? styles.found : ''} ${wrong === i ? styles.shake : ''}`}
          onClick={() => tap(i)}
        >
          <FluentEmoji>{emoji}</FluentEmoji>
        </button>
      ))}
    </div>
  )

  return (
    <GameShell title="🔍" onHome={onHome}>
      <div className={styles.dots} aria-hidden="true">
        <FluentEmoji>{Array.from({ length: DIFFS }, (_, i) => (i < found.length ? '⭐' : '⚪')).join(' ')}</FluentEmoji>
      </div>
      <div className={styles.panels}>
        {renderPanel(round.left)}
        {renderPanel(round.right, styles.right)}
      </div>
      {done && (
        <WinBanner emoji="🔍">
          <BigButton emoji="➡️" ariaLabel="Next" color="grass" onClick={next} />
        </WinBanner>
      )}
    </GameShell>
  )
}
