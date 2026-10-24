// SVG art for each wardrobe item, drawn in a 100x100 box over the pet's head (hats, glasses)
// or chin (scarves). Gradient ids are unique per item, so repeated previews stay consistent.

const star = 'M0 -12 L2.94 -4.05 L11.41 -3.71 L4.76 1.55 L7.05 9.71 L0 5 L-7.05 9.71 L-4.76 1.55 L-11.41 -3.71 L-2.94 -4.05 Z'
const heart = 'M0 9 C-15 -1 -11 -12 -4 -10.5 C-2 -10 0 -8 0 -5.5 C0 -8 2 -10 4 -10.5 C11 -12 15 -1 0 9 Z'

function Grad({ id, from, to }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={from} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  )
}

export const HAT_ART = {
  pilot: (
    <>
      <defs>
        <Grad id="art-leather" from="#c98a52" to="#8a5530" />
      </defs>
      <path d="M17 44 C15 12 85 12 83 44 C70 38 30 38 17 44 Z" fill="url(#art-leather)" />
      <path d="M17 44 C30 38 70 38 83 44 L83 49 C70 43 30 43 17 49 Z" fill="#6f4224" />
      <path d="M26 24 C40 17 60 17 74 24" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  crown: (
    <>
      <defs>
        <Grad id="art-gold" from="#fff0a8" to="#e0a41f" />
      </defs>
      <path d="M24 30 L26 6 L39 19 L50 2 L61 19 L74 6 L76 30 Z" fill="url(#art-gold)" stroke="#b7821a" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="24" y="25" width="52" height="7" rx="3" fill="#e0a41f" stroke="#b7821a" strokeWidth="1.2" />
      <circle cx="50" cy="12" r="3.2" fill="#ff5d5d" />
      <circle cx="31" cy="28.5" r="2.4" fill="#4cc3ff" />
      <circle cx="50" cy="28.5" r="2.4" fill="#ff5d5d" />
      <circle cx="69" cy="28.5" r="2.4" fill="#4cc3ff" />
    </>
  ),
  party: (
    <>
      <defs>
        <Grad id="art-party" from="#ff9fd6" to="#ff5fb0" />
      </defs>
      <path d="M50 -2 L74 30 Q50 36 26 30 Z" fill="url(#art-party)" stroke="#d6428f" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M40 14 L58 22 M34 22 L66 30 M45 6 L52 10" stroke="#fff3b8" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="50" cy="-2" r="5" fill="#ffd23f" stroke="#e0a41f" strokeWidth="1" />
    </>
  ),
  tophat: (
    <>
      <defs>
        <Grad id="art-top" from="#4a4a63" to="#262636" />
      </defs>
      <rect x="32" y="-2" width="36" height="28" rx="4" fill="url(#art-top)" />
      <rect x="32" y="17" width="36" height="6" fill="#ff5d5d" />
      <rect x="20" y="24" width="60" height="7" rx="3.5" fill="url(#art-top)" />
      <path d="M37 4 L37 15" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
}

export const GLASSES_ART = {
  goggles: (
    <>
      <defs>
        <linearGradient id="art-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9f3ff" />
          <stop offset="1" stopColor="#5db8f0" />
        </linearGradient>
      </defs>
      <rect x="14" y="30" width="72" height="6" rx="3" fill="#3b3b4a" />
      <circle cx="36" cy="30" r="11" fill="#e8b93a" />
      <circle cx="64" cy="30" r="11" fill="#e8b93a" />
      <circle cx="36" cy="30" r="8" fill="url(#art-glass)" />
      <circle cx="64" cy="30" r="8" fill="url(#art-glass)" />
      <ellipse cx="33" cy="27" rx="2.6" ry="1.8" fill="#fff" fillOpacity="0.85" />
      <ellipse cx="61" cy="27" rx="2.6" ry="1.8" fill="#fff" fillOpacity="0.85" />
      <rect x="45" y="28" width="10" height="4" rx="2" fill="#e8b93a" />
    </>
  ),
  sunglasses: (
    <>
      <rect x="20" y="22" width="26" height="17" rx="8" fill="#1d1d2b" />
      <rect x="54" y="22" width="26" height="17" rx="8" fill="#1d1d2b" />
      <rect x="45" y="26" width="10" height="4" rx="2" fill="#1d1d2b" />
      <path d="M26 27 L33 27 M60 27 L67 27" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  hearts: (
    <>
      <path transform="translate(34 31) scale(1.45)" d={heart} fill="#ff5c8a" stroke="#d63a68" strokeWidth="1" />
      <path transform="translate(66 31) scale(1.45)" d={heart} fill="#ff5c8a" stroke="#d63a68" strokeWidth="1" />
      <path d="M46 26 L54 26" stroke="#d63a68" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="28" cy="25" rx="3" ry="2" fill="#fff" fillOpacity="0.7" />
      <ellipse cx="60" cy="25" rx="3" ry="2" fill="#fff" fillOpacity="0.7" />
    </>
  ),
  stars: (
    <>
      <path transform="translate(33 32) scale(1.5)" d={star} fill="#ffd23f" stroke="#e0a41f" strokeWidth="1" strokeLinejoin="round" />
      <path transform="translate(67 32) scale(1.5)" d={star} fill="#ffd23f" stroke="#e0a41f" strokeWidth="1" strokeLinejoin="round" />
      <path d="M46 27 L54 27" stroke="#e0a41f" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
}

const scarfBand = (fill) => (
  <>
    <path d="M14 70 Q50 88 86 70 L89 83 Q50 102 11 83 Z" fill={fill} />
    <path d="M62 85 L76 83 L79 99 Q70 103 62 99 Z" fill={fill} />
    <path d="M14 70 Q50 88 86 70" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
  </>
)

export const SCARF_ART = {
  red: (
    <>
      <defs>
        <Grad id="art-red" from="#ff7a7a" to="#d93a3f" />
      </defs>
      {scarfBand('url(#art-red)')}
    </>
  ),
  blue: (
    <>
      <defs>
        <Grad id="art-blue" from="#78c0ff" to="#2f78d8" />
      </defs>
      {scarfBand('url(#art-blue)')}
    </>
  ),
  rainbow: (
    <>
      <defs>
        <linearGradient id="art-rainbow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5d5d" />
          <stop offset="0.2" stopColor="#ff5d5d" />
          <stop offset="0.2" stopColor="#ffa940" />
          <stop offset="0.4" stopColor="#ffa940" />
          <stop offset="0.4" stopColor="#ffd23f" />
          <stop offset="0.6" stopColor="#ffd23f" />
          <stop offset="0.6" stopColor="#4fd38a" />
          <stop offset="0.8" stopColor="#4fd38a" />
          <stop offset="0.8" stopColor="#4cc3ff" />
          <stop offset="1" stopColor="#4cc3ff" />
        </linearGradient>
      </defs>
      {scarfBand('url(#art-rainbow)')}
    </>
  ),
}
