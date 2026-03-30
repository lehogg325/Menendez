import { useState, useMemo } from 'react'
import Senator from './Senator'
import DCSkylineBG from './DCSkylineBG'
import type { Difficulty } from '../types/game'

interface TitleScreenProps {
  onStart: (difficulty: Difficulty) => void
}

interface StarDot {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

function useStars(count: number): StarDot[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.8,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const stars = useStars(45)

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-5 py-10"
      style={{ background: '#040201' }}
    >
      {/* DC skyline background */}
      <DCSkylineBG />

      {/* Star field */}
      {stars.map(s => (
        <span
          key={s.id}
          className="star-dot"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md gap-6 text-center">

        {/* Senator with sway wrapper */}
        <div className="sen-sway title-senator">
          <Senator expression="neutral" animate="bob" />
        </div>

        {/* Title */}
        <h1 className="game-title">
          18 U.S.C. § 201
        </h1>

        {/* Subtitle */}
        <p
          className="leading-relaxed"
          style={{ color: 'var(--c-text-dim)', fontSize: '0.97rem', maxWidth: 360 }}
        >
          Play as Senator Bob Menendez. Grab cash, dodge the FBI,
          and try to retire before the feds catch up.{' '}
          <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>
            20 rounds. Infinite greed.
          </span>
        </p>

        {/* Difficulty toggles */}
        <div className="flex gap-3 w-full">
          {(['easy', 'hard'] as const).map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              aria-pressed={difficulty === d}
              className={`diff-btn${difficulty === d ? ' diff-btn--active' : ''}`}
            >
              <span className="diff-btn__label">
                {d === 'easy' ? 'EASY' : 'HARD'}
              </span>
              <span className="diff-btn__desc">
                {d === 'easy'
                  ? 'FBI suspicion meter visible — play it strategic'
                  : 'FBI meter hidden — fly blind, senator'}
              </span>
            </button>
          ))}
        </div>

        {/* Start button */}
        <button className="start-btn" onClick={() => onStart(difficulty)}>
          START SCHEMING
        </button>

        {/* Disclaimer */}
        <p
          className="leading-snug"
          style={{ color: 'var(--c-text-dim)', fontSize: '0.68rem', opacity: 0.55 }}
        >
          A satirical game. All scenarios are fictional.<br />
          Any resemblance to actual corruption is entirely intentional.
        </p>
      </div>
    </div>
  )
}
