import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Senator from './Senator'
import DCSkylineBG from './DCSkylineBG'
import GoldBarStack from './GoldBarStack'
import type { Expression, AnimateType } from './Senator'
import type { Difficulty, GameOption, Scenario } from '../types/game'
import type { AudioControls } from '../hooks/useAudio'
import { BIG_WIN_CASH_DOLLARS } from '../hooks/useGameState'

const REACTION_MS    = 2500
const LABELS         = ['A', 'B', 'C', 'D'] as const
const DANGER_FBI     = 75

interface Props {
  round:          number
  cashInDollars:  number
  goldBars:       number
  streak:         number
  fbi:            number
  foreign:        number
  difficulty:     Difficulty
  scenario:       Scenario
  audio:          AudioControls
  onChoose:       (option: GameOption) => void
}

function deriveExpression(o: GameOption): { expression: Expression; animate: AnimateType } {
  if (o.fbi >= 12) return { expression: 'sweat',   animate: 'sweat' }
  if (o.fbi >= 8)  return { expression: 'nervous', animate: '' }
  if (o.cash > 0)  return { expression: 'smirk',   animate: '' }
  return                  { expression: 'neutral',  animate: '' }
}

// ---------------------------------------------------------------------------
// MeterBar
// ---------------------------------------------------------------------------
interface MeterBarProps {
  label:    string
  fullName: string
  value:    number
  color:    'red' | 'purple' | 'green'
  hidden:   boolean
}

