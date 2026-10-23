import styles from './BigButton.module.css'

export default function BigButton({
  emoji,
  label,
  color = 'sun',
  size,
  className = '',
  ariaLabel,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[color] ?? styles.sun} ${size ? styles[size] : ''} ${className}`}
      aria-label={ariaLabel ?? label}
      disabled={disabled}
      onClick={onClick}
    >
      {emoji && (
        <span className={styles.emoji} aria-hidden="true">
          {emoji}
        </span>
      )}
      {label && <span>{label}</span>}
    </button>
  )
}
