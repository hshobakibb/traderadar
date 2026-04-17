'use client'

import { useState } from 'react'
import type { Instrument, InstrumentMeta, Tier, Horizon } from '@/lib/types'
import { toneFromScore, toneColor } from '@/lib/types'
import { FREE_TICKERS } from '@/data/instruments'
import ScoreRing from '@/components/ui/ScoreRing'

interface Props {
  tk: string
  meta: InstrumentMeta
  inst: Instrument | null
  tier: Tier
  horizon: Horizon
  view: 'analysis' | 'flow'
  onHorizonChange: (h: Horizon) => void
  onViewChange: (v: 'analysis' | 'flow') => void
  onGoHome: () => void
  onPickInstrument: (tk: string) => void
}

export default function InstrumentView({
  tk, meta, inst, tier, horizon, view,
  onHorizonChange, onViewChange, onGoHome, onPickInstrument,
}: Props) {
  const canAccess = tier === 'elite' || tier === 'pro' || (tier === 'free' && FREE_TICKERS.has(tk))

  if (!canAccess) {
    return <LockedInstrument meta={meta} />
  }

  if (!inst) {
    return <StubInstrument tk={tk} meta={meta} />
  }

  return <FullInstrument inst={inst} meta={meta} tier={tier} horizon={horizon} view={view}
    onHorizonChange={onHorizonChange} onViewChange={onViewChange} onGoHome={onGoHome} />
}

/* ââ Locked instrument (free tier, non-free ticker) ââ */
function LockedInstrument({ meta }: { meta: InstrumentMeta }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 8, fontFamily: 'var(--mono)' }} className={meta.tone}>
        {meta.score.toFixed(1)}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{meta.name}</div>
      <div style={{ fontSize: 13, color: 'var(--mu)', marginBottom: 24 }}>{meta.cat} &middot; {meta.group}</div>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--ln)', borderRadius: 'var(--r2)', padding: 32, maxWidth: 480, margin: '0 auto' }}>
        <h3 style={{ marginBottom: 8 }}>Upgrade to Pro</h3>
        <p style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.5, marginBottom: 16 }}>
          Get full 10-factor analysis, buy/stop/target levels, and real-time data for all 140+ instruments.
        </p>
        <div className="cta-btn">Upgrade to Pro &mdash; $29/mo</div>
      </div>
    </div>
  )
}

/* ââ Stub (no full data yet) ââ */
function StubInstrument({ tk, meta }: { tk: string; meta: InstrumentMeta }) {
  return (
    <div>
      <div className="inst-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div className="inst-name">{meta.name}</div>
            <div className="inst-meta">{meta.cat} &middot; {meta.group} &middot; <span className="mono">{tk}</span></div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ScoreRing score={meta.score} size={80} />
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--ln)', borderRadius: 'var(--r2)', padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Full analysis coming soon</div>
        <p style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.5 }}>
          We&apos;re connecting real-time data for {meta.name}. The score of {meta.score.toFixed(1)} is based on our current model.
          Full 10-factor breakdown, levels, zones, and catalysts will be available shortly.
        </p>
      </div>
    </div>
  )
}

