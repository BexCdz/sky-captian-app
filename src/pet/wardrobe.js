export const SLOTS = [
  { id: 'hat', emoji: '👑', name: 'Hats' },
  { id: 'glasses', emoji: '🕶️', name: 'Glasses' },
  { id: 'scarf', emoji: '🧣', name: 'Scarves' },
]

// cost 0 means free from the start. "none" lets the pet go bare.
export const ITEMS = [
  { id: 'hat-none', slot: 'hat', name: 'No hat', cost: 0 },
  { id: 'pilot', slot: 'hat', name: 'Pilot cap', cost: 0 },
  { id: 'crown', slot: 'hat', name: 'Golden crown', cost: 3 },
  { id: 'party', slot: 'hat', name: 'Party hat', cost: 3 },
  { id: 'tophat', slot: 'hat', name: 'Top hat', cost: 4 },
  { id: 'glasses-none', slot: 'glasses', name: 'No glasses', cost: 0 },
  { id: 'goggles', slot: 'glasses', name: 'Flying goggles', cost: 0 },
  { id: 'sunglasses', slot: 'glasses', name: 'Cool sunglasses', cost: 3 },
  { id: 'hearts', slot: 'glasses', name: 'Heart glasses', cost: 3 },
  { id: 'stars', slot: 'glasses', name: 'Star glasses', cost: 4 },
  { id: 'scarf-none', slot: 'scarf', name: 'No scarf', cost: 0 },
  { id: 'red', slot: 'scarf', name: 'Red scarf', cost: 2 },
  { id: 'blue', slot: 'scarf', name: 'Blue scarf', cost: 2 },
  { id: 'rainbow', slot: 'scarf', name: 'Rainbow scarf', cost: 4 },
]

export const DEFAULT_OUTFIT = { hat: 'pilot', glasses: 'goggles', scarf: 'scarf-none' }

export const itemById = (id) => ITEMS.find((i) => i.id === id)
