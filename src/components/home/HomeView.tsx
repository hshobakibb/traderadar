'use client'

import { useState } from 'react'
import type { Tier } from '@/lib/types'
import { ALL_INS } from '@/data/instruments'
import {
  HEADLINES, SENTIMENT_WIDGETS, ECO_CALENDAR,
  SPOTLIGHTS, IDEAS,
  HOME_FLOW, HOME_COT,
} from '@/data/home-data'
import { toneColor } from '@/lib/types'
import MarketDashboard from './MarketDashboard'
import OpportunityView from '../opportunity/OpportunityView'

interface Props {
  tier: Tier
  onPickInstrument: (tk: string) => void
}

export default function HomeView({ tier, onPickInstrument }: Props) {
  const [homeTab, setHomeTab] = useState<'overview' | 'opportunity'>('overview')

  return (
    <div>
      {/* Tab navigation */}
      <div className="home-tabs">
        <div className={`home-tab${homeTab === 'overview' ? ' active' : ''}`} onClick={() => setHomeTab('overview')}>
          Overview
        </div>
        <div className={`home-tab${homeTab === 'opportunity' ? ' active' : ''}`} onClick={() => setHomeTab('opportunity')}>
          Opportunities
          {tier === 'free' && <span className="tab-badge pro">Pro</span>}
          {tier === 'pro' && <span className="tab-badge elite">50% Unlocked</span>}
        </div>
      </div>

      {homeTab === 'opportunity' ? (
        <OpportunityView tier={tier} onPickInstrument={onPickInstrument} />
      ) : (
        <OverviewTab tier={tier} onPickInstrument={onPickInstrument} />
      )}
    </div>
  )
}

/* ââ Overview Tab ââ */
function OverviewTab({ tier, onPickInstrument }: Props) {
  return (
    <>
      <MarketDashboard onPickInstrument={onPickInstrument} />

      {/* Flow + COT panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <FlowPanel />
        <CotPanel />
      </div>

      {/* Headlines + Right rail */}
      <div className="home-main-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28 }}>
        <div>
          <HeadlinesSection />
          <div className="sec-hdr" style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Today&apos;s Best Setups</h2>
            <span style={{ fontSize: 12, color: 'var(--mu)' }}>17 Apr 2026 &middot; 14:30 BST</span>
          </div>
          <SpotlightsSection onPickInstrument={onPickInstrument} />
          <IdeasSection onPickInstrument={onPickInstrument} />
        </div>
        <div className="home-rail">
          <SentimentRail />
          <TopScoresRail onPickInstrument={onPickInstrument} />
          <CalendarRail />
          <WatchlistRail onPickInstrument={onPickInstrument} />
        </div>
      </div>
    </>
  )
}

