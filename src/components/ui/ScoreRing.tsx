'use client'

import { toneFromScore } from '@/lib/types'

interface ScoreRingProps {
  score: number
  size?: number
}

export default function ScoreRing({ score, size = 120 }: ScoreRingProps) {
  const r = size / 2 - 8
  const circ = 2 * Math.PI * r
  const pct = score / 10
  const offset = circ * (1 - pct)
  const tone = toneFromScore(score)

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="ring-bg" cx={size / 2} cy={size / 2} r={r} />
        <circle
          className={`ring-fg ${tone}`}
          cx={size / 2} cy={size / 2} r={r}
          strokeDasharray={circ.toFixed(1)}
          strokeDashoffset={offset.toFixed(1)}
        />
      </svg>
      <div className="ring-text">
        <span className={`ring-num ${tone}`}>{score.toFixed(1)}</span>
        <span className="ring-label">out of 10</span>
      </div>
    </div>
  )
}

