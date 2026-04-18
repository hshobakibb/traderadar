'use client'

import { useState, useEffect } from 'react'
import type { Instrument, InstrumentMeta, Tier, Horizon } from '@/lib/types'
import { toneFromScore, toneColor } from '@/lib/types'
import { FREE_TICKERS } from '@/data/instruments'
import { isWatched, toggleWatch } from '@/lib/store'
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
  onRefresh?: (tk: string) => void
  isRefreshing?: boolean
  refreshError?: string | null
  lastRefresh?: string | null
}

export default function InstrumentView({
  tk, meta, inst, tier, horizon, view,
  onHorizonChange, onViewChange, onGoHome, onPickInstrument,
  onRefresh, isRefreshing, refreshError, lastRefresh,
}: Props) {
  const canAccess = tier === 'elite' || tier === 'pro' || (tier === 'free' && FREE_TICKERS.has(tk))
  if (!canAccess) return <LockedInstrument meta={meta} />
  if (!inst) return <StubInstrument tk={tk} meta={meta} onGoHome={onGoHome} onRefresh={onRefresh} isRefreshing={isRefreshing} refreshError={refreshError} />
  return <FullInstrument inst={inst} meta={meta} tier={tier} horizon={horizon} view={view}
    onHorizonChange={onHorizonChange} onViewChange={onViewChange} onGoHome={onGoHome}
    onRefresh={onRefresh} isRefreshing={isRefreshing} refreshError={refreshError} lastRefresh={lastRefresh} />
}

function LockedInstrument({ meta }: { meta: InstrumentMeta }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 8, fontFamily: 'var(--mono)' }} className={meta.tone}>{meta.score.toFixed(1)}</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{meta.name}</div>
      <div style={{ fontSize: 13, color: 'var(--mu)', marginBottom: 24 }}>{meta.cat} &middot; {meta.group}</div>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--ln)', borderRadius: 'var(--r2)', padding: 32, maxWidth: 480, margin: '0 auto' }}>
        <h3 style={{ marginBottom: 8 }}>Upgrade to Pro</h3>
        <p style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.5, marginBottom: 16 }}>Get full 10-factor analysis, buy/stop/target levels, and real-time data for all 140+ instruments.</p>
        <div className="cta-btn">Upgrade to Pro &mdash; $29/mo</div>
      </div>
    </div>
  )
}

