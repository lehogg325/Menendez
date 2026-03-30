export type Difficulty = 'easy' | 'hard'

export type Screen = 'title' | 'game' | 'winBig' | 'winSmall' | 'winFARA' | 'lose'

export interface GameOption {
  text: string
  fbi: number       // delta to FBI suspicion (positive = more suspicious)
  foreign: number   // delta to foreign interest meter
  cash: number      // delta to cash meter
  flavor: string    // comedic result text shown after choosing
}

export interface Scenario {
  round: number
  title: string
  description: string
  options: GameOption[]
}

export interface LogEntry {
  round: number
  scenarioTitle: string
  choiceText: string
  flavor: string
}

export interface GameState {
  screen: Screen
  difficulty: Difficulty
  round: number       // 1–20
  fbi: number         // 0–100, game over at 100
  foreign: number     // 0–100
  cash: number        // 0–100
  streak: number      // consecutive max-corruption choices
  goldBars: number    // count of gold bar choices made
  gameLog: LogEntry[]
}
