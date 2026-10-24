import { useRef, useState } from 'react'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import PilotPet from '../../components/pet/PilotPet'
import { playCheer } from '../../pet/sounds'
import { usePet } from '../../pet/usePet'
import { ITEMS, SLOTS } from '../../pet/wardrobe'
import styles from './Wardrobe.module.css'

const BARE = { hat: 'hat-none', glasses: 'glasses-none', scarf: 'scarf-none' }

export default function Wardrobe({ onHome }) {
  const { pet, stars, outfit, isOwned, equip, buy } = usePet()
  const [slot, setSlot] = useState('hat')
  const [shaking, setShaking] = useState(null)
  const shakeTimer = useRef(null)

  const choose = (item) => {
    if (isOwned(item.id)) {
      equip(item.id)
      return
    }
    if (buy(item.id)) {
      playCheer()
      return
    }
    setShaking(item.id)
    clearTimeout(shakeTimer.current)
    shakeTimer.current = setTimeout(() => setShaking(null), 500)
  }

  return (
    <GameShell title="👑" onHome={onHome} scroll>
      <div className={styles.layout}>
        <div className={styles.stage}>
          <span className={styles.stars} aria-label={`${stars} flight stars`}>
            <FluentEmoji>⭐</FluentEmoji> {stars}
          </span>
          <div className={styles.mirror}>
            <PilotPet pet={pet} size="clamp(110px, 30vmin, 240px)" />
          </div>
        </div>
        <div className={styles.shop}>
          <div className={styles.tabs} role="tablist">
            {SLOTS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={slot === s.id}
                aria-label={s.name}
                className={`${styles.tab} ${slot === s.id ? styles.tabOn : ''}`}
                onClick={() => setSlot(s.id)}
              >
                <FluentEmoji>{s.emoji}</FluentEmoji>
              </button>
            ))}
          </div>
          <div className={styles.items}>
            {ITEMS.filter((i) => i.slot === slot).map((item) => {
              const owned = isOwned(item.id)
              const worn = outfit[item.slot] === item.id
              const preview = item.id.endsWith('none') ? BARE : { ...BARE, [item.slot]: item.id }
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  className={`${styles.item} ${worn ? styles.worn : ''} ${shaking === item.id ? styles.shake : ''}`}
                  onClick={() => choose(item)}
                >
                  <PilotPet pet={pet} size="clamp(56px, 12vmin, 96px)" outfit={preview} />
                  <span className={styles.badge}>
                    {worn ? (
                      <FluentEmoji>✅</FluentEmoji>
                    ) : owned ? null : (
                      <>
                        <FluentEmoji>🔒</FluentEmoji>
                        <FluentEmoji>⭐</FluentEmoji>
                        {item.cost}
                      </>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </GameShell>
  )
}
