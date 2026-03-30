import { useEffect, useRef, useState } from 'react'

interface Props {
  count: number
}

export default function GoldBarStack({ count }: Props) {
  const prevCountRef = useRef(count)
  const [fallingIdx, setFallingIdx] = useState(-1)

  useEffect(() => {
    if (count > prevCountRef.current) {
      const newIdx = count - 1
      setFallingIdx(newIdx)
      const t = setTimeout(() => setFallingIdx(-1), 950)
      prevCountRef.current = count
      return () => clearTimeout(t)
    }
    prevCountRef.current = count
  }, [count])

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`gold-bar-brick${i === fallingIdx ? ' gold-bar-brick--falling' : ''}`}
          style={{ bottom: `${i * 24 + 12}px` }}
        >
          AU
        </div>
      ))}
    </>
  )
}
