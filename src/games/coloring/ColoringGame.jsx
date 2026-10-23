import { useEffect, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import ColorPalette from '../../components/ui/ColorPalette'
import GameShell from '../../components/ui/GameShell'
import useSpeech from '../../hooks/useSpeech'
import { PAGES } from './pages'
import styles from './ColoringGame.module.css'

const INTRO = 'Pick a color, then tap the picture to paint it!'

export default function ColoringGame({ onHome }) {
  const [pageIndex, setPageIndex] = useState(0)
  const [color, setColor] = useState('#ff3b3b')
  const [fills, setFills] = useState({})
  const { speak } = useSpeech()

  useEffect(() => {
    speak(INTRO)
  }, [speak])

  const page = PAGES[pageIndex]
  const pageFills = fills[page.id] ?? {}

  const paintRegion = (regionId) =>
    setFills((f) => ({ ...f, [page.id]: { ...f[page.id], [regionId]: color } }))

  const go = (step) => setPageIndex((i) => (i + step + PAGES.length) % PAGES.length)

  return (
    <GameShell title="🖍️" onHome={onHome} onHint={() => speak(INTRO)}>
      <svg className={styles.page} viewBox="0 0 200 200" role="img" aria-label="Coloring page">
        {page.regions.map(({ id, shape: Shape, props }) => (
          <Shape
            key={id}
            {...props}
            className={styles.region}
            fill={pageFills[id] ?? '#ffffff'}
            onClick={() => paintRegion(id)}
          />
        ))}
      </svg>
      <div className={styles.tools}>
        <BigButton size="compact" emoji="⬅️" ariaLabel="Previous picture" color="sky" onClick={() => go(-1)} />
        <ColorPalette value={color} onChange={setColor} />
        <BigButton size="compact" emoji="➡️" ariaLabel="Next picture" color="sky" onClick={() => go(1)} />
        <BigButton
          size="compact"
          emoji="🗑️"
          ariaLabel="Start over"
          color="coral"
          onClick={() => setFills((f) => ({ ...f, [page.id]: {} }))}
        />
      </div>
    </GameShell>
  )
}
