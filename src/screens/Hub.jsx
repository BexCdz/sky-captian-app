import BigButton from '../components/ui/BigButton'
import GameShell from '../components/ui/GameShell'
import { usePet } from '../pet/usePet'
import styles from './Hub.module.css'

export default function Hub({ games, onPick }) {
  const { pet } = usePet()

  return (
    <GameShell title="Sky Captain" emblem scroll>
      <div className={styles.grid}>
        {games.map((game) => {
          const { emoji, label } = game.tile?.(pet) ?? game
          return (
            <BigButton
              key={game.id}
              size="tile"
              emoji={emoji}
              label={label}
              color={game.color}
              onClick={() => onPick(game.id)}
            />
          )
        })}
      </div>
    </GameShell>
  )
}
