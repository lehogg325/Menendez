import { useState } from 'react'
import type { LogEntry } from '../types/game'

interface Props {
  gameLog: LogEntry[]
}

export default function DecisionLog({ gameLog }: Props) {
  const [open, setOpen] = useState(false)

  if (gameLog.length === 0) return null

  return (
    <div className="decision-log">
      <button
        className="decision-log__toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="decision-log-list"
      >
        DECISION LOG ({gameLog.length} choices)
        <span className="decision-log__chevron" aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ol
          id="decision-log-list"
          className="decision-log__list"
          aria-label="Full decision history"
        >
          {gameLog.map(entry => (
            <li key={entry.round} className="decision-log__entry">
              <span className="dlog-round">R{entry.round}</span>
              <div className="dlog-body">
                <span className="dlog-title">{entry.scenarioTitle}</span>
                <span className="dlog-choice">{entry.choiceText}</span>
                <em className="dlog-flavor">{entry.flavor}</em>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
