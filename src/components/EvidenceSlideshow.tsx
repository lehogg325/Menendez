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

const KB = ['kb-1', 'kb-2', 'kb-3', 'kb-4'] as const

export default function EvidenceSlideshow({ slides, onComplete }: Props) {
  const [idx, setIdx] = useState(0)
  const doneRef = useRef(onComplete)
  doneRef.current = onComplete

  // Advance to next slide after SLIDE_MS; photos stay in the pile
  useEffect(() => {
    const t = setTimeout(() => {
      const next = idx + 1
      if (next >= slides.length) {
        doneRef.current()
      } else {
        setIdx(next)
      }
    }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [idx, slides.length])

  return (
    <div className="slideshow-screen" role="region" aria-label="Evidence slideshow">

      <div className="photo-pile">
        {slides.slice(0, idx + 1).map((slide, i) => (
          <div
            key={i}
            className={`photo-frame photo-rot-${i % 7}`}
            style={{ zIndex: i + 1 }}
          >
            <div className="photo-img-wrap">
              <img
                src={slide.src}
                alt={slide.label}
                className={`photo-img ${KB[i % KB.length]}`}
                draggable={false}
              />
            </div>
            <div className="photo-caption">{slide.label}</div>
          </div>
        ))}
      </div>

      <div className="slide-counter" aria-hidden="true">
        {idx + 1}&thinsp;/&thinsp;{slides.length}
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
