import styles from './FluentEmoji.module.css'

const files = import.meta.glob('../../assets/emoji/*.webp', { eager: true, import: 'default' })
const byCode = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]),
)

const EMOJI = /\p{Extended_Pictographic}\uFE0F?/gu

function codeOf(char) {
  return Array.from(char, (c) => c.codePointAt(0).toString(16)).join('-')
}

function srcFor(char) {
  const code = codeOf(char)
  return byCode[code] ?? byCode[code.replace(/-fe0f$/, '')] ?? byCode[`${code}-fe0f`]
}

// Renders text, swapping each emoji for its bundled 3D Fluent image (no network needed).
export default function FluentEmoji({ children }) {
  const text = String(children)
  const parts = []
  let last = 0
  for (const match of text.matchAll(EMOJI)) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const src = srcFor(match[0])
    parts.push(
      src ? (
        <img key={match.index} className={styles.img} src={src} alt="" draggable="false" />
      ) : (
        match[0]
      ),
    )
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
