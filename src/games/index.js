import DrawingGame from './drawing/DrawingGame'
import ColoringGame from './coloring/ColoringGame'
import MemoryGame from './memory/MemoryGame'
import TicTacToe from './tictactoe/TicTacToe'
import TreasureGame from './treasure/TreasureGame'
import SpotGame from './spot/SpotGame'
import PuzzleGame from './puzzle/PuzzleGame'
import CountingGame from './counting/CountingGame'
import HuntGame from './hunt/HuntGame'
import BreatheGame from './breathe/BreatheGame'
import Wardrobe from './wardrobe/Wardrobe'

// Add a game here and it shows up on the home screen.
export const GAMES = [
  { id: 'draw', emoji: '🎨', label: 'Draw', color: 'sun', Component: DrawingGame },
  { id: 'color', emoji: '🖍️', label: 'Color', color: 'pink', Component: ColoringGame },
  { id: 'pairs', emoji: '🧠', label: 'Pairs', color: 'grape', Component: MemoryGame },
  { id: 'tictactoe', emoji: '❌⭕', label: 'Tic Tac Toe', tile: (pet) => ({ emoji: `❌${pet.emoji}`, label: `vs Pilot ${pet.name}` }), color: 'sky', Component: TicTacToe },
  { id: 'treasure', emoji: '🗺️', label: 'Treasure', color: 'coral', Component: TreasureGame },
  { id: 'spot', emoji: '🔍', label: 'Spot it', color: 'grass', Component: SpotGame },
  { id: 'puzzle', emoji: '🧩', label: 'Puzzle', color: 'sun', Component: PuzzleGame },
  { id: 'count', emoji: '🔢', label: 'Count', color: 'sky', Component: CountingGame },
  { id: 'hunt', emoji: '🪟', label: 'Window Hunt', color: 'grass', Component: HuntGame },
  { id: 'breathe', emoji: '🫧', label: 'Breathe', color: 'grape', Component: BreatheGame },
  { id: 'wardrobe', emoji: '👑', label: 'Dress-up', tile: (pet) => ({ emoji: `👑${pet.emoji}`, label: 'Dress-up' }), color: 'pink', Component: Wardrobe },
]
