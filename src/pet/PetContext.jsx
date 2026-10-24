import { useCallback, useEffect, useMemo, useState } from 'react'
import { FEED_AMOUNT, FEED_COST, PETS } from './pets'
import { PetContext } from './usePet'
import { DEFAULT_OUTFIT, itemById } from './wardrobe'

const KEY = 'sky-captain-pet'
const START = { petId: null, stars: 3, hunger: 60, hydration: 60, happiness: 70, owned: [], outfit: DEFAULT_OUTFIT }
const clamp = (n) => Math.max(0, Math.min(100, n))

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return { ...START, ...saved, outfit: { ...DEFAULT_OUTFIT, ...saved?.outfit } }
  } catch {
    return START
  }
}

export function PetProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // storage can be unavailable; the pet still works for this session
    }
  }, [state])

  // The bars drop very slowly so the pet gently asks for snacks during a long flight.
  useEffect(() => {
    const timer = setInterval(() => {
      setState((s) => ({
        ...s,
        hunger: clamp(s.hunger - 2),
        hydration: clamp(s.hydration - 2),
        happiness: clamp(s.happiness - 1),
      }))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const pet = PETS.find((p) => p.id === state.petId) ?? null

  const choosePet = useCallback((petId) => setState((s) => ({ ...s, petId })), [])
  const clearPet = useCallback(() => setState((s) => ({ ...s, petId: null })), [])
  const addStars = useCallback((n = 1) => setState((s) => ({ ...s, stars: s.stars + n })), [])

  const cheer = useCallback((n) => setState((s) => ({ ...s, happiness: clamp(s.happiness + n) })), [])

  // Returns false (and changes nothing) when there are not enough stars.
  const feed = useCallback(
    (kind) => {
      if (state.stars < FEED_COST) return false
      setState((s) => ({
        ...s,
        stars: s.stars - FEED_COST,
        [kind]: clamp(s[kind] + FEED_AMOUNT),
      }))
      return true
    },
    [state.stars],
  )

  const isOwned = useCallback((id) => {
    const item = itemById(id)
    return Boolean(item) && (item.cost === 0 || state.owned.includes(id))
  }, [state.owned])

  // Wears an owned item. Returns false when it is not owned.
  const equip = useCallback(
    (id) => {
      const item = itemById(id)
      if (!item || !isOwned(id)) return false
      setState((s) => ({ ...s, outfit: { ...s.outfit, [item.slot]: id } }))
      return true
    },
    [isOwned],
  )

  // Spends stars to unlock an item and wears it. Returns false when it cannot be bought.
  const buy = useCallback(
    (id) => {
      const item = itemById(id)
      if (!item || isOwned(id) || state.stars < item.cost) return false
      setState((s) => ({
        ...s,
        stars: s.stars - item.cost,
        owned: [...s.owned, id],
        outfit: { ...s.outfit, [item.slot]: id },
      }))
      return true
    },
    [isOwned, state.stars],
  )

  const value = useMemo(
    () => ({
      pet,
      stars: state.stars,
      hunger: state.hunger,
      hydration: state.hydration,
      happiness: state.happiness,
      outfit: state.outfit,
      isOwned,
      choosePet,
      clearPet,
      addStars,
      feed,
      cheer,
      equip,
      buy,
    }),
    [pet, state.stars, state.hunger, state.hydration, state.happiness, state.outfit, isOwned, choosePet, clearPet, addStars, feed, cheer, equip, buy],
  )

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>
}
