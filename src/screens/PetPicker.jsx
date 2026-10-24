import GameShell from '../components/ui/GameShell'
import PilotPet from '../components/pet/PilotPet'
import { PETS } from '../pet/pets'
import { usePet } from '../pet/usePet'
import styles from './PetPicker.module.css'

const COLORS = ['sun', 'pink', 'sky', 'grass', 'grape', 'coral']

export default function PetPicker() {
  const { choosePet } = usePet()

  const pick = (p) => choosePet(p.id)

  return (
    <GameShell title="✈️" scroll>
      <div className={styles.grid}>
        {PETS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`${styles.tile} ${styles[COLORS[i % COLORS.length]]}`}
            aria-label={`Pilot ${p.name}`}
            onClick={() => pick(p)}
          >
            <PilotPet pet={p} size={110} />
          </button>
        ))}
      </div>
    </GameShell>
  )
}
