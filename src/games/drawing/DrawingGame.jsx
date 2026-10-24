import { useCallback, useEffect, useRef, useState } from 'react'
import BigButton from '../../components/ui/BigButton'
import ColorPalette from '../../components/ui/ColorPalette'
import GameShell from '../../components/ui/GameShell'
import styles from './DrawingGame.module.css'

const SIZES = [8, 20, 40]
const WHITE = '#ffffff'

// Strokes keep normalized (0-1) points so a drawing survives a resize or rotation.
function drawStroke(ctx, stroke, w, h, from = 0) {
  const pts = stroke.points
  ctx.strokeStyle = stroke.color
  ctx.fillStyle = stroke.color
  ctx.lineWidth = stroke.size
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if (pts.length === 1) {
    ctx.beginPath()
    ctx.arc(pts[0][0] * w, pts[0][1] * h, stroke.size / 2, 0, Math.PI * 2)
    ctx.fill()
    return
  }
  ctx.beginPath()
  const start = Math.max(from, 1)
  ctx.moveTo(pts[start - 1][0] * w, pts[start - 1][1] * h)
  for (let i = start; i < pts.length; i++) ctx.lineTo(pts[i][0] * w, pts[i][1] * h)
  ctx.stroke()
}

function paint(ctx, strokes, w, h) {
  ctx.fillStyle = WHITE
  ctx.fillRect(0, 0, w, h)
  for (const stroke of strokes) {
    if (stroke.clear) {
      ctx.fillStyle = WHITE
      ctx.fillRect(0, 0, w, h)
    } else {
      drawStroke(ctx, stroke, w, h)
    }
  }
}

export default function DrawingGame({ onHome }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const strokes = useRef([])
  const current = useRef(null)
  const size = useRef({ w: 0, h: 0 })
  const [color, setColor] = useState('#ff3b3b')
  const [brush, setBrush] = useState(SIZES[1])
  const [canUndo, setCanUndo] = useState(false)

  const redraw = useCallback(() => {
    const { w, h } = size.current
    if (w) paint(canvasRef.current.getContext('2d'), strokes.current, w, h)
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const rect = wrapRef.current.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const canvas = canvasRef.current
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
      size.current = { w: rect.width, h: rect.height }
      redraw()
    })
    observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [redraw])

  const point = (e) => {
    const r = canvasRef.current.getBoundingClientRect()
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]
  }

  const onDown = (e) => {
    if (current.current) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const stroke = { color, size: brush, points: [point(e)] }
    strokes.current.push(stroke)
    current.current = stroke
    const { w, h } = size.current
    drawStroke(canvasRef.current.getContext('2d'), stroke, w, h)
    setCanUndo(true)
  }

  const onMove = (e) => {
    const stroke = current.current
    if (!stroke) return
    stroke.points.push(point(e))
    const { w, h } = size.current
    drawStroke(canvasRef.current.getContext('2d'), stroke, w, h, stroke.points.length - 1)
  }

  const onUp = () => {
    current.current = null
  }

  const undo = () => {
    strokes.current.pop()
    redraw()
    setCanUndo(strokes.current.length > 0)
  }

  // Clear is itself a stroke, so Undo brings the picture back.
  const clear = () => {
    const last = strokes.current.at(-1)
    if (!last || last.clear) return
    strokes.current.push({ clear: true })
    redraw()
    setCanUndo(true)
  }

  return (
    <GameShell title="🎨" onHome={onHome}>
      <div ref={wrapRef} className={styles.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          aria-label="Drawing paper"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>
      <div className={styles.tools}>
        <ColorPalette value={color} onChange={setColor} />
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={`Brush ${s}`}
            className={`${styles.brush} ${brush === s ? styles.brushOn : ''}`}
            onClick={() => setBrush(s)}
          >
            <span className={styles.dot} style={{ width: s, height: s }} />
          </button>
        ))}
        <BigButton size="compact" emoji="🧽" ariaLabel="Eraser" color={color === WHITE ? 'sun' : 'sky'} onClick={() => setColor(WHITE)} />
        <BigButton size="compact" emoji="↩️" ariaLabel="Undo" color="grass" disabled={!canUndo} onClick={undo} />
        <BigButton size="compact" emoji="🗑️" ariaLabel="Clear" color="coral" onClick={clear} />
      </div>
    </GameShell>
  )
}
