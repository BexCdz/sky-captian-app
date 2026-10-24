import styles from './DeviceFrame.module.css'

// A soft tablet bezel. Every screen and overlay is positioned inside .screen.
export default function DeviceFrame({ children }) {
  return (
    <div className={styles.device}>
      <div className={styles.screen}>{children}</div>
    </div>
  )
}
