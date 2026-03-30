import { useState, useRef } from 'react'

export interface AudioControls {
  muted:            boolean
  toggleMute:       () => void
  playCoin:         () => void
  playAlert:        () => void
  playGoldBar:      () => void
  playClang:        () => void
  playRoundAdvance: () => void
  playWinBig:       () => void
  playWinSmall:     () => void
  startDangerPulse: () => void
  stopDangerPulse:  () => void
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function getCtx(ref: React.MutableRefObject<AudioContext | null>): AudioContext {
  if (!ref.current) {
    ref.current = new AudioContext()
  }
  if (ref.current.state === 'suspended') {
    ref.current.resume()
  }
  return ref.current
}

/**
 * Schedule a single oscillator note.
 * @param attack  seconds to ramp from 0 → amp (0 = instant)
 */
function note(
  c: AudioContext,
  type: OscillatorType,
  freq: number,
  amp: number,
  startOffset: number,
  duration: number,
  attack = 0,
) {
  const t   = c.currentTime + startOffset
  const osc = c.createOscillator()
  const g   = c.createGain()
  osc.connect(g)
  g.connect(c.destination)

  osc.type = type
  osc.frequency.setValueAtTime(freq, t)

  if (attack > 0) {
    g.gain.setValueAtTime(0.001, t)
    g.gain.linearRampToValueAtTime(amp, t + attack)
  } else {
    g.gain.setValueAtTime(amp, t)
  }
  g.gain.exponentialRampToValueAtTime(0.001, t + duration)

  osc.start(t)
  osc.stop(t + duration + 0.02)
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAudio(): AudioControls {
  const [muted, setMuted] = useState(true)
  const ctxRef = useRef<AudioContext | null>(null)
  // Keep a stable ref to latest muted value so play fns don't stale-close
  const mutedRef              = useRef(muted)
  mutedRef.current            = muted
  const dangerIntervalRef     = useRef<ReturnType<typeof setInterval> | null>(null)

  function playCoin() {
    if (mutedRef.current) return
    const c = getCtx(ctxRef)
    // Two-tone rising ding — like a register opening
    note(c, 'sine', 1047, 0.28, 0.00, 0.14)
    note(c, 'sine', 1319, 0.28, 0.07, 0.20)
  }

  function playAlert() {
    if (mutedRef.current) return
    const c = getCtx(ctxRef)
    // Low sawtooth buzz — government surveillance vibes
    note(c, 'sawtooth', 110, 0.15, 0.00, 0.38)
    note(c, 'sawtooth',  82, 0.10, 0.04, 0.32)
  }

  function playGoldBar() {
    if (mutedRef.current) return
    const c = getCtx(ctxRef)
    // Triumphant C-major arpeggio with soft attack
    note(c, 'sine', 523, 0.20, 0.00, 0.85, 0.04)  // C5
    note(c, 'sine', 659, 0.18, 0.06, 0.80, 0.04)  // E5
    note(c, 'sine', 784, 0.15, 0.12, 0.75, 0.04)  // G5
  }

  function playClang() {
    if (mutedRef.current) return
    const c = getCtx(ctxRef)
    // Metallic prison-bar clang: two slightly detuned triangles create
    // a beating effect that mimics ringing metal
    note(c, 'triangle', 280, 0.32, 0.00, 0.80)
    note(c, 'triangle', 284, 0.28, 0.00, 0.75)
    note(c, 'sawtooth', 140, 0.13, 0.00, 0.28)
  }

  function playRoundAdvance() {
    if (mutedRef.current) return
    const c = getCtx(ctxRef)
    // Short, crisp page-flip click — neutral transition tone
    note(c, 'sine', 660, 0.10, 0.00, 0.06)
    note(c, 'sine', 880, 0.08, 0.04, 0.06)
  }

  function playWinBig() {
    if (mutedRef.current) return
    const c = getCtx(ctxRef)
    // Four-note triumphant fanfare — C-E-G-C' ascending
    note(c, 'sine', 523,  0.22, 0.00, 0.90, 0.03)  // C5
    note(c, 'sine', 659,  0.20, 0.12, 0.85, 0.03)  // E5
    note(c, 'sine', 784,  0.18, 0.24, 0.82, 0.03)  // G5
    note(c, 'sine', 1047, 0.24, 0.40, 1.20, 0.05)  // C6 — triumphant top note
  }

  function playWinSmall() {
    if (mutedRef.current) return
    const c = getCtx(ctxRef)
    // Descending "wah-wah" — anticlimactic resolution
    note(c, 'triangle', 440, 0.16, 0.00, 0.30)  // A4
    note(c, 'triangle', 330, 0.16, 0.18, 0.30)  // E4
    note(c, 'triangle', 220, 0.16, 0.36, 0.55)  // A3
  }

  function startDangerPulse() {
    if (dangerIntervalRef.current !== null) return  // already running
    dangerIntervalRef.current = setInterval(() => {
      if (mutedRef.current) return
      const c = getCtx(ctxRef)
      // Low ominous sub-bass pulse — surveillance heartbeat
      note(c, 'sine', 55, 0.06, 0, 0.18)
    }, 900)
  }

  function stopDangerPulse() {
    if (dangerIntervalRef.current !== null) {
      clearInterval(dangerIntervalRef.current)
      dangerIntervalRef.current = null
    }
  }

  function toggleMute() {
    if (mutedRef.current) {
      // Resuming from muted — ensure context exists and is running
      getCtx(ctxRef)
    } else {
      stopDangerPulse()
    }
    setMuted(m => !m)
  }

  return {
    muted, toggleMute,
    playCoin, playAlert, playGoldBar, playClang,
    playRoundAdvance, playWinBig, playWinSmall,
    startDangerPulse, stopDangerPulse,
  }
}
