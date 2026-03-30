import Senator from './Senator'
import DecisionLog from './DecisionLog'
import { corruptionGrade, gradeSubtext } from '../utils/scoring'
import { useCashCounter } from '../hooks/useCashCounter'
import type { LogEntry } from '../types/game'

interface Props {
  cashInDollars: number
  goldBars:      number
  fbi:           number
  foreign:       number
  gameLog:       LogEntry[]
  onReset:       () => void
}

export default function WinSmallScreen({
  cashInDollars, goldBars, fbi, foreign, gameLog, onReset,
}: Props) {
  const grade       = corruptionGrade(cashInDollars, foreign, goldBars, fbi)
  const sub         = gradeSubtext(grade)
  const displayCash = useCashCounter(cashInDollars)

  return (
    <main className="win-small-screen" aria-label="Game over: small win">

      <h1 className="win-small-title">YOU GOT AWAY WITH IT</h1>
      <p className="win-small-sub">Barely.</p>

      <div className="win-senator-wrap" aria-hidden="true">
        <Senator expression="nervous" animate="" showGoldBar={false} />
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