/* ââ Full instrument ââ */
function FullInstrument({
  inst, meta, tier, horizon, view,
  onHorizonChange, onViewChange, onGoHome,
}: {
  inst: Instrument; meta: InstrumentMeta; tier: Tier;
  horizon: Horizon; view: 'analysis' | 'flow';
  onHorizonChange: (h: Horizon) => void;
  onViewChange: (v: 'analysis' | 'flow') => void;
  onGoHome: () => void;
}) {
  const [watchBtn, setWatchBtn] = useState(false)
  const tone = toneFromScore(inst.score)

  return (
    <div>
      {/* Back button */}
      <button onClick={onGoHome} style={{ fontSize: 12, color: 'var(--cy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
        &larr; Back to Home
      </button>

      {/* Header */}
      <div className="inst-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div className="inst-name">{inst.name}</div>
          <div className="inst-meta">{inst.category} &middot; {inst.exchange} &middot; <span className="mono">{inst.tk}</span></div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className={`inst-price ${inst.dir === 'up' ? 'hi' : 'lo'}`}>{inst.price}</span>
            <span className={`inst-chg ${inst.dir === 'up' ? 'hi' : 'lo'}`}>{inst.chg}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--mu)', marginTop: 4 }}>{inst.source} &middot; {inst.ts}</div>
        </div>
        <ScoreRing score={inst.score} size={120} />
      </div>

      {/* Horizon tabs */}
      <div className="hz-tabs">
        {(['intraday', 'swing', 'positional'] as Horizon[]).map(h => (
          <button key={h} className={`hz-tab${horizon === h ? ' active' : ''}`} onClick={() => onHorizonChange(h)}>
            {h.charAt(0).toUpperCase() + h.slice(1)}
          </button>
        ))}
      </div>

      {/* View tabs */}
      <div className="vw-tabs">
        <button className={`vw-tab${view === 'analysis' ? ' active' : ''}`} onClick={() => onViewChange('analysis')}>Analysis</button>
        <button className={`vw-tab${view === 'flow' ? ' active' : ''}`} onClick={() => onViewChange('flow')}>
          Options Flow {tier === 'free' && <span className="tab-badge pro">Elite</span>}
        </button>
      </div>

      {view === 'analysis' ? (
        <AnalysisTab inst={inst} tier={tier} />
      ) : (
        <FlowTab inst={inst} tier={tier} />
      )}

      {/* Action bar */}
      <div className="action-bar">
        <button className="btn-alert">Set Alert</button>
        <button
          className={`btn-watch${watchBtn ? ' watched' : ''}`}
          onClick={() => setWatchBtn(!watchBtn)}
        >
          {watchBtn ? '\u2605 Watchlist' : '\u2606 Watchlist'}
        </button>
      </div>
    </div>
  )
}

/* ââ Analysis tab ââ */
function AnalysisTab({ inst, tier }: { inst: Instrument; tier: Tier }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28 }}>
      <div>
        {/* Summary */}
        <div className="summary-card">
          {inst.summary.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>

        {/* Levels */}
        <div className="levels-grid">
          {inst.levels.map((lv, i) => {
            const cls = lv.label.toLowerCase().includes('buy') ? 'buy' : lv.label.toLowerCase().includes('stop') ? 'stop' : 'target'
            return (
              <div key={i} className={`level-card ${cls}`}>
                <div className="level-label">{lv.label}</div>
                <div className="level-price">{lv.price}</div>
                <div className="level-rationale">{lv.rationale}</div>
              </div>
            )
          })}
        </div>

        {/* Zones */}
        <div className="zones-section">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Supply &amp; Demand Zones</h3>
          {inst.zones.map((z, i) => (
            <div key={i} className="zone-item">
              <span className={`zone-type ${z.type}`}>{z.type}</span>
              <span className="zone-range">{z.range}</span>
              <span className="zone-strength">{z.strength}</span>
              <span className="zone-note">{z.note}</span>
            </div>
          ))}
        </div>

        {/* 10 Factors */}
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>10-Factor Breakdown</h3>
        <div className="factor-grid">
          {inst.factors.map((f, i) => {
            const ft = toneFromScore(f.score)
            return (
              <div key={i} className="factor-card">
                <div className="factor-top">
                  <span className="factor-name">{f.name}</span>
                  <span className={`factor-score ${ft}`}>{f.score.toFixed(1)}</span>
                </div>
                <div className="factor-desc">{f.desc}</div>
                <div className="factor-bar">
                  <div className={`factor-fill ${ft}`} style={{ width: `${f.score * 10}%` }} />
                </div>
                <div className="factor-expl" dangerouslySetInnerHTML={{ __html: f.expl }} />
              </div>
            )
          })}
        </div>

        {/* Catalysts */}
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Catalysts</h3>
        <div className="catalysts">
          <div className="cat-col up">
            <h4>Bullish Catalysts</h4>
            {inst.catalysts.up.map((c, i) => <div key={i} className="cat-item">{c}</div>)}
          </div>
          <div className="cat-col down">
            <h4>Bearish Catalysts</h4>
            {inst.catalysts.down.map((c, i) => <div key={i} className="cat-item">{c}</div>)}
          </div>
        </div>
      </div>

      {/* Right rail */}
      <div>
        {/* Score history */}
        <div className="rail-section">
          <h3>30-Day Score History</h3>
          <div className="hist-row">
            {inst.hist.map((h, i) => {
              const ht = toneFromScore(h)
              const color = toneColor(ht)
              return <div key={i} className="hist-bar" style={{ height: `${h * 10}%`, background: color }} />
            })}
          </div>
        </div>

        {/* COT */}
        {inst.cot && (
          <div className="rail-section">
            <h3>COT Positioning</h3>
            <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5, marginBottom: 10 }}
              dangerouslySetInnerHTML={{ __html: inst.cot.lead }} />
            {inst.cot.hasCot && inst.cot.rows.length > 0 && (
              <table className="cot-tbl">
                <thead><tr><th>Group</th><th>Long</th><th>Short</th><th>Net</th></tr></thead>
                <tbody>
                  {inst.cot.rows.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: 'var(--font)', fontWeight: 600 }}>{r.group}</td>
                      <td className="hi">{r.long}</td>
                      <td className="lo">{r.short}</td>
                      <td style={{ fontWeight: 700 }}>{r.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5, marginTop: 10 }}
              dangerouslySetInnerHTML={{ __html: inst.cot.meaning }} />
          </div>
        )}

        {/* Calendar */}
        <div className="rail-section">
          <h3>Upcoming Events</h3>
          {inst.calendar.map((c, i) => (
            <div key={i} className="cal-item">
              <div className="ci-when">{c.date}</div>
              <div className="ci-name">{c.event} <span className={`ci-tag ${c.impact === 'high' ? 'crit' : 'high'}`}>{c.impact === 'high' ? 'High' : 'Med'}</span></div>
              <div className="ci-note">{c.explain}</div>
            </div>
          ))}
        </div>

        {/* Seasonality */}
        <div className="rail-section">
          <h3>Seasonality</h3>
          <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
            <div><span style={{ fontSize: 10, color: 'var(--mu)' }}>Avg Return</span><div className="mono" style={{ fontWeight: 700 }}>{inst.season.avg}</div></div>
            <div><span style={{ fontSize: 10, color: 'var(--mu)' }}>Win Rate</span><div className="mono" style={{ fontWeight: 700 }}>{inst.season.win}</div></div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}>{inst.season.note}</div>
        </div>

        {/* Inventory */}
        {inst.inv && (
          <div className="rail-section">
            <h3>Physical / Inventory</h3>
            <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}>{inst.inv}</div>
          </div>
        )}

        {/* Macro */}
        <div className="rail-section">
          <h3>Macro Alignment</h3>
          <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}>{inst.macro}</div>
        </div>

        {/* Quick stats */}
        <div className="rail-section">
          <h3>Quick Stats</h3>
          <div className="stats-row">
            {inst.stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-k">{s.k}</span>
                <span className="stat-v">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ââ Flow tab (Elite only) ââ */
function FlowTab({ inst, tier }: { inst: Instrument; tier: Tier }) {
  if (tier !== 'elite') {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <h3 style={{ marginBottom: 8 }}>Options Flow is an Elite Feature</h3>
        <p style={{ fontSize: 13, color: 'var(--mu)', marginBottom: 16 }}>
          See institutional options flow, dealer gamma exposure, and put/call ratios.
        </p>
        <div className="cta-btn">Upgrade to Elite &mdash; $99/mo</div>
      </div>
    )
  }

  return (
    <div>
      {/* Flow table */}
      <div className="rail-section" style={{ marginBottom: 16 }}>
        <h3>Notable Options Flow</h3>
        <table className="flow-tbl">
          <thead>
            <tr><th>Contract</th><th>Expiry</th><th>Volume</th><th>Premium</th><th>Bias</th></tr>
          </thead>
          <tbody>
            {inst.flow.map((f, i) => (
              <tr key={i}>
                <td className="mono" style={{ fontWeight: 600 }}>{f.contract}</td>
                <td>{f.expiry}</td>
                <td className="mono">{f.volume}</td>
                <td className="mono">{f.premium}</td>
                <td className={f.bias === 'Bullish' ? 'bias-bull' : 'bias-bear'}>{f.bias}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GEX */}
      <div className="rail-section" style={{ marginBottom: 16 }}>
        <h3>Dealer Gamma Exposure (GEX)</h3>
        <div className={`mono ${inst.flowGex.val.startsWith('+') ? 'hi' : 'lo'}`} style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          {inst.flowGex.val}
        </div>
        <div style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: inst.flowGex.interp }} />
      </div>

      {/* Put/Call ratio */}
      <div className="rail-section">
        <h3>Put/Call Ratio</h3>
        <div className="mono" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          {inst.pcRatio.val}
        </div>
        <div style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: inst.pcRatio.interp }} />
      </div>
    </div>
  )
}