function MeterBar({ label, fullName, value, color, hidden }: MeterBarProps) {
  const glow   = !hidden && value > 70
  const scaleX = hidden ? 0 : value / 100

  return (
    <div
      className="meter"
      role="meter"
      aria-label={hidden ? `${fullName}: hidden in hard mode` : `${fullName}: ${value} out of 100`}
      aria-valuenow={hidden ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span className="meter__label" aria-hidden="true">{label}</span>
      <div className="meter__track" aria-hidden="true">
        <div
          className={`meter-fill meter-fill--${color}${glow ? ' meter-fill--glow' : ''}`}
          style={{ transform: `scaleX(${scaleX})` }}
        />
      </div>
      <span className="meter__value" aria-hidden="true">
        {hidden ? '???' : `${value}/100`}
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// GameScreen
// ---------------------------------------------------------------------------
export default function GameScreen({
  round, cashInDollars, goldBars, streak,
  fbi, foreign, difficulty, scenario, audio, onChoose,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [flavor,      setFlavor]      = useState<string | null>(null)
  const [waiting,     setWaiting]     = useState(false)
  const [expression,  setExpression]  = useState<Expression>('neutral')
  const [senAnimate,  setSenAnimate]  = useState<AnimateType>('bob')
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingRef  = useRef<GameOption | null>(null)
  const onChooseRef = useRef(onChoose)
  onChooseRef.current = onChoose
  const audioRef    = useRef(audio)
  audioRef.current  = audio

  // Reset visual state before paint when a new round arrives
  useLayoutEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setSelectedIdx(null)
    setFlavor(null)
    setWaiting(false)
    setExpression('neutral')
    setSenAnimate('bob')
  }, [round])

  // Start/stop danger pulse based on FBI level
  useEffect(() => {
    if (fbi >= DANGER_FBI) {
      audioRef.current.startDangerPulse()
    } else {
      audioRef.current.stopDangerPulse()
    }
    return () => { audioRef.current.stopDangerPulse() }
  }, [fbi])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  function skipReaction() {
    if (!waiting || !pendingRef.current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    const option = pendingRef.current
    pendingRef.current = null
    onChooseRef.current(option)
    audioRef.current.playRoundAdvance()
  }

  function handleClick(option: GameOption, idx: number) {
    if (waiting) return

    // Detect gold bar milestone before state update fires
    const maxCash  = Math.max(...scenario.options.map(o => o.cash))
    const isGreedy = option.cash === maxCash
    const earnsBar = isGreedy

    let exp: Expression
    let anim: AnimateType
    if (earnsBar) {
      exp  = 'celebrate'
      anim = 'celebrate'
      audioRef.current.playGoldBar()
    } else {
      const derived = deriveExpression(option)
      exp  = derived.expression
      anim = derived.animate
      if (exp === 'smirk')                           audioRef.current.playCoin()
      else if (exp === 'sweat' || exp === 'nervous') audioRef.current.playAlert()
    }

    setSelectedIdx(idx)
    setFlavor(option.flavor)
    setExpression(exp)
    setSenAnimate(anim)
    setWaiting(true)
    pendingRef.current = option
    timerRef.current = setTimeout(() => {
      pendingRef.current = null
      onChooseRef.current(option)
      audioRef.current.playRoundAdvance()
    }, REACTION_MS)
  }

  const isHard    = difficulty === 'hard'
  const cashPct   = Math.min(Math.round((cashInDollars / BIG_WIN_CASH_DOLLARS) * 100), 100)
  const isDanger  = fbi >= DANGER_FBI

  return (
    <main
      className={[
        'game-screen',
        waiting   ? 'game-screen--skippable' : '',
        isDanger  ? 'game-screen--danger'    : '',
      ].filter(Boolean).join(' ')}
      onClick={skipReaction}
    >

      {/* ---- DC skyline background ---- */}
      <DCSkylineBG />

      {/* ---- Gold bar stack (bottom-right) ---- */}
      <GoldBarStack count={goldBars} />

      {/* ---- Top HUD bar ---- */}
      <div className="hud-top" role="status" aria-label={`Round ${round} of 20. Cash: $${cashInDollars.toLocaleString()}`}>
        <span className="hud-round" aria-hidden="true">Round {round}/20</span>
        <div className="hud-right">
          {goldBars > 0 && (
            <div
              className="hud-gold-bars"
              aria-label={`${goldBars} gold bar${goldBars !== 1 ? 's' : ''} earned`}
              title={`${goldBars} gold bar${goldBars !== 1 ? 's' : ''}`}
            >
              {Array.from({ length: Math.min(goldBars, 8) }, (_, i) => (
                <span key={i} className="gold-bar-pip" aria-hidden="true">AU</span>
              ))}
            </div>
          )}
          <span className="hud-cash" aria-hidden="true">${cashInDollars.toLocaleString()}</span>
          <button
            className="mute-btn"
            onClick={e => { e.stopPropagation(); audio.toggleMute() }}
            aria-label={audio.muted ? 'Unmute sound effects' : 'Mute sound effects'}
            aria-pressed={!audio.muted}
          >
            <span aria-hidden="true">{audio.muted ? '🔇' : '🔊'}</span>
          </button>
        </div>
      </div>

      {/* ---- Round progress bar ---- */}
      <div className="round-progress" aria-hidden="true">
        <div
          className="round-progress__fill"
          style={{ transform: `scaleX(${round / 20})` }}
        />
      </div>

      {/* ---- Meters ---- */}
      <div className="meters" aria-label="Game meters">
        <MeterBar label="FBI" fullName="FBI Suspicion"    value={fbi}     color="red"    hidden={isHard} />
        <MeterBar label="INT" fullName="Foreign Interest" value={foreign} color="purple" hidden={false}  />
        <MeterBar label="$$$" fullName="Cash Accumulated" value={cashPct} color="green"  hidden={false}  />
        {streak >= 3 && (
          <div className="streak-badge" role="status" aria-label={`Corruption streak: ${streak} in a row`}>
            🔥 Corruption streak: {streak}
          </div>
        )}
      </div>

      {/* ---- Senator ---- */}
      <div className="senator-center" aria-hidden="true">
        <Senator
          expression={expression}
          animate={waiting ? senAnimate : 'bob'}
          showGoldBar={waiting && expression === 'celebrate'}
        />
      </div>

      {/* ---- Scenario card — key=round triggers slide-in animation each round ---- */}
      <section key={round} className="scenario-card scenario-enter" aria-label={`Round ${round} scenario`}>
        <h2 className="scenario-title">{scenario.title}</h2>
        <p className="scenario-desc">{scenario.description}</p>

        {flavor && (
          <div key={flavor} className="flavor-toast" aria-hidden="true">
            <p>{flavor}</p>
          </div>
        )}
      </section>

      {/* Always-present live region announces flavor text to screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {flavor ?? ''}
      </div>

      {/* ---- Options ---- */}
      <div
        className="options"
        role="radiogroup"
        aria-label="Choose your action"
        aria-disabled={waiting}
      >
        {scenario.options.map((option, i) => (
          <button
            key={i}
            role="radio"
            aria-checked={selectedIdx === i}
            aria-label={`Option ${LABELS[i]}: ${option.text}`}
            disabled={waiting}
            onClick={e => { e.stopPropagation(); handleClick(option, i) }}
            className={[
              'option-btn',
              selectedIdx === i            ? 'option-btn--selected' : '',
              waiting && selectedIdx !== i ? 'option-btn--faded'    : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="option-badge" aria-hidden="true">{LABELS[i]}</span>
            <span className="option-text">{option.text}</span>
          </button>
        ))}
      </div>

    </main>
  )
}
