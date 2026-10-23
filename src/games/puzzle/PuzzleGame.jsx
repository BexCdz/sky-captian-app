import { useEffect, useRef, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import useSpeech from '../../hooks/useSpeech'
import { shuffle } from '../../utils/shuffle'
import styles from './PuzzleGame.module.css'

const PICTURES = ['🦁', '🐘', '🚀', '🏠', '🐙', '🦄', '🚂', '🐢']
const LEVELS = [
  { cols: 2, rows: 2 },
  { cols: 3, rows: 2 },
  { cols: 3, rows: 3 },
]
const INTRO = 'Drag each piece to its place to finish the picture!'

function setup(level) {
  const { cols, rows } = LEVELS[level]
  return {
    emoji: shuffle(PICTURES)[0],
    order: shuffle(Array.from({ length: cols * rows }, (_, i) => i)),
  }
}

function PieceArt({ emoji, cols, rows, index }) {
  return (
    <span
      className={styles.art}
      style={{ '--cols': cols, '--rows': rows, '--col': index % cols, '--row': Math.floor(index / cols) }}
    >
      {emoji}
    </span>
  )
}

function DraggablePiece({ index, emoji, cols, rows, onDrop }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const origin = useRef(null)

  const onDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    origin.current = { x: e.clientX, y: e.clientY }
    setDragging(true)
  }
  const onMove = (e) => {
    if (origin.current) setOffset({ x: e.clientX - origin.current.x, y: e.clientY - origin.current.y })
  }
  const onUp = (e) => {
    if (!origin.current) return
    origin.current = null
    setDragging(false)
    const rect = e.currentTarget.getBoundingClientRect()
    const placed = onDrop(index, rect.left + rect.width / 2, rect.top + rect.height / 2)
    if (!placed) setOffset({ x: 0, y: 0 })
  }

  return (
    <div
      className={`${styles.piece} ${dragging ? styles.dragging : styles.free}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <PieceArt emoji={emoji} cols={cols} rows={rows} index={index} />
    </div>
  )
}

export default function PuzzleGame({ onHome }) {
  const [level, setLevel] = useState(0)
  const [puzzle, setPuzzle] = useState(() => setup(0))
  const [placed, setPlaced] = useState([])
  const slots = useRef([])
  const { speak } = useSpeech()

  const { cols, rows } = LEVELS[level]
  const done = placed.length === cols * rows

  useEffect(() => {
    speak(INTRO)
  }, [speak])
  useEffect(() => {
    if (done) speak('You did it! Great job!')
  }, [done, speak])

  const drop = (index, cx, cy) => {
    const rect = slots.current[index]?.getBoundingClientRect()
    if (!rect) return false
    const distance = Math.hypot(cx - (rect.left + rect.width / 2), cy - (rect.top + rect.height / 2))
    if (distance > rect.width * 0.6) return false
    setPlaced((p) => [...p, index])
    return true
  }

  const start = (nextLevel) => {
    setLevel(nextLevel)
    setPuzzle(setup(nextLevel))
    setPlaced([])
  }

  return (
    <GameShell title="🧩" onHome={onHome} onHint={() => speak(INTRO)}>
      <div className={styles.area} style={{ '--cols': cols, '--rows': rows }}>
        <div className={styles.board}>
          {Array.from({ length: cols * rows }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                slots.current[i] = el
              }}
              className={styles.slot}
            >
              {placed.includes(i) && (
                <div className={`${styles.piece} ${styles.placed}`}>
                  <PieceArt emoji={puzzle.emoji} cols={cols} rows={rows} index={i} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.tray}>
          {puzzle.order
            .filter((i) => !placed.includes(i))
            .map((i) => (
              <DraggablePiece key={i} index={i} emoji={puzzle.emoji} cols={cols} rows={rows} onDrop={drop} />
            ))}
        </div>
      </div>
      {done && (
        <WinBanner emoji={puzzle.emoji}>
          <BigButton emoji="🔁" ariaLabel="Play again" color="sun" onClick={() => start(level)} />
          <BigButton emoji="➡️" ariaLabel="Next" color="grass" onClick={() => start(Math.min(level + 1, LEVELS.length - 1))} />
        </WinBanner>
      )}
    </GameShell>
  )
}
