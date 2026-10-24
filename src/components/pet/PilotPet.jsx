import FluentEmoji from '../ui/FluentEmoji'
import { usePet } from '../../pet/usePet'
import { GLASSES_ART, HAT_ART, SCARF_ART } from './outfitArt'
import styles from './PilotPet.module.css'

// Per-animal tweaks so hats and glasses sit on each head (x/y in % of the avatar, s = scale).
const FIT = {
  cat: { x: 0, y: -10, s: 1 },
  dog: { x: 0, y: -10, s: 1 },
  bunny: { x: 0, y: -2, s: 0.9 },
  chicken: { x: -6, y: -10, s: 0.85 },
  raccoon: { x: 0, y: -9, s: 1 },
  bear: { x: 0, y: -8, s: 1 },
}

// Glasses sit lower when the pilot cap is not holding them on the forehead.
function glassesOffset(hat) {
  return hat === 'pilot' ? 0 : 9
}

// outfit overrides the saved one (the wardrobe uses it to preview items).
export default function PilotPet({ pet, size = 96, bounce = false, className = '', outfit }) {
  const saved = usePet().outfit
  const worn = outfit ?? saved
  const fit = FIT[pet.id] ?? FIT.cat
  const cssSize = typeof size === 'number' ? `${size}px` : size
  return (
    <div
      className={`${styles.pet} ${bounce ? styles.bounce : ''} ${className}`}
      style={{ '--size': cssSize, '--fx': `${fit.x}%`, '--fy': `${fit.y}%`, '--fs': fit.s }}
      role="img"
      aria-label={`Pilot ${pet.name}`}
    >
      <span className={styles.animal}>
        <FluentEmoji>{pet.emoji}</FluentEmoji>
      </span>
      <svg className={styles.scarf} viewBox="0 0 100 100" aria-hidden="true">
        {SCARF_ART[worn.scarf]}
      </svg>
      <svg className={styles.gear} viewBox="0 0 100 100" aria-hidden="true">
        {HAT_ART[worn.hat]}
        <g transform={`translate(0 ${glassesOffset(worn.hat)})`}>{GLASSES_ART[worn.glasses]}</g>
      </svg>
    </div>
  )
}
