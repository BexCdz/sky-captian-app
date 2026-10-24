let ctx

function audio() {
  const Ctor = window.AudioContext || window.webkitAudioContext
  if (!Ctor) return null
  ctx ??= new Ctor()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function blip({ freq, endFreq = freq, start = 0, length = 0.12, type = 'sine', volume = 0.12 }) {
  const c = audio()
  if (!c) return
  const t = c.currentTime + start
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + length)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + length)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + length + 0.02)
}

// Soft crunchy "nom nom nom" made from short low blips (works offline, no audio files).
export function playMunch() {
  for (let i = 0; i < 3; i++) {
    blip({ freq: 220 - i * 15, endFreq: 120, start: i * 0.16, length: 0.1, type: 'triangle', volume: 0.16 })
  }
}

// Gentle "glug glug" for sipping.
export function playSip() {
  for (let i = 0; i < 3; i++) {
    blip({ freq: 380 + i * 60, endFreq: 640 + i * 60, start: i * 0.15, length: 0.12, type: 'sine', volume: 0.12 })
  }
}

export function playCheer() {
  ;[523, 659, 784].forEach((freq, i) => blip({ freq, start: i * 0.1, length: 0.18, type: 'triangle', volume: 0.12 }))
}
