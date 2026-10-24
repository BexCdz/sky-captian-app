import { useEffect, useRef, useState } from 'react'
import FluentEmoji from '../ui/FluentEmoji'
import { Wings } from '../ui/Wings'
import PilotPet from './PilotPet'
import { DRINKS, FOODS } from '../../pet/pets'
import { usePet } from '../../pet/usePet'
import { playCheer, playMunch, playSip } from '../../pet/sounds'
import styles from './CoPilotPet.module.css'

const NAP_MS = 4000
const PLAY_MS = 1600

function Stat({ emoji, value, label }) {
  return (
    <div className={styles.stat} role="img" aria-label={`${label} ${Math.round(value)} percent`}>
      <span className={styles.statIcon}>
        <FluentEmoji>{emoji}</FluentEmoji>
      </span>
      <span className={styles.track}>
        <span className={`${styles.fill} ${value < 30 ? styles.low : ''}`} style={{ width: `${value}%` }} />
      </span>
    </div>
  )
}

export default function CoPilotPet({ onChangePet }) {
  const { pet, stars, hunger, hydration, happiness, feed, cheer } = usePet()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [tab, setTab] = useState('food')
  const [eating, setEating] = useState(null)
  const [mood, setMood] = useState(null)
  const timers = useRef([])

  useEffect(() => {
    const list = timers.current
    return () => list.forEach(clearTimeout)
  }, [])

  if (!pet) return null

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  const busy = mood !== null
  const items = tab === 'food' ? FOODS : DRINKS

  const give = (item) => {
    const kind = tab === 'food' ? 'hunger' : 'hydration'
    if ((kind === 'hunger' ? hunger : hydration) >= 100) return
    if (!feed(kind)) return
    if (kind === 'hunger') playMunch()
    else playSip()
    setEating(item.emoji)
    later(() => setEating(null), 1400)
  }

  const play = () => {
    setMenu(false)
    setMood('play')
    playCheer()
    cheer(15)
    later(() => setMood(null), PLAY_MS)
  }

  const sleep = () => {
    setMenu(false)
    setMood('sleep')
    later(() => {
      cheer(20)
      setMood(null)
    }, NAP_MS)
  }

  return (
    <aside className={styles.widget}>
      {open && (
        <div className={styles.panel}>
          <div className={styles.top}>
            <span className={styles.stars} aria-label={`${stars} flight stars`}>
              <FluentEmoji>⭐</FluentEmoji> {stars}
            </span>
            <button type="button" className={styles.swap} aria-label="Choose a different pet" onClick={onChangePet}>
              <FluentEmoji>🔁</FluentEmoji>
            </button>
          </div>
          <div className={styles.stats}>
            <Stat emoji="😊" value={happiness} label="Happiness" />
            <Stat emoji="🍎" value={hunger} label="Hunger" />
            <Stat emoji="💧" value={hydration} label="Thirst" />
          </div>
          {!menu && (
            <div className={styles.portrait}>
              <PilotPet pet={pet} size={96} bounce={mood === 'play'} className={mood === 'sleep' ? styles.sleeping : ''} />
              {mood === 'sleep' && (
                <span className={styles.zzz} aria-hidden="true">
                  <FluentEmoji>💤</FluentEmoji>
                </span>
              )}
            </div>
          )}
          {menu && (
            <>
              <div className={styles.tabs} role="tablist">
                <button type="button" role="tab" aria-selected={tab === 'food'} aria-label="Healthy foods" className={`${styles.tab} ${tab === 'food' ? styles.tabOn : ''}`} onClick={() => setTab('food')}>
                  <FluentEmoji>🍎</FluentEmoji>
                </button>
                <button type="button" role="tab" aria-selected={tab === 'drink'} aria-label="Drinks" className={`${styles.tab} ${tab === 'drink' ? styles.tabOn : ''}`} onClick={() => setTab('drink')}>
                  <FluentEmoji>💧</FluentEmoji>
                </button>
              </div>
              <div className={styles.items}>
                {items.map((item) => (
                  <button key={item.id} type="button" className={styles.item} aria-label={item.name} onClick={() => give(item)}>
                    <FluentEmoji>{item.emoji}</FluentEmoji>
                  </button>
                ))}
              </div>
            </>
          )}
          <div className={styles.actions}>
            <button type="button" className={`${styles.action} ${styles.feed} ${menu ? styles.on : ''}`} disabled={busy} aria-pressed={menu} onClick={() => setMenu((m) => !m)}>
              <span className={styles.actionIcon}><FluentEmoji>🍎</FluentEmoji></span>
              <span>Feed</span>
            </button>
            <button type="button" className={`${styles.action} ${styles.play}`} disabled={busy} onClick={play}>
              <span className={styles.actionIcon}><FluentEmoji>⚽</FluentEmoji></span>
              <span>Play</span>
            </button>
            <button type="button" className={`${styles.action} ${styles.sleep}`} disabled={busy} onClick={sleep}>
              <span className={styles.actionIcon}><FluentEmoji>😴</FluentEmoji></span>
              <span>Sleep</span>
            </button>
          </div>
          <Wings className={styles.emblem} />
        </div>
      )}
      <button type="button" className={styles.fab} aria-label={`Pilot ${pet.name}, tap to care for me`} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <PilotPet pet={pet} size={72} bounce={Boolean(eating) || mood === 'play'} />
        {eating && (
          <span className={styles.snack} aria-hidden="true">
            <FluentEmoji>{eating}</FluentEmoji>
          </span>
        )}
      </button>
    </aside>
  )
}