function StubInstrument({ tk, meta, onGoHome, onRefresh, isRefreshing, refreshError }: {
  tk: string; meta: InstrumentMeta; onGoHome: () => void;
  onRefresh?: (tk: string) => void; isRefreshing?: boolean; refreshError?: string | null;
}) {
  return (
    <div>
      <button onClick={onGoHome} style={{ fontSize: 12, color: 'var(--cy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>&larr; Back to Home</button>
      <div className="inst-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div className="inst-name">{meta.name}</div>
            <div className="inst-meta">{meta.cat} &middot; {meta.group} &middot; <span className="mono">{tk}</span></div>
          </div>
          <div style={{ marginLeft: 'auto' }}><ScoreRing score={meta.score} size={80} /></div>
        </div>
      </div>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--ln)', borderRadius: 'var(--r2)', padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Full analysis coming soon</div>
        <p style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.5, marginBottom: 20 }}>We&apos;re connecting real-time data for {meta.name}. Score of {meta.score.toFixed(1)} is based on our current model.</p>
        {onRefresh && (
          <div>
            <button className="refresh-btn" onClick={() => onRefresh(tk)} disabled={isRefreshing}
              style={{ background: isRefreshing ? 'var(--bg3)' : 'linear-gradient(135deg, var(--cy) 0%, #0e9488 100%)', color: isRefreshing ? 'var(--mu)' : '#fff', border: 'none', borderRadius: 'var(--r)', padding: '14px 32px', fontSize: 14, fontWeight: 700, cursor: isRefreshing ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all .2s', minWidth: 240, justifyContent: 'center' }}>
              {isRefreshing ? (<><span className="refresh-spinner" />Generating live analysis...</>) : (<><span style={{ fontSize: 16 }}>&#9889;</span>Generate Live Analysis</>)}
            </button>
            <div style={{ fontSize: 11, color: 'var(--mu)', marginTop: 8 }}>Powered by Claude AI &mdash; generates full 10-factor analysis in real-time</div>
            {refreshError && <div style={{ fontSize: 12, color: 'var(--rd)', marginTop: 8, padding: '8px 16px', background: 'rgba(239,91,91,.1)', borderRadius: 'var(--r)' }}>{refreshError}</div>}
          </div>
        )}
      </div>
    </div>
  )
                           }

function FullInstrument({ inst, meta, tier, horizon, view, onHorizonChange, onViewChange, onGoHome, onRefresh, isRefreshing, refreshError, lastRefresh }: {
  inst: Instrument; meta: InstrumentMeta; tier: Tier; horizon: Horizon; view: 'analysis' | 'flow';
  onHorizonChange: (h: Horizon) => void; onViewChange: (v: 'analysis' | 'flow') => void; onGoHome: () => void;
  onRefresh?: (tk: string) => void; isRefreshing?: boolean; refreshError?: string | null; lastRefresh?: string | null;
}) {
  const [watched, setWatched] = useState(false)
  const [expandedFactors, setExpandedFactors] = useState<Record<number, boolean>>({0: true, 1: true, 2: true})
  useEffect(() => { setWatched(isWatched(inst.tk)) }, [inst.tk])

  return (
    <div>
      <button onClick={onGoHome} style={{ fontSize: 12, color: 'var(--cy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>&larr; Back to Home</button>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ScoreRing score={inst.score} size={120} />
          {onRefresh && (
            <button onClick={() => onRefresh(inst.tk)} disabled={isRefreshing}
              style={{ background: isRefreshing ? 'var(--bg3)' : 'var(--bg2)', border: '1px solid var(--ln)', borderRadius: 'var(--r)', padding: '6px 14px', fontSize: 11, fontWeight: 600, color: isRefreshing ? 'var(--mu)' : 'var(--cy)', cursor: isRefreshing ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all .2s' }}>
              {isRefreshing ? (<><span className="refresh-spinner-sm" />Refreshing...</>) : (<><span style={{ fontSize: 13 }}>&#9889;</span>Live Refresh</>)}
            </button>
          )}
          {lastRefresh && <div style={{ fontSize: 9, color: 'var(--mu)' }}>AI-generated &middot; {new Date(lastRefresh).toLocaleTimeString()}</div>}
          {refreshError && <div style={{ fontSize: 10, color: 'var(--rd)' }}>{refreshError}</div>}
        </div>
      </div>
      <div className="hz-tabs">
        {(['intraday', 'swing', 'positional'] as Horizon[]).map(h => (
          <button key={h} className={`hz-tab${horizon === h ? ' active' : ''}`} onClick={() => onHorizonChange(h)}>{h.charAt(0).toUpperCase() + h.slice(1)}</button>
        ))}
      </div>
      <div className="vw-tabs">
        <button className={`vw-tab${view === 'analysis' ? ' active' : ''}`} onClick={() => onViewChange('analysis')}>Analysis</button>
        <button className={`vw-tab${view === 'flow' ? ' active' : ''}`} onClick={() => onViewChange('flow')}>Options Flow {tier === 'free' && <span className="tab-badge pro">Elite</span>}</button>
      </div>
      {view === 'analysis' ? <AnalysisTab inst={inst} tier={tier} expandedFactors={expandedFactors} setExpandedFactors={setExpandedFactors} /> : <FlowTab inst={inst} tier={tier} />}
      <div className="action-bar">
        <button className="btn-alert">Set Alert</button>
        <button className={`btn-watch${watched ? ' watched' : ''}`} onClick={() => { toggleWatch(inst.tk); setWatched(!watched) }}>{watched ? '\u2605 Watchlist' : '\u2606 Watchlist'}</button>
      </div>
    </div>
  )
                }

function AnalysisTab({ inst, tier, expandedFactors, setExpandedFactors }: {
  inst: Instrument; tier: Tier;
  expandedFactors: Record<number, boolean>;
  setExpandedFactors: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28 }}>
      <div>
        <div className="summary-card">{inst.summary.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}</div>
        <div className="levels-grid">
          {inst.levels.map((lv, i) => {
            const cls = lv.label.toLowerCase().includes('buy') ? 'buy' : lv.label.toLowerCase().includes('stop') ? 'stop' : 'target'
            return (<div key={i} className={`level-card ${cls}`}><div className="level-label">{lv.label}</div><div className="level-price">{lv.price}</div><div className="level-rationale">{lv.rationale}</div></div>)
          })}
        </div>
        <div className="zones-section">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Supply &amp; Demand Zones</h3>
          {inst.zones.map((z, i) => (<div key={i} className="zone-item"><span className={`zone-type ${z.type}`}>{z.type}</span><span className="zone-range">{z.range}</span><span className="zone-strength">{z.strength}</span><span className="zone-note">{z.note}</span></div>))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>10-Factor Breakdown</h3>
          <button onClick={() => { const allOpen = inst.factors.every((_, i) => expandedFactors[i]); const next: Record<number, boolean> = {}; inst.factors.forEach((_, i) => { next[i] = !allOpen }); setExpandedFactors(next) }} style={{ fontSize: 11, color: 'var(--cy)', fontWeight: 600 }}>{inst.factors.every((_, i) => expandedFactors[i]) ? 'Collapse all' : 'Expand all'}</button>
        </div>
        <div className="factor-grid">
          {inst.factors.map((f, i) => {
            const ft = toneFromScore(f.score)
            const open = expandedFactors[i] ?? false
            return (
              <div key={i} className="factor-card" style={{ cursor: 'pointer' }} onClick={() => setExpandedFactors(prev => ({ ...prev, [i]: !prev[i] }))}>
                <div className="factor-top">
                  <span className="factor-name">{f.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={`factor-score ${ft}`}>{f.score.toFixed(1)}</span>
                    <span style={{ fontSize: 10, color: 'var(--mu)', transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>\u25BC</span>
                  </div>
                </div>
                <div className="factor-bar"><div className={`factor-fill ${ft}`} style={{ width: `${f.score * 10}%` }} /></div>
                {open && (<><div className="factor-desc" style={{ marginTop: 8 }}>{f.desc}</div><div className="factor-expl" dangerouslySetInnerHTML={{ __html: f.expl }} /></>)}
              </div>
            )
          })}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Catalysts</h3>
        <div className="catalysts">
          <div className="cat-col up"><h4>Bullish Catalysts</h4>{inst.catalysts.up.map((c, i) => <div key={i} className="cat-item">{c}</div>)}</div>
          <div className="cat-col down"><h4>Bearish Catalysts</h4>{inst.catalysts.down.map((c, i) => <div key={i} className="cat-item">{c}</div>)}</div>
        </div>
      </div>
      <div>
        <div className="rail-section"><h3>30-Day Score History</h3><div className="hist-row">{inst.hist.map((h, i) => { const ht = toneFromScore(h); const color = toneColor(ht); return <div key={i} className="hist-bar" style={{ height: `${h * 10}%`, background: color }} /> })}</div></div>
        {inst.cot && (<div className="rail-section"><h3>COT Positioning</h3><div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: inst.cot.lead }} />{inst.cot.hasCot && inst.cot.rows.length > 0 && (<table className="cot-tbl"><thead><tr><th>Group</th><th>Long</th><th>Short</th><th>Net</th></tr></thead><tbody>{inst.cot.rows.map((r, i) => (<tr key={i}><td style={{ fontWeight: 600 }}>{r.group}</td><td className="hi">{r.long}</td><td className="lo">{r.short}</td><td style={{ fontWeight: 700 }}>{r.net}</td></tr>))}</tbody></table>)}<div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5, marginTop: 10 }} dangerouslySetInnerHTML={{ __html: inst.cot.meaning }} /></div>)}
        <div className="rail-section"><h3>Upcoming Events</h3>{inst.calendar.map((c, i) => (<div key={i} className="cal-item"><div className="ci-when">{c.date}</div><div className="ci-name">{c.event} <span className={`ci-tag ${c.impact === 'high' ? 'crit' : 'high'}`}>{c.impact === 'high' ? 'High' : 'Med'}</span></div><div className="ci-note">{c.explain}</div></div>))}</div>
        <div className="rail-section"><h3>Seasonality</h3><div style={{ display: 'flex', gap: 16, marginBottom: 8 }}><div><span style={{ fontSize: 10, color: 'var(--mu)' }}>Avg Return</span><div className="mono" style={{ fontWeight: 700 }}>{inst.season.avg}</div></div><div><span style={{ fontSize: 10, color: 'var(--mu)' }}>Win Rate</span><div className="mono" style={{ fontWeight: 700 }}>{inst.season.win}</div></div></div><div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}>{inst.season.note}</div></div>
        {inst.inv && (<div className="rail-section"><h3>Physical / Inventory</h3><div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}>{inst.inv}</div></div>)}
        <div className="rail-section"><h3>Macro Alignment</h3><div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}>{inst.macro}</div></div>
        <div className="rail-section"><h3>Quick Stats</h3><div className="stats-row">{inst.stats.map((s, i) => (<div key={i} className="stat-item"><span className="stat-k">{s.k}</span><span className="stat-v">{s.v}</span></div>))}</div></div>
      </div>
    </div>
  )
}

function FlowTab({ inst, tier }: { inst: Instrument; tier: Tier }) {
  if (tier !== 'elite') {
    return (<div style={{ textAlign: 'center', padding: 40 }}><h3 style={{ marginBottom: 8 }}>Options Flow is an Elite Feature</h3><p style={{ fontSize: 13, color: 'var(--mu)', marginBottom: 16 }}>See institutional options flow, dealer gamma exposure, and put/call ratios.</p><div className="cta-btn">Upgrade to Elite &mdash; $99/mo</div></div>)
  }
  return (
    <div>
      <div className="rail-section" style={{ marginBottom: 16 }}><h3>Notable Options Flow</h3><table className="flow-tbl"><thead><tr><th>Contract</th><th>Expiry</th><th>Volume</th><th>Premium</th><th>Bias</th></tr></thead><tbody>{inst.flow.map((f, i) => (<tr key={i}><td className="mono" style={{ fontWeight: 600 }}>{f.contract}</td><td>{f.expiry}</td><td className="mono">{f.volume}</td><td className="mono">{f.premium}</td><td className={f.bias === 'Bullish' ? 'bias-bull' : 'bias-bear'}>{f.bias}</td></tr>))}</tbody></table></div>
      <div className="rail-section" style={{ marginBottom: 16 }}><h3>Dealer Gamma Exposure (GEX)</h3><div className={`mono ${inst.flowGex.val.startsWith('+') ? 'hi' : 'lo'}`} style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{inst.flowGex.val}</div><div style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: inst.flowGex.interp }} /></div>
      <div className="rail-section"><h3>Put/Call Ratio</h3><div className="mono" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{inst.pcRatio.val}</div><div style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: inst.pcRatio.interp }} /></div>
    </div>
  )
                                                                                                                                                     }
