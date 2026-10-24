import { useEffect, useRef, useState } from 'react'
import FluentEmoji from '../ui/FluentEmoji'
import useFlight, { MAX_MINUTES, MIN_MINUTES } from '../../flight/useFlight'
import styles from './FlightTracker.module.css'

const HOLD_MS = 900
const PRESETS = [60, 120, 180, 240, 360, 480]

function formatMinutes(total) {
  const h = Math.floor(total / 60)
  const m = total % 60
  if (h === 0) return `${m} min`
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}

function Settings({ minutes, running, onStart, onReset, onClose }) {
  const [draft, setDraft] = useState(minutes)
  const bump = (delta) => setDraft((d) => Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, d + delta)))
  return (
    <div className={styles.overlay} role="dialog" aria-label="Parent settings">
      <div className={styles.card}>
        <h2 className={styles.heading}>Parents: flight time</h2>
        <div className={styles.stepper}>
          <button type="button" className={styles.round} aria-label="Less time" onClick={() => bump(-15)}>
            −
          </button>
          <span className={styles.time}>{formatMinutes(draft)}</span>
          <button type="button" className={styles.round} aria-label="More time" onClick={() => bump(15)}>
            +
          </button>
        </div>
        <div className={styles.presets}>
          {PRESETS.map((p) => (
            <button key={p} type="button" className={`${styles.chip} ${draft === p ? styles.chipOn : ''}`} onClick={() => setDraft(p)}>
              {p / 60} h
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" className={`${styles.action} ${styles.go}`} onClick={() => onStart(draft)}>
            <FluentEmoji>🛫</FluentEmoji> {running ? 'Restart' : 'Start flight'}
          </button>
          {running && (
            <button type="button" className={`${styles.action} ${styles.stop}`} onClick={onReset}>
              Reset
            </button>
          )}
          <button type="button" className={`${styles.action} ${styles.close}`} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FlightTracker() {
  const flight = useFlight()
  const [open, setOpen] = useState(false)
  const [holding, setHolding] = useState(false)
  const holdTimer = useRef(null)

  useEffect(() => () => clearTimeout(holdTimer.current), [])

  // A long press keeps little fingers out of the parent settings.
  const press = () => {
    setHolding(true)
    holdTimer.current = setTimeout(() => {
      setHolding(false)
      setOpen(true)
    }, HOLD_MS)
  }
  const release = () => {
    clearTimeout(holdTimer.current)
    setHolding(false)
  }

  const pct = Math.round(flight.progress * 100)
  const left = Math.ceil(flight.remainingMs / 60000)

  return (
    <>
      <div
        className={`${styles.strip} ${holding ? styles.holding : ''}`}
        role="progressbar"
        aria-label="Flight progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        onPointerDown={press}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onContextMenu={(e) => e.preventDefault()}
      >
        <span className={styles.end}>
          <FluentEmoji>🛫</FluentEmoji>
        </span>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
          <span className={styles.plane} style={{ left: `${pct}%` }}>
            <FluentEmoji>✈️</FluentEmoji>
          </span>
          {!flight.running && (
            <span className={styles.hint}>
              <FluentEmoji>⏱️</FluentEmoji> Parents: hold to set flight time
            </span>
          )}
        </div>
        <span className={styles.end}>
          <FluentEmoji>🛬</FluentEmoji>
        </span>
        {flight.running && <span className={styles.left}>{flight.landed ? '🎉' : formatMinutes(left)}</span>}
      </div>
      {open && (
        <Settings
          minutes={flight.minutes}
          running={flight.running}
          onStart={(m) => {
            flight.start(m)
            setOpen(false)
          }}
          onReset={() => {
            flight.reset()
            setOpen(false)
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
