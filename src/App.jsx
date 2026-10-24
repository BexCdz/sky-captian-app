import { useState } from 'react'
import CoPilotPet from './components/pet/CoPilotPet'
import FlightTracker from './components/flight/FlightTracker'
import DeviceFrame from './components/ui/DeviceFrame'
import { GAMES } from './games'
import { PetProvider } from './pet/PetContext'
import { usePet } from './pet/usePet'
import Hub from './screens/Hub'
import PetPicker from './screens/PetPicker'
import styles from './App.module.css'

function Shell() {
  const { pet, clearPet } = usePet()
  const [gameId, setGameId] = useState(null)
  const game = GAMES.find((g) => g.id === gameId)

  if (!pet) return <PetPicker />

  const changePet = () => {
    setGameId(null)
    clearPet()
  }

  return (
    <div className={styles.stage}>
      <FlightTracker />
      <div className={styles.view}>
        {game ? <game.Component key={game.id} onHome={() => setGameId(null)} /> : <Hub games={GAMES} onPick={setGameId} />}
        <CoPilotPet onChangePet={changePet} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <PetProvider>
      <DeviceFrame>
        <Shell />
      </DeviceFrame>
    </PetProvider>
  )
}