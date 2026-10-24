import { useEffect, useRef, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import { shuffle } from '../../utils/shuffle'
import styles from './CountingGame.module.css'

const THINGS = [
  { e: '🍎', name: 'apples' },
  { e: '⭐', name: 'stars' },
  { e: '🐟', name: 'fish' },
  { e: '🎈', name: 'balloons' },
  { e: '🚗', name: 'cars' },
  { e: '🐥', name: 'chicks' },
  { e: '🌸', name: 'flowers' },
]
const SHAPES = [
  { e: '🔴', name: 'circle' },
  { e: '🟦', name: 'square' },
  { e: '🔺', name: 'triangle' },
  { e: '⭐', name: 'star' },
  { e: '❤️', name: 'heart' },
]

// Odd rounds count things, even rounds find a shape. Counting gets harder up to 10.
function makeRound(n) {
  if (n % 2 === 0) {
    const max = Math.min(10, 3 + n)
    const thing = shuffle(THINGS)[0]
    const count = 1 + Math.floor(Math.random() * max)
    const options = new Set([count])
    while (options.size < 3) options.add(1 + Math.floor(Math.random() * Math.max(max, 4)))
    return {
      kind: 'count',
      thing,
      answer: count,
      options: shuffle([...options]),
      prompt: `How many ${thing.name}?`,
    }
  }
  const [target, ...others] = shuffle(SHAPES)
  return {
    kind: 'shape',
    answer: target.name,
    options: shuffle([target, others[0], others[1]]),
    prompt: `Find the ${target.name}!`,
  }
}

export default function CountingGame({ onHome }) {
  const [roundNumber, setRoundNumber] = useState(0)
  const [round, setRound] = useState(() => makeRound(0))
  const [wrong, setWrong] = useState([])
  const [solved, setSolved] = useState(false)
  const [stars, setStars] = useState(0)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const answer = (value) => {
    if (solved) return
    if (value === round.answer) {
      setSolved(true)
      setStars((s) => s + 1)
      timer.current = setTimeout(() => {
        const next = roundNumber + 1
        setRoundNumber(next)
        setRound(makeRound(next))
        setWrong([])
        setSolved(false)
      }, 1600)
    } else {
      setWrong((w) => [...w, value])
    }
  }

  return (
    <GameShell title="🔢" onHome={onHome}>
      <div className={styles.stars} aria-label={`${stars} stars`}>
        <FluentEmoji>⭐</FluentEmoji> {stars}
      </div>
      {round.kind === 'count' ? (
        <div className={styles.things} aria-label={round.prompt}>
          {Array.from({ length: round.answer }, (_, i) => (
            <span key={i}><FluentEmoji>{round.thing.e}</FluentEmoji></span>
          ))}
        </div>
      ) : (
        <div className={styles.question} aria-hidden="true">
          <FluentEmoji>❓</FluentEmoji>
        </div>
      )}
      <div className={styles.options}>
        {round.options.map((option) => {
          const value = round.kind === 'count' ? option : option.name
          const style = `${wrong.includes(value) ? styles.wrong : ''} ${solved && value === round.answer ? styles.right : ''}`
          return round.kind === 'count' ? (
            <BigButton key={option} size="number" label={String(option)} color="sun" className={style} onClick={() => answer(value)} />
          ) : (
            <BigButton key={option.name} size="tile" emoji={option.e} ariaLabel={option.name} color="sky" className={style} onClick={() => answer(value)} />
          )
        })}
      </div>
    </GameShell>
  )
}
