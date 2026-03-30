import Senator from './Senator'
import DecisionLog from './DecisionLog'
import { corruptionGrade, gradeSubtext } from '../utils/scoring'
import { useCashCounter } from '../hooks/useCashCounter'
import type { LogEntry } from '../types/game'

interface Props {
  round:         number
  cashInDollars: number
  goldBars:      number
  foreign:       number
  lastChoice:    string | undefined
  gameLog:       LogEntry[]
  onReset:       () => void
}

// Prison bars geometry — matches Senator viewBox 315×340
const BAR_COUNT = 7
const SVG_W     = 315
const SVG_H     = 340
const BAR_W     = 16
const GAP       = (SVG_W - BAR_COUNT * BAR_W) / (BAR_COUNT - 1)  // ≈33.8

export default function PrisonScreen({
  round, cashInDollars, goldBars, foreign, lastChoice, gameLog, onReset,
}: Props) {
  // FBI is always 100 on the lose screen (that's the lose condition)
  const grade       = corruptionGrade(cashInDollars, foreign, goldBars, 100)
  const sub         = gradeSubtext(grade)
  const displayCash = useCashCounter(cashInDollars)

  return (
    <main className="prison-screen" aria-label="Game over: caught by FBI">

      <h1 className="prison-title">YOU GOT CAUGHT</h1>

      {/* Senator + bars + guilty stamp */}
      <div className="prison-senator-outer" aria-hidden="true">

        {/* overflow:hidden clips bars during drop animation */}
        <div className="prison-senator-clip">
          <Senator expression="sweat" animate="" showGoldBar={false} />

          <svg
            className="prison-bars-svg"
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pbGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#0d0d0d" />
                <stop offset="30%"  stopColor="#2e2e2e" />
                <stop offset="55%"  stopColor="#484848" />
                <stop offset="100%" stopColor="#0d0d0d" />
              </linearGradient>
            </defs>

            {/* Top crossbar */}
            <rect x={0} y={0} width={SVG_W} height={22} fill="#1a1a1a" />

            {/* Vertical bars */}
            {Array.from({ length: BAR_COUNT }, (_, i) => (
              <rect
                key={i}
                x={i * (BAR_W + GAP)}
                y={0}
                width={BAR_W}
                height={SVG_H}
                fill="url(#pbGrad)"
                rx={3}
              />
            ))}

            {/* Bottom crossbar */}
            <rect x={0} y={SVG_H - 22} width={SVG_W} height={22} fill="#1a1a1a" />
          </svg>
        </div>

        <div className="guilty-stamp" aria-hidden="true">GUILTY</div>
        <div
          className={`grade-stamp grade-stamp--${grade.toLowerCase()} grade-stamp--prison`}
          aria-label={`Corruption grade: ${grade} — ${sub}`}
        >
          {grade}
        </div>
      </div>
      <p className="grade-subtext">{sub}</p>

      {/* Dossier */}
      <div className="prison-dossier" role="status" aria-label="Final game stats">
        <div className="dossier-row">
          <span>CAUGHT ON ROUND</span>
          <span>{round}&thinsp;/&thinsp;20</span>
        </div>
        <div className="dossier-row">
          <span>CASH ACCUMULATED</span>
          <span>${displayCash.toLocaleString()}</span>
        </div>
        <div className="dossier-row">
          <span>FBI SUSPICION</span>
          <span>100&thinsp;/&thinsp;100</span>
        </div>
        {goldBars > 0 && (
          <div className="dossier-row">
            <span>GOLD BARS EARNED</span>
            <span>{goldBars}</span>
          </div>
        )}
        {lastChoice && (
          <div className="dossier-last-choice">
            <span>FINAL DECISION</span>
            <em>"{lastChoice}"</em>
          </div>
        )}
        <div className="dossier-sentence">
          SENTENCED: <strong>11 YEARS</strong>
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
