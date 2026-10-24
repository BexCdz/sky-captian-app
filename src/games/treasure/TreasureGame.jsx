import { useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import FluentEmoji from '../../components/ui/FluentEmoji'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import { SCENES } from './scenes'
import styles from './TreasureGame.module.css'

export default function TreasureGame({ onHome }) {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [found, setFound] = useState([])

  const scene = SCENES[sceneIndex]
  const done = found.length === scene.items.length

  const tap = (item) => {
    if (found.includes(item.id)) return
    setFound([...found, item.id])
  }

  const nextScene = () => {
    setFound([])
    setSceneIndex((i) => (i + 1) % SCENES.length)
  }

  return (
    <GameShell title="🗺️" onHome={onHome}>
      <div className={styles.tray} aria-hidden="true">
        {scene.items.map((item) => (
          <span key={item.id} className={`${styles.chip} ${found.includes(item.id) ? styles.chipFound : ''}`}>
            <FluentEmoji>{item.e}</FluentEmoji>
          </span>
        ))}
      </div>
      <div className={styles.scene} style={{ background: scene.background }}>
        {scene.decor.map((d, i) => (
          <span
            key={i}
            className={styles.decor}
            style={{ left: `${d.x}%`, top: `${d.y}%`, fontSize: `${d.s}vmin` }}
            aria-hidden="true"
          >
            <FluentEmoji>{d.e}</FluentEmoji>
          </span>
        ))}
        {scene.items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.name}
            className={`${styles.item} ${found.includes(item.id) ? styles.found : ''}`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            onClick={() => tap(item)}
          >
            <FluentEmoji>{item.e}</FluentEmoji>
          </button>
        ))}
      </div>
      {done && (
        <WinBanner emoji="🎁">
          <BigButton emoji="➡️" ariaLabel="Next adventure" color="grass" onClick={nextScene} />
        </WinBanner>
      )}
    </GameShell>
  )
}
