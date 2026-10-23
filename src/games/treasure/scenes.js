// Positions are percentages of the scene box. Each scene hides 3 treasures among decor.
export const SCENES = [
  {
    id: 'island',
    background: 'linear-gradient(#7fd6ff 0%, #bfeaff 55%, #ffe7a8 55%, #ffd88a 100%)',
    decor: [
      { e: '🌴', x: 12, y: 58, s: 14 }, { e: '🌴', x: 88, y: 60, s: 16 }, { e: '☁️', x: 25, y: 14, s: 12 },
      { e: '☁️', x: 72, y: 22, s: 10 }, { e: '⛵', x: 50, y: 48, s: 11 }, { e: '🌊', x: 30, y: 52, s: 9 },
      { e: '🌊', x: 75, y: 50, s: 9 }, { e: '🐚', x: 40, y: 85, s: 8 }, { e: '🪨', x: 65, y: 88, s: 10 },
      { e: '🦀', x: 20, y: 90, s: 8 }, { e: '☀️', x: 92, y: 10, s: 11 },
    ],
    items: [
      { id: 'key', e: '🔑', name: 'key', x: 58, y: 74 },
      { id: 'coin', e: '🪙', name: 'coin', x: 82, y: 82 },
      { id: 'parrot', e: '🦜', name: 'parrot', x: 14, y: 36 },
    ],
  },
  {
    id: 'jungle',
    background: 'linear-gradient(#9be28a, #3fae5a)',
    decor: [
      { e: '🌳', x: 10, y: 30, s: 18 }, { e: '🌳', x: 88, y: 35, s: 18 }, { e: '🌿', x: 30, y: 80, s: 10 },
      { e: '🌿', x: 70, y: 85, s: 10 }, { e: '🍄', x: 48, y: 88, s: 9 }, { e: '🪵', x: 50, y: 60, s: 12 },
      { e: '🌴', x: 28, y: 20, s: 14 }, { e: '🌴', x: 72, y: 15, s: 14 }, { e: '🍃', x: 60, y: 40, s: 8 },
    ],
    items: [
      { id: 'monkey', e: '🐒', name: 'monkey', x: 22, y: 50 },
      { id: 'banana', e: '🍌', name: 'banana', x: 80, y: 68 },
      { id: 'butterfly', e: '🦋', name: 'butterfly', x: 48, y: 22 },
    ],
  },
  {
    id: 'space',
    background: 'linear-gradient(#0b0f33, #3b2a78)',
    decor: [
      { e: '⭐', x: 10, y: 15, s: 7 }, { e: '⭐', x: 40, y: 10, s: 6 }, { e: '⭐', x: 85, y: 20, s: 8 },
      { e: '✨', x: 60, y: 30, s: 7 }, { e: '🪐', x: 20, y: 65, s: 15 }, { e: '🌙', x: 80, y: 78, s: 13 },
      { e: '☄️', x: 55, y: 85, s: 10 }, { e: '🌍', x: 45, y: 50, s: 12 }, { e: '✨', x: 10, y: 88, s: 7 },
    ],
    items: [
      { id: 'alien', e: '👽', name: 'alien', x: 72, y: 50 },
      { id: 'rocket', e: '🚀', name: 'rocket', x: 30, y: 38 },
      { id: 'ufo', e: '🛸', name: 'flying saucer', x: 88, y: 90 },
    ],
  },
  {
    id: 'ocean',
    background: 'linear-gradient(#59c8ff, #0a5fb4)',
    decor: [
      { e: '🪸', x: 12, y: 85, s: 14 }, { e: '🪸', x: 85, y: 88, s: 14 }, { e: '🌿', x: 30, y: 88, s: 10 },
      { e: '🫧', x: 20, y: 30, s: 8 }, { e: '🫧', x: 78, y: 25, s: 8 }, { e: '🐚', x: 55, y: 90, s: 8 },
      { e: '🫧', x: 50, y: 15, s: 7 }, { e: '🐟', x: 40, y: 45, s: 9 }, { e: '🐟', x: 68, y: 62, s: 9 },
    ],
    items: [
      { id: 'octopus', e: '🐙', name: 'octopus', x: 15, y: 55 },
      { id: 'turtle', e: '🐢', name: 'turtle', x: 62, y: 38 },
      { id: 'chest', e: '🧰', name: 'treasure chest', x: 40, y: 72 },
    ],
  },
]
