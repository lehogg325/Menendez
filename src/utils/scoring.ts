/**
 * Corruption grade — synthesizes cash, foreign reach, gold bars, and FBI
 * evasion into a single letter grade shown on all end screens.
 *
 * Weights:
 *   Cash       40 pts  (scaled to $800K big-win threshold; can exceed if over)
 *   Foreign    25 pts  (0–100 foreign interest meter)
 *   Gold Bars  20 pts  (capped at 4 bars for full score)
 *   Evasion    15 pts  (remaining FBI headroom — 0 = caught / near-caught)
 */
export function corruptionGrade(
  cashInDollars: number,
  foreign: number,
  goldBars: number,
  fbi: number,
): string {
  const cashScore    = Math.min(cashInDollars / 800_000, 1.25) * 40
  const foreignScore = (foreign / 100) * 25
  const goldScore    = Math.min(goldBars / 4, 1) * 20
  const evasionScore = Math.max(0, (100 - fbi) / 100) * 15
  const total        = cashScore + foreignScore + goldScore + evasionScore

  if (total >= 88) return 'S'
  if (total >= 72) return 'A'
  if (total >= 55) return 'B'
  if (total >= 38) return 'C'
  return 'D'
}

export function gradeSubtext(grade: string): string {
  switch (grade) {
    case 'S': return 'Legendary Corruption'
    case 'A': return 'Career Criminal'
    case 'B': return 'Dedicated Grifter'
    case 'C': return 'Amateur Hour'
    case 'D': return 'Disappointing'
    default:  return ''
  }
}
