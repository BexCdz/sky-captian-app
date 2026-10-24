const METAL_STOPS = (
  <>
    <stop offset="0" stopColor="#fff8e0" />
    <stop offset="0.35" stopColor="#e2c98a" />
    <stop offset="0.6" stopColor="#f8ecc8" />
    <stop offset="1" stopColor="#a8803e" />
  </>
)

// Small pilot emblem: both wings with a gold star medallion.
export function Wings({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden="true">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          {METAL_STOPS}
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0a8" />
          <stop offset="1" stopColor="#e0a41f" />
        </linearGradient>
      </defs>
      <path d="M30 20 C22 18 12 14 2 6 C8 20 18 28 30 30 Z" fill="url(#metal)" stroke="#8a6a3a" strokeWidth="1" />
      <path d="M34 20 C42 18 52 14 62 6 C56 20 46 28 34 30 Z" fill="url(#metal)" stroke="#8a6a3a" strokeWidth="1" />
      <path d="M26 21 C20 19 14 16 8 11 M26 25 C20 24 15 22 11 19 M38 21 C44 19 50 16 56 11 M38 25 C44 24 49 22 53 19" fill="none" stroke="#a8803e" strokeWidth="1" strokeLinecap="round" />
      <circle cx="32" cy="22" r="8" fill="url(#gold)" stroke="#b7821a" strokeWidth="1.2" />
      <path d="M32 16.5 l1.8 3.7 4 .5 -2.9 2.8 .7 4 -3.6-1.9 -3.6 1.9 .7-4 -2.9-2.8 4-.5z" fill="#fff8d6" />
    </svg>
  )
}

// One long feathered metal wing pointing left; set flip for the right-hand wing.
export function Wing({ className, flip = false }) {
  return (
    <svg className={className} viewBox="0 0 120 50" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <defs>
        <linearGradient id="wing-metal" x1="0" y1="0" x2="1" y2="1">
          {METAL_STOPS}
        </linearGradient>
      </defs>
      <g fill="url(#wing-metal)" stroke="#8a6a3a" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M120 17 C95 8 50 6 3 12 C30 19 60 22 120 28 Z" />
        <path d="M120 24 C95 19 55 21 12 28 C40 35 80 35 120 34 Z" />
        <path d="M120 31 C95 30 65 34 26 43 C60 46 95 43 120 39 Z" />
      </g>
    </svg>
  )
}
