import { useEffect } from 'react'
import BigButton from '../components/ui/BigButton'
import GameShell from '../components/ui/GameShell'
import useSpeech from '../hooks/useSpeech'
import styles from './Hub.module.css'

const INTRO = 'Pick a game!'

export default function Hub({ games, onPick }) {
  const { speak } = useSpeech()

  useEffect(() => {
    speak(INTRO)
  }, [speak])

  return (
    <GameShell title="✈️ Sky Captain" scroll onHint={() => speak(INTRO)}>
      <div className={styles.grid}>
        {games.map((game) => (
          <BigButton
            key={game.id}
            size="tile"
            emoji={game.emoji}
            label={game.label}
            color={game.color}
            onClick={() => onPick(game.id)}
          />
        ))}
      </div>
    </GameShell>
  )
}
