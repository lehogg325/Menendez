import { useState } from 'react'
import EvidenceSlideshow from './EvidenceSlideshow'
import PrisonScreen from './PrisonScreen'
import type { Slide } from './EvidenceSlideshow'
import type { LogEntry } from '../types/game'

// import.meta.glob handles filenames with spaces that static imports can't resolve
const rawImgs = import.meta.glob('../assets/real-images/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function img(filename: string): string {
  return rawImgs[`../assets/real-images/${filename}`] ?? ''
}

const SLIDES: Slide[] = [
  { src: img('Screenshot 2026-03-28 at 8.10.36 PM.png'), label: 'EXHIBIT A: SEALED INDICTMENT — 23 CRIM 490'           },
  { src: img('650edd0784d0d0.56116354.webp'),             label: 'EXHIBIT B: DOJ EVIDENCE BOARD — GOLD & MERCEDES'      },
  { src: img('Screenshot 2026-03-28 at 8.08.59 PM.png'), label: 'EXHIBIT C: $480,000 FOUND IN A CONGRESSIONAL JACKET'  },
  { src: img('Screenshot 2026-03-28 at 8.09.19 PM.png'), label: 'EXHIBIT D: 13 GOLD BARS — SWISS BANK CORPORATION'     },
  { src: img('Screenshot 2026-03-28 at 8.09.44 PM.png'), label: 'EXHIBIT E: WITH EGYPTIAN OFFICIAL-5'                  },
  { src: img('menendez_defendant.jpg'),                   label: 'EXHIBIT F: THE DEFENDANT'                              },
  { src: img('menendez_trial.jpg'),                      label: 'EXHIBIT G: U.S. v. MENENDEZ — THE TRIAL'              },
]

interface Props {
  round:         number
  cashInDollars: number
  goldBars:      number
  foreign:       number
  lastChoice:    string | undefined
  gameLog:       LogEntry[]
  onReset:       () => void
}

export default function LoseScreen({
  round, cashInDollars, goldBars, foreign, lastChoice, gameLog, onReset,
}: Props) {
  const [phase, setPhase] = useState<'slideshow' | 'prison'>('slideshow')

  if (phase === 'slideshow') {
    return <EvidenceSlideshow slides={SLIDES} onComplete={() => setPhase('prison')} />
  }

  return (
    <PrisonScreen
      round={round}
      cashInDollars={cashInDollars}
      goldBars={goldBars}
      foreign={foreign}
      lastChoice={lastChoice}
      gameLog={gameLog}
      onReset={onReset}
    />
  )
}
