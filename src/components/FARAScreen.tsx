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

export default function FARAScreen({
  cashInDollars, goldBars, fbi, foreign, gameLog, onReset,
}: Props) {
  const grade       = corruptionGrade(cashInDollars, foreign, goldBars, fbi)
  const sub         = gradeSubtext(grade)
  const displayCash = useCashCounter(cashInDollars)

  return (
    <main className="fara-screen" aria-label="Game over: FARA violation">

      <h1 className="fara-title">FOREIGN AGENT OF THE YEAR</h1>
      <p className="fara-charge">Charged under 22 U.S.C. § 612</p>

      <div className="win-senator-wrap" aria-hidden="true">
        <Senator expression="sweat" animate="" showGoldBar={false} />
        <div
          className={`grade-stamp grade-stamp--${grade.toLowerCase()}`}
          aria-label={`Corruption grade: ${grade} — ${sub}`}
        >
          {grade}
        </div>
      </div>
      <p className="grade-subtext">{sub}</p>

      <div className="win-dossier fara-dossier" role="status" aria-label="Final game stats">
        <div className="dossier-row fara-dossier-row--highlight">
          <span>FOREIGN INTEREST</span>
          <span>{foreign}/100</span>
        </div>
        <div className="dossier-row">
          <span>CASH ACCUMULATED</span>
          <span>${displayCash.toLocaleString()}</span>
        </div>
        <div className="dossier-row">
          <span>FBI SUSPICION</span>
          <span>{fbi}/100</span>
        </div>
        {goldBars > 0 && (
          <div className="dossier-row">
            <span>GOLD BARS EARNED</span>
            <span>{goldBars}</span>
          </div>
        )}
        <div className="dossier-sentence fara-sentence">
          REGISTERED AS: <strong>AGENT OF EGYPT</strong>
        </div>
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
