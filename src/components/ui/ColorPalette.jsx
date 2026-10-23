import styles from './ColorPalette.module.css'

const COLORS = [
  '#ff3b3b',
  '#ff9f1c',
  '#ffd23f',
  '#2fbf71',
  '#2b7bff',
  '#8a5cf6',
  '#ff7ac8',
  '#8b5a2b',
  '#12234a',
]

export default function ColorPalette({ value, onChange }) {
  return (
    <div className={styles.palette} role="radiogroup" aria-label="Colors">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          role="radio"
          aria-checked={color === value}
          aria-label={color}
          className={`${styles.swatch} ${color === value ? styles.on : ''}`}
          style={{ background: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  )
}
