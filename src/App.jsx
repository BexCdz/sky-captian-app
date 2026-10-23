import { useState } from 'react'
import { GAMES } from './games'
import Hub from './screens/Hub'

export default function App() {
  const [gameId, setGameId] = useState(null)
  const game = GAMES.find((g) => g.id === gameId)

  if (game) return <game.Component key={game.id} onHome={() => setGameId(null)} />
  return <Hub games={GAMES} onPick={setGameId} />
}
