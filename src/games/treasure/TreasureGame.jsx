import { useEffect, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import GameShell from '../../components/ui/GameShell'
import WinBanner from '../../components/ui/WinBanner'
import useSpeech from '../../hooks/useSpeech'
import { SCENES } from './scenes'
import styles from './TreasureGame.module.css'

function joinNames(names) {
  return names.length < 2 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
}

export default function TreasureGame({ onHome }) {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [found, setFound] = useState([])
  const { speak } = useSpeech()

  const scene = SCENES[sceneIndex]
  const done = found.length === scene.items.length
  const intro = `Find the ${joinNames(scene.items.map((i) => i.name))}!`

  useEffect(() => {
    speak(intro)
  }, [speak, intro])

  const tap = (item) => {
    if (found.includes(item.id)) return
    const next = [...found, item.id]
    setFound(next)
    speak(next.length === scene.items.length ? 'You found the treasure! Great job!' : `You found the ${item.name}!`)
  }

  const nextScene = () => {
    setFound([])
    setSceneIndex((i) => (i + 1) % SCENES.length)
  }

  return (
    <GameShell title="🗺️" onHome={onHome} onHint={() => speak(intro)}>
      <div className={styles.tray} aria-hidden="true">
        {scene.items.map((item) => (
          <span key={item.id} className={`${styles.chip} ${found.includes(item.id) ? styles.chipFound : ''}`}>
            {item.e}
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
            {d.e}
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
            {item.e}
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
