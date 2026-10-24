import { useEffect, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import PilotPet from '../../components/pet/PilotPet'
import { usePet } from '../../pet/usePet'
import styles from './BreatheGame.module.css'

const ROUNDS = 4

// Slow in, a calm hold, slow out, then a swallow to help the ears pop.
const PHASES = [
  { id: 'in', emoji: '🌬️', word: 'Breathe in', ms: 4000, scale: 1, grow: 4000 },
  { id: 'hold', emoji: '🫧', word: 'Hold', ms: 2000, scale: 1, grow: 0 },
  { id: 'out', emoji: '💨', word: 'Breathe out', ms: 5000, scale: 0.6, grow: 5000 },
  { id: 'swallow', emoji: '🍬', word: 'Swallow', ms: 3000, scale: 0.8, grow: 600 },
]

export default function BreatheGame({ onHome }) {
  const [status, setStatus] = useState('idle')
  const [round, setRound] = useState(0)
  const [step, setStep] = useState(0)
  const { pet } = usePet()

  const phase = status === 'running' ? PHASES[step] : null

  useEffect(() => {
    if (status === 'intro') {
      const t = setTimeout(() => {
        setRound(0)
        setStep(0)
        setStatus('running')
      }, 2400)
      return () => clearTimeout(t)
    }
    if (status !== 'running') return
    const t = setTimeout(() => {
      if (step < PHASES.length - 1) setStep(step + 1)
      else if (round < ROUNDS - 1) {
        setRound(round + 1)
        setStep(0)
      } else setStatus('done')
    }, PHASES[step].ms)
    return () => clearTimeout(t)
  }, [status, round, step])

  const start = () => setStatus('intro')

  const scale = phase ? phase.scale : 0.6
  const duration = phase ? phase.grow : 600

  return (
    <GameShell title="🫧" onHome={onHome}>
      <div className={styles.layout}>
        <div className={styles.dots} aria-hidden="true">
          {Array.from({ length: ROUNDS }, (_, i) => (
            <span key={i} className={`${styles.dot} ${i < round || status === 'done' ? styles.dotOn : ''}`}>
              <FluentEmoji>⭐</FluentEmoji>
            </span>
          ))}
        </div>
        <div className={styles.stage}>
          <div
            className={`${styles.orb} ${phase?.id === 'swallow' ? styles.gulp : ''}`}
            style={{ transform: `scale(${scale})`, transitionDuration: `${duration}ms` }}
          >
            <PilotPet pet={pet} size="clamp(80px, 22vmin, 170px)" bounce={phase?.id === 'swallow'} />
          </div>
        </div>
        <div className={styles.word} aria-live="polite">
          {phase ? (
            <>
              <FluentEmoji>{phase.emoji}</FluentEmoji> {phase.word}
            </>
          ) : status === 'intro' ? (
            <FluentEmoji>🫧</FluentEmoji>
          ) : (
            <BigButton emoji="▶️" ariaLabel="Start breathing" color="grass" onClick={start} />
          )}
        </div>
      </div>
      {status === 'done' && (
        <WinBanner emoji="😊">
          <BigButton emoji="🔁" ariaLabel="Breathe again" color="sky" onClick={() => setStatus('idle')} />
        </WinBanner>
      )}
    </GameShell>
  )
}
