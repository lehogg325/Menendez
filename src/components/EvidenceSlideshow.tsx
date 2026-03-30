import { useState, useEffect, useRef } from 'react'

export interface Slide {
  src:   string
  label: string
}

interface Props {
  slides:     Slide[]
  onComplete: () => void
}

const SLIDE_MS = 3000
const FADE_MS  = 450

const KB = ['kb-1', 'kb-2', 'kb-3', 'kb-4'] as const

export default function EvidenceSlideshow({ slides, onComplete }: Props) {
  const [idx,     setIdx]     = useState(0)
  const [visible, setVisible] = useState(true)
  const doneRef = useRef(onComplete)
  doneRef.current = onComplete

  // After SLIDE_MS, fade out
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), SLIDE_MS)
    return () => clearTimeout(t)
  }, [idx])

  // After fade completes, advance or finish
  useEffect(() => {
    if (visible) return
    const t = setTimeout(() => {
      const next = idx + 1
      if (next >= slides.length) {
        doneRef.current()
      } else {
        setIdx(next)
        setVisible(true)
      }
    }, FADE_MS)
    return () => clearTimeout(t)
  }, [visible, idx, slides.length])

  const slide   = slides[idx]
  const kbClass = KB[idx % KB.length]

  return (
    <div className="slideshow-screen" role="region" aria-label="Evidence slideshow">

      <div className={`slideshow-wrap ${visible ? 'ss-on' : 'ss-off'}`}>
        {/* key=idx forces img remount → CSS animation restarts */}
        <img
          key={idx}
          src={slide.src}
          alt={slide.label}
          className={`slideshow-img ${kbClass}`}
          draggable={false}
        />
        <div className="slideshow-vignette" aria-hidden="true" />

        <div className="exhibit-label" aria-hidden="true">
          {slide.label}
        </div>

        <div className="slide-counter" aria-hidden="true">
          {idx + 1}&thinsp;/&thinsp;{slides.length}
        </div>
      </div>

      <button
        className="ss-skip-btn"
        onClick={() => doneRef.current()}
        aria-label="Skip evidence slideshow"
      >
        SKIP ▶▶
      </button>
    </div>
  )
}
