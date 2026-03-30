import { useReducer, useCallback, useMemo } from 'react'
import type { GameState, GameOption, Screen, Difficulty, LogEntry } from '../types/game'
import { scenarios } from '../data/scenarios'

// Each cash point earned equals this many dollars.
// Max achievable (always picking highest-cash option) = 238 pts = $952K,
// making the $800K big-win threshold a meaningful but reachable goal.
const CASH_PER_POINT         = 4000
export const BIG_WIN_CASH_DOLLARS = 800_000
const FBI_LIMIT              = 100
export const GOLD_BAR_STREAK = 5
const FARA_FOREIGN_THRESHOLD = 80

// On hard difficulty, FBI deltas are multiplied by this factor.
const HARD_FBI_MULTIPLIER = 1.5

export function cashToDollars(cash: number): number {
  return cash * CASH_PER_POINT
}

// The "optimal" choice for streak tracking is the option with the highest cash delta.
function getOptimalOptionText(options: GameOption[]): string {
  return options.reduce((best, opt) => (opt.cash > best.cash ? opt : best)).text
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

// ---------------------------------------------------------------------------
// State & reducer
// ---------------------------------------------------------------------------

const initialState: GameState = {
  screen: 'title',
  difficulty: 'easy',
  round: 1,
  fbi: 0,
  foreign: 0,
  cash: 0,
  streak: 0,
  goldBars: 0,
  gameLog: [],
}

type Action =
  | { type: 'START_GAME'; difficulty: Difficulty }
  | { type: 'CHOOSE'; option: GameOption }
  | { type: 'RESET' }

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...initialState, screen: 'game', difficulty: action.difficulty }

    case 'RESET':
      return initialState

    case 'CHOOSE': {
      const { option } = action
      const scenario = scenarios[state.round - 1]

      // Apply difficulty multiplier to FBI delta only
      const fbiDelta =
        state.difficulty === 'hard'
          ? Math.round(option.fbi * HARD_FBI_MULTIPLIER)
          : option.fbi

      const newFBI     = clamp(state.fbi + fbiDelta, 0, FBI_LIMIT)
      const newForeign = clamp(state.foreign + option.foreign, 0, 100)
      const newCash    = state.cash + option.cash // unbounded; negative cash is possible

      // Streak: increments when the highest-cash option is chosen
      const optimalText = getOptimalOptionText(scenario.options)
      const isOptimal   = option.text === optimalText
      const newStreak   = isOptimal ? state.streak + 1 : 0
      const newGoldBars = isOptimal ? state.goldBars + 1 : state.goldBars

      const newLog: LogEntry[] = [
        ...state.gameLog,
        {
          round: state.round,
          scenarioTitle: scenario.title,
          choiceText: option.text,
          flavor: option.flavor,
        },
      ]

      const partial: GameState = {
        ...state,
        fbi: newFBI,
        foreign: newForeign,
        cash: newCash,
        streak: newStreak,
        goldBars: newGoldBars,
        gameLog: newLog,
      }

      // Lose condition — FBI maxed out
      if (newFBI >= FBI_LIMIT) {
        return { ...partial, screen: 'lose' }
      }

      // Final round — determine ending
      if (state.round === 20) {
        const dollars = cashToDollars(newCash)
        let endScreen: Screen
        if (newForeign >= FARA_FOREIGN_THRESHOLD) {
          endScreen = 'winFARA'
        } else if (dollars >= BIG_WIN_CASH_DOLLARS) {
          endScreen = 'winBig'
        } else {
          endScreen = 'winSmall'
        }
        return { ...partial, screen: endScreen }
      }

      // Advance to next round
      return { ...partial, round: state.round + 1 }
    }

    default:
      return state
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface GameStateHook extends GameState {
  cashInDollars: number
  currentScenario: (typeof scenarios)[number] | null
  startGame: (difficulty: Difficulty) => void
  handleChoice: (option: GameOption) => void
  resetGame: () => void
}

export function useGameState(): GameStateHook {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const startGame = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'START_GAME', difficulty })
  }, [])

  const handleChoice = useCallback((option: GameOption) => {
    dispatch({ type: 'CHOOSE', option })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const cashInDollars = cashToDollars(state.cash)

  // Shuffle options once per round; stable until round changes
  const currentScenario = useMemo(() => {
    if (state.screen !== 'game') return null
    const scenario = scenarios[state.round - 1]
    const shuffled = [...scenario.options].sort(() => Math.random() - 0.5)
    return { ...scenario, options: shuffled }
  }, [state.round, state.screen])

  return {
    ...state,
    cashInDollars,
    currentScenario,
    startGame,
    handleChoice,
    resetGame,
  }
}
