import { useState, useEffect } from 'react'

/**
 * Animates a numeric value from 0 to `target` over `duration` ms
 * using a cubic ease-out curve and requestAnimationFrame.
 */
export function useCashCounter(target: number, duration = 1400): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target === 0) { setValue(0); return }
    const start = performance.now()
    let raf: number

    function tick(now: number) {
      const t      = Math.min((now - start) / duration, 1)
      const eased  = 1 - Math.pow(1 - t, 3)   // cubic ease-out
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}