/* ââ Flow Panel ââ */
function FlowPanel() {
  return (
    <div className="flow-panel">
      <h3>Options Flow &mdash; Market Direction</h3>
      <div className="flow-cols">
        {Object.entries(HOME_FLOW).map(([key, f]) => (
          <div key={key} className="flow-col">
            <div className="fc-hdr">
              <span className="fc-tk">{f.name}</span>
              <span className="fc-dir bull">{f.bias}</span>
            </div>
            <div className="fc-stat"><span className="k">GEX (Gamma)</span><span className="v hi">{f.gex}</span></div>
            <div className="fc-stat"><span className="k">Put/Call Ratio</span><span className="v">{f.pcRatio}</span></div>
            <div className="fc-stat"><span className="k">Net Premium</span><span className="v hi">{f.netPremium}</span></div>
            <div className="fc-stat"><span className="k">Max Pain</span><span className="v">{f.maxPain}</span></div>
            <div className="fc-read" dangerouslySetInnerHTML={{ __html: `<b>What this means:</b> ${f.read}` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ââ COT Panel ââ */
function CotPanel() {
  return (
    <div className="cot-panel">
      <h3>COT Positioning &mdash; Who&apos;s Betting What</h3>
      <div className="cot-cols">
        {Object.entries(HOME_COT).map(([key, c]) => (
          <div key={key} className="cot-mini">
            <div className="cm-hdr">
              <span className="cm-tk">{c.name}</span>
              <span className="cm-bias bull">{c.bias}</span>
            </div>
            <div className="cm-bar-wrap">
              <div className="cm-bar-label"><span>Longs: {c.longPct}%</span><span>Shorts: {c.shortPct}%</span></div>
              <div className="cm-bar">
                <div className="long" style={{ width: `${c.longPct}%` }} />
                <div className="short" style={{ width: `${c.shortPct}%` }} />
              </div>
            </div>
            <div className="fc-stat"><span className="k">Managed Money</span><span className="v hi">{c.managed}</span></div>
            <div className="fc-stat"><span className="k">Dealers</span><span className="v lo">{c.dealers}</span></div>
            <div className="cm-read" dangerouslySetInnerHTML={{ __html: `<b>What this means:</b> ${c.read}` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ââ Headlines ââ */
function HeadlinesSection() {
  return (
    <div className="rail-box">
      <h3>Market Headlines &middot; Last 24 Hours</h3>
      {HEADLINES.map((n, i) => (
        <div key={i} className="hl-item">
          <span className="hl-time">{n.time}</span>
          <div className="hl-body">
            <div className="hl-text" dangerouslySetInnerHTML={{ __html: n.text }} />
            <div className="hl-ctx">{n.ctx}</div>
            <div className="hl-src">{n.src}</div>
          </div>
          <span className={`hl-tag ${n.tag}`}>{n.tag === 'hi' ? 'High Impact' : 'Medium'}</span>
        </div>
      ))}
    </div>
  )
}

/* ââ Spotlights ââ */
function SpotlightsSection({ onPickInstrument }: { onPickInstrument: (tk: string) => void }) {
  return (
    <>
      {SPOTLIGHTS.map(s => (
        <div key={s.tk} className={`spot-card ${s.dir}`} onClick={() => onPickInstrument(s.tk)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className={`spot-dir ${s.dir}`}>
              {s.dir === 'bull' ? '\u25B2 Buy Zone' : s.dir === 'bear' ? '\u25BC Sell Zone' : '\u25CF Wait'}
            </span>
            <span className="mono" style={{ fontWeight: 700, fontSize: 14 }}>{s.tk}</span>
            <span style={{ color: 'var(--mu)', fontSize: 12 }}>{s.name} &middot; {s.price}</span>
            <div style={{ marginLeft: 'auto', textAlign: 'center' }}>
              <div className={`mono ${s.score >= 7 ? 'hi' : s.score >= 5 ? 'md' : 'lo'}`} style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
                {s.score.toFixed(1)}
              </div>
              <div className={s.conf === 'High' ? 'hi' : 'md'} style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>{s.conf}</div>
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.35, marginBottom: 10 }}>{s.title}</div>
          <div style={{ color: 'var(--mu)', fontSize: 13, lineHeight: 1.55, marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: s.lede }} />
          {s.levels && (
            <div className="spot-levels" style={{ display: 'flex', gap: 16, fontSize: 12, fontFamily: 'var(--mono)' }}>
              <div className="lv buy"><span className="lbl">Buy</span>{s.levels.buy}</div>
              <div className="lv stop"><span className="lbl">Stop</span>{s.levels.stop}</div>
              <div className="lv tgt"><span className="lbl">Target</span>{s.levels.tgt}</div>
            </div>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12, fontSize: 12, fontWeight: 600, color: 'var(--cy)' }}>
            Full analysis &rarr;
          </span>
        </div>
      ))}
    </>
  )
}

/* ââ Ideas ââ */
function IdeasSection({ onPickInstrument }: { onPickInstrument: (tk: string) => void }) {
  return (
    <>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--mu)', textTransform: 'uppercase', letterSpacing: '.5px', margin: '16px 0 8px' }}>
        More Setups
      </div>
      {IDEAS.map(idea => (
        <div key={idea.tk} className="idea-row" onClick={() => onPickInstrument(idea.tk)}>
          <div className={`ir-dir ${idea.dir === 'bull' ? 'bull' : idea.dir === 'bear' ? 'bear' : 'wait'}`}
            style={{ width: 4, height: 32, borderRadius: 2, flexShrink: 0,
              background: idea.dir === 'bull' ? 'var(--gr)' : idea.dir === 'bear' ? 'var(--rd)' : 'var(--gd)' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>{idea.tk}</span>
            {' '}<span style={{ color: 'var(--mu)', fontSize: 11 }}>{idea.nm} &middot; {idea.pr}</span>
            <div style={{ color: 'var(--mu)', fontSize: 11, lineHeight: 1.4, marginTop: 2 }} dangerouslySetInnerHTML={{ __html: idea.body }} />
          </div>
          <span className={`mono ${idea.tone}`} style={{ fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
            {idea.sc.toFixed(1)}
          </span>
        </div>
      ))}
    </>
  )
}

/* ââ Sentiment Rail ââ */
function SentimentRail() {
  return (
    <div className="rail-box">
      <h3>Market Sentiment</h3>
      <div className="sent-row">
        {SENTIMENT_WIDGETS.map(w => {
          const clr = toneColor(w.tone)
          return (
            <div key={w.id} className="sent-mini">
              <div className="sm-label">{w.label}</div>
              <div className="sm-val" style={{ color: clr }}>{w.val}</div>
              <div className="sm-bar"><div className="sm-fill" style={{ width: `${w.pct}%`, background: clr }} /></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ââ Top Scores Rail ââ */
function TopScoresRail({ onPickInstrument }: { onPickInstrument: (tk: string) => void }) {
  const top12 = Object.values(ALL_INS).sort((a, b) => b.score - a.score).slice(0, 12)
  return (
    <div className="rail-box">
      <h3>Top Scores <span className="badge">Live</span></h3>
      {top12.map((ins, i) => (
        <div key={ins.tk} className="top-row" onClick={() => onPickInstrument(ins.tk)}>
          <span className="tr-rk">{i + 1}</span>
          <span className="tr-tk">{ins.tk}</span>
          <span className="tr-nm">{ins.name}</span>
          <span className={`tr-sc ${ins.tone}`}>{ins.score.toFixed(1)}</span>
        </div>
      ))}
    </div>
  )
}

/* ââ Calendar Rail ââ */
function CalendarRail() {
  return (
    <div className="rail-box">
      <h3>Economic Calendar <span className="badge" style={{ background: 'var(--rdA)', color: 'var(--rd)' }}>This Week</span></h3>
      {ECO_CALENDAR.map((c, i) => (
        <div key={i} className="cal-item">
          <div className="ci-when">{c.w}</div>
          <div className="ci-name">
            {c.n} <span className={`ci-tag ${c.f}`}>{c.f === 'crit' ? 'Critical' : c.f === 'high' ? 'High' : 'Med'}</span>
          </div>
          <div className="ci-note">{c.p}</div>
        </div>
      ))}
    </div>
  )
}

/* ââ Watchlist Rail ââ */
function WatchlistRail({ onPickInstrument }: { onPickInstrument: (tk: string) => void }) {
  // In production this reads from localStorage
  return (
    <div className="rail-box">
      <h3>Your Watchlist</h3>
      <div style={{ fontSize: 12, color: 'var(--mu)' }}>
        Click the star on any instrument to add it here.
      </div>
    </div>
  )
}
