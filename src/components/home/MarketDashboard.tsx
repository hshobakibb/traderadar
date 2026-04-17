'use client'

import {
  MINI_GAUGES, MARKET_VERDICT, MARKET_SUMMARY,
  FG_VAL, SS_VAL,
} from '@/data/home-data'
import { toneColor } from '@/lib/types'

interface Props {
  onPickInstrument: (tk: string) => void
}

export default function MarketDashboard({ onPickInstrument }: Props) {
  /* Gauge math */
  const arcR = 72
  const arcCirc = Math.PI * arcR

  /* Fear & Greed */
  const fgOffset = arcCirc * (1 - FG_VAL / 100)
  const fgColor = FG_VAL >= 75 ? 'var(--gr)' : FG_VAL >= 50 ? 'var(--gd)' : 'var(--rd)'
  const fgWord = FG_VAL >= 75 ? 'Extreme Greed' : FG_VAL >= 55 ? 'Greedy' : FG_VAL >= 45 ? 'Neutral' : FG_VAL >= 25 ? 'Fearful' : 'Extreme Fear'

  /* Social Sentiment */
  const ssOffset = arcCirc * (1 - SS_VAL / 100)
  const ssColor = SS_VAL >= 70 ? '#A855F7' : SS_VAL >= 45 ? '#C084FC' : '#7C3AED'
  const ssWord = SS_VAL >= 75 ? 'Very Bullish' : SS_VAL >= 60 ? 'Bullish' : SS_VAL >= 45 ? 'Mixed' : SS_VAL >= 30 ? 'Bearish' : 'Very Bearish'

  return (
    <div className="mkt-dash" style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: 24, marginBottom: 20 }}>
      {/* Fear & Greed gauge */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>
          Fear &amp; Greed Index
        </div>
        <div className="gauge-wrap">
          <svg viewBox="0 0 180 100">
            <path className="g-bg" d="M 18 90 A 72 72 0 0 1 162 90" />
            <path className="g-fg" d="M 18 90 A 72 72 0 0 1 162 90" stroke={fgColor}
              strokeDasharray={arcCirc.toFixed(0)} strokeDashoffset={fgOffset.toFixed(0)} />
          </svg>
          <div className="g-label">
            <div className="g-val" style={{ color: fgColor }}>{FG_VAL}</div>
            <div className="g-word" style={{ color: fgColor }}>{fgWord}</div>
          </div>
        </div>
      </div>

      {/* Social Sentiment gauge */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>
          Social Sentiment
        </div>
        <div className="gauge-wrap">
          <svg viewBox="0 0 180 100">
            <path className="g-bg" d="M 18 90 A 72 72 0 0 1 162 90" />
            <path className="g-fg" d="M 18 90 A 72 72 0 0 1 162 90" stroke={ssColor}
              strokeDasharray={arcCirc.toFixed(0)} strokeDashoffset={ssOffset.toFixed(0)} />
          </svg>
          <div className="g-label">
            <div className="g-val" style={{ color: ssColor }}>{SS_VAL}</div>
            <div className="g-word" style={{ color: ssColor }}>{ssWord}</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: 'var(--mu)', textAlign: 'center', marginTop: 4, lineHeight: 1.35 }}>
          <b style={{ color: '#C084FC' }}>NVDA</b> &amp; <b style={{ color: '#C084FC' }}>Gold</b> dominating mentions.
          <br />Crypto sentiment at extreme fear. Equity tone bullish on ceasefire hopes.
        </div>
      </div>

      {/* Summary + Mini gauges */}
      <div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--ln)', borderRadius: 'var(--r2)', padding: '16px 20px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{MARKET_VERDICT}</div>
          <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: MARKET_SUMMARY }} />
        </div>

        <div className="mini-gauges">
          {MINI_GAUGES.map(m => {
            const clr = toneColor(m.tone)
            return (
              <div key={m.tk} className="mg" onClick={() => onPickInstrument(m.tk)} title={`View ${m.label} analysis`}>
                <div className="mg-label">{m.label}</div>
                <div className="mg-row">
                  <span className="mg-val" style={{ color: clr }}>{m.val}</span>
                  <span className="mg-chg" style={{ color: clr }}>{m.chg}</span>
                </div>
                <div className="mg-read">{m.read}</div>
                <div className="mg-bar">
                  <div className="mg-fill" style={{ width: `${m.pct}%`, background: clr }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

