import Senator from './Senator'
import DecisionLog from './DecisionLog'
import { corruptionGrade, gradeSubtext } from '../utils/scoring'
import { useCashCounter } from '../hooks/useCashCounter'
import type { LogEntry } from '../types/game'

const CONFETTI_COLORS = ['#FFD700', '#ffffff', '#4ade80', '#60a5fa', '#f472b6', '#fb923c']

interface Props {
  cashInDollars: number
  goldBars:      number
  fbi:           number
  foreign:       number
  gameLog:       LogEntry[]
  onReset:       () => void
}

export default function WinBigScreen({
  cashInDollars, goldBars, fbi, foreign, gameLog, onReset,
}: Props) {
  const grade       = corruptionGrade(cashInDollars, foreign, goldBars, fbi)
  const sub         = gradeSubtext(grade)
  const displayCash = useCashCounter(cashInDollars)

  return (
    <main className="win-big-screen" aria-label="Game over: big win">

      {/* Confetti rain */}
      <div className="confetti-field" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left:              `${(i * 3.4) % 100}%`,
              animationDelay:    `${(i * 0.07) % 1.8}s`,
              animationDuration: `${1.2 + (i % 5) * 0.18}s`,
              background:        CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            }}
          />
        ))}
      </div>

      <h1 className="win-big-title">YOU WON BIG</h1>
      <p className="win-big-sub">The FBI never proved a thing.</p>

      <div className="win-senator-wrap" aria-hidden="true">
        <Senator expression="celebrate" animate="" showGoldBar={goldBars > 0} />
        <div
          className={`grade-stamp grade-stamp--${grade.toLowerCase()}`}
          aria-label={`Corruption grade: ${grade} — ${sub}`}
        >
          {grade}
        </div>
      </div>
      <p className="grade-subtext">{sub}</p>

      <div className="win-dossier" role="status" aria-label="Final game stats">
        <div className="dossier-row">
          <span>CASH ACCUMULATED</span>
          <span>${displayCash.toLocaleString()}</span>
        </div>
        <div className="dossier-row">
          <span>FBI SUSPICION</span>
          <span>{fbi}/100</span>
        </div>
        <div className="dossier-row">
          <span>FOREIGN INTEREST</span>
          <span>{foreign}/100</span>
        </div>
        {goldBars > 0 && (
          <div className="dossier-row">
            <span>GOLD BARS EARNED</span>
            <span>{goldBars}</span>
          </div>
        )}
      </div>

      <DecisionLog gameLog={gameLog} />

      <button
        className="start-btn"
        onClick={onReset}
        aria-label="Play again from the beginning"
      >
        PLAY AGAIN
      </button>

    </main>
  )
}
