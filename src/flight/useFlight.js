import { useCallback, useEffect, useState } from 'react'

const KEY = 'sky-captain-flight'
const START = { minutes: 120, startedAt: null }
export const MIN_MINUTES = 15
export const MAX_MINUTES = 720

function load() {
  try {
    return { ...START, ...JSON.parse(localStorage.getItem(KEY)) }
  } catch {
    return START
  }
}

// A parent-set countdown stored as a start time, so it keeps going across reloads and
// works fully offline.
export default function useFlight() {
  const [flight, setFlight] = useState(load)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(flight))
    } catch {
      // storage can be unavailable; the timer still runs for this session
    }
  }, [flight])

  const running = flight.startedAt !== null
  useEffect(() => {
    if (!running) return
    const tick = () => setNow(Date.now())
    tick()
    const timer = setInterval(tick, 5000)
    return () => clearInterval(timer)
  }, [running])

  const totalMs = flight.minutes * 60000
  const elapsed = running ? Math.max(0, now - flight.startedAt) : 0
  const progress = running ? Math.min(1, elapsed / totalMs) : 0

  const start = useCallback((minutes) => {
    const safe = Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, minutes))
    setNow(Date.now())
    setFlight({ minutes: safe, startedAt: Date.now() })
  }, [])

  const reset = useCallback(() => setFlight((f) => ({ ...f, startedAt: null })), [])

  return {
    minutes: flight.minutes,
    running,
    progress,
    remainingMs: Math.max(0, totalMs - elapsed),
    landed: running && progress >= 1,
    start,
    reset,
  }
}
