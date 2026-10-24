import { createContext, useContext } from 'react'

export const PetContext = createContext(null)

export function usePet() {
  const value = useContext(PetContext)
  if (!value) throw new Error('usePet must be used inside <PetProvider>')
  return value
}
