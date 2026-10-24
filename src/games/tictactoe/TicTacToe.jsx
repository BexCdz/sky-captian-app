import { useEffect, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import PilotPet from '../../components/pet/PilotPet'
import { usePet } from '../../pet/usePet'
import { playCheer } from '../../pet/sounds'
import styles from './TicTacToe.module.css'

const ME = '⭐'
const THINK_MS = 1000
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function getWinner(board) {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return { who: board[a], line }
  }
  return null
}

function findLine(board, player) {
  for (const line of LINES) {
    const values = line.map((i) => board[i])
    if (values.filter((v) => v === player).length === 2 && values.includes(null)) {
      return line[values.indexOf(null)]
    }
  }
  return null
}

// Deliberately easy: it only sometimes wins or blocks, so a 5-year-old wins often.
function computerMove(board, cpu) {
  const roll = Math.random()
  if (roll < 0.3) {
    const win = findLine(board, cpu)
    if (win !== null) return win
  }
  if (roll < 0.5) {
    const block = findLine(board, ME)
    if (block !== null) return block
  }
  const free = board.map((v, i) => (v ? null : i)).filter((i) => i !== null)
  return free[Math.floor(Math.random() * free.length)]
}

export default function TicTacToe({ onHome }) {
  const { pet } = usePet()
  const cpu = pet.emoji
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('me')

  const winner = getWinner(board)
  const over = Boolean(winner) || board.every(Boolean)

  useEffect(() => {
    if (turn !== 'cpu' || over) return
    const timer = setTimeout(() => {
      setBoard((b) => {
        const pick = computerMove(b, cpu)
        return b.map((v, i) => (i === pick ? cpu : v))
      })
      setTurn('me')
    }, THINK_MS)
    return () => clearTimeout(timer)
  }, [turn, over, cpu])

  const result = winner ? (winner.who === ME ? 'win' : 'lose') : over ? 'tie' : null
  useEffect(() => {
    if (result) playCheer()
  }, [result])

  const play = (i) => {
    if (turn !== 'me' || over || board[i]) return
    setBoard(board.map((v, idx) => (idx === i ? ME : v)))
    setTurn('cpu')
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setTurn('me')
  }

  const thinking = turn === 'cpu' && !over

  return (
    <GameShell title="❌⭕" onHome={onHome}>
      <div className={styles.layout}>
        <div className={styles.turn} aria-hidden="true">
          <PilotPet pet={pet} size={96} bounce={thinking || result === 'lose'} />
          <span className={styles.bubble}>
            <FluentEmoji>{thinking ? '💭' : result ? '🎉' : `👉${ME}`}</FluentEmoji>
          </span>
        </div>
        <div className={styles.board}>
          {board.map((value, i) => (
            <button
              key={i}
              type="button"
              aria-label={value ?? 'Empty square'}
              className={`${styles.cell} ${winner?.line.includes(i) ? styles.line : ''}`}
              disabled={Boolean(value) || over}
              onClick={() => play(i)}
            >
              {value && <FluentEmoji>{value}</FluentEmoji>}
            </button>
          ))}
        </div>
      </div>
      {over && (
        <WinBanner emoji={result === 'win' ? '🎉' : result === 'lose' ? '🤗' : '🤝'}>
          <BigButton emoji="🔁" ariaLabel="Play again" color="grass" onClick={reset} />
        </WinBanner>
      )}
    </GameShell>
  )
}
