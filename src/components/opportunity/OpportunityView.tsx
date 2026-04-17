'use client'

import type { Tier } from '@/lib/types'
import { OPP_NARRATIVES, OPP_TRADES, OPP_RISKS } from '@/data/home-data'
import { toneFromScore } from '@/lib/types'

interface Props {
  tier: Tier
  onPickInstrument: (tk: string) => void
}

export default function OpportunityView({ tier, onPickInstrument }: Props) {
  if (tier === 'free') return <FreeOppView />
  if (tier === 'pro') return <ProOppView onPickInstrument={onPickInstrument} />
  return <EliteOppView onPickInstrument={onPickInstrument} />
}

/* ââ Free: blurred preview + upsell ââ */
function FreeOppView() {
  return (
    <div className="opp-locked">
      <div className="opp-blur">
        <NarrativesSection />
        <TradesSection onPickInstrument={() => {}} />
      </div>
      <div className="opp-lock-overlay">
        <div className="opp-upsell">
          <h3>Unlock the Opportunity Scanner</h3>
          <p className="opp-upsell-sub">
            Our AI engine scans social media, news, and institutional flows to find early-stage opportunities <b>before</b> they are fully priced.
          </p>
          <div className="opp-upsell-plans">
            <div className="upsell-plan">
              <div className="up-tier">Pro</div>
              <div className="up-price">$29<span>/mo</span></div>
              <div className="up-desc">Everything you need to find and act on opportunities early.</div>
              <ul className="up-features">
                <li><span className="check">&#10003;</span> 6 emerging narrative themes updated daily</li>
                <li><span className="check">&#10003;</span> Ranked trade ideas with entry, stop &amp; target</li>
                <li><span className="check">&#10003;</span> 5-factor composite scoring (0&ndash;100)</li>
                <li><span className="check">&#10003;</span> Social sentiment signals (X, Reddit)</li>
                <li><span className="check">&#10003;</span> Full 10-factor analysis on all 459 instruments</li>
                <li><span className="lock">&#128274;</span> <span style={{ color: 'var(--mu)' }}>Edge analysis</span></li>
                <li><span className="lock">&#128274;</span> <span style={{ color: 'var(--mu)' }}>Risk dashboard</span></li>
              </ul>
              <div className="up-btn secondary">Get Pro</div>
            </div>
            <div className="upsell-plan recommended">
              <div className="up-badge">Best Value</div>
              <div className="up-tier">Elite</div>
              <div className="up-price">$99<span>/mo</span></div>
              <div className="up-desc">The complete edge. See what pros see before everyone else.</div>
              <ul className="up-features">
                <li><span className="check">&#10003;</span> Everything in Pro</li>
                <li><span className="check">&#10003;</span> Edge analysis &mdash; why the market is mispricing</li>
                <li><span className="check">&#10003;</span> Risk dashboard &mdash; fake hype, crowded, macro</li>
                <li><span className="check">&#10003;</span> Smart money flow signals</li>
                <li><span className="check">&#10003;</span> Options flow, dealer gamma, put/call ratios</li>
                <li><span className="check">&#10003;</span> Priority access to new features</li>
              </ul>
              <div className="up-btn primary">Get Elite</div>
            </div>
          </div>
          <div className="opp-upsell-footer">Cancel anytime. No lock-in contracts. 7-day money-back guarantee.</div>
        </div>
      </div>
    </div>
  )
}

/* ââ Pro: narratives + trades visible, edge + risk blurred ââ */
function ProOppView({ onPickInstrument }: { onPickInstrument: (tk: string) => void }) {
  return (
    <div className="opp-page">
      <NarrativesSection />
      <TradesSection onPickInstrument={onPickInstrument} />
      <div className="pro-lock-section">
        <div className="pro-blur">
          <EdgeSection />
          <RisksSection />
        </div>
        <div className="pro-lock-overlay">
          <div className="cta-box">
            <h3>Unlock Full Analysis</h3>
            <p>Edge analysis and risk dashboard are available on the Elite plan.</p>
            <div className="cta-btn">Upgrade to Elite &mdash; $99/mo</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ââ Elite: everything ââ */
function EliteOppView({ onPickInstrument }: { onPickInstrument: (tk: string) => void }) {
  return (
    <div className="opp-page">
      <NarrativesSection />
      <TradesSection onPickInstrument={onPickInstrument} />
      <EdgeSection />
      <RisksSection />
    </div>
  )
}

/* ââ Shared sections ââ */
function NarrativesSection() {
  return (
    <div className="opp-section">
      <h2>Emerging Narratives <span className="opp-sub">What is moving and why</span></h2>
      <p className="opp-section-desc">
        These are the themes driving capital flows right now. We track social media, news, and institutional positioning to identify narratives <b>before</b> they become consensus.
      </p>
      <div className="narr-grid">
        {OPP_NARRATIVES.map((n, i) => (
          <div key={i} className="nc">
            <div className="nc-top">
              <span className={`nc-stage ${n.stage}`}>{n.stage}</span>
            </div>
            <div className="nc-title">{n.title}</div>
            <div className="nc-why" dangerouslySetInnerHTML={{ __html: n.why }} />
            <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5, marginBottom: 10, paddingTop: 8, borderTop: '1px solid var(--ln)' }}
              dangerouslySetInnerHTML={{ __html: `<b>Why now:</b> ${n.whyNow}` }} />
            <div className="nc-tickers">
              {n.tickers.map(tk => <span key={tk} className="nc-tk">{tk}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TradesSection({ onPickInstrument }: { onPickInstrument: (tk: string) => void }) {
  return (
    <div className="opp-section">
      <h2>Ranked Trade Ideas <span className="opp-sub">Sorted by composite score</span></h2>
      <div style={{ overflowX: 'auto' }}>
        <table className="trade-tbl">
          <thead>
            <tr>
              <th>#</th><th>Instrument</th><th>Sector</th><th>Horizon</th>
              <th>Narr</th><th>Macro</th><th>Sector</th><th>Timing</th><th>R:R</th>
              <th>Score</th><th>Entry</th><th>Target</th><th>Stop</th>
            </tr>
          </thead>
          <tbody>
            {OPP_TRADES.map((t, i) => {
              const tone = t.composite >= 80 ? 'hi' : t.composite >= 60 ? 'md' : 'lo'
              return (
                <tr key={t.tk} onClick={() => onPickInstrument(t.tk)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 700, color: 'var(--mu)' }}>{i + 1}</td>
                  <td>
                    <span className="mono" style={{ fontWeight: 700 }}>{t.tk}</span>
                    <br /><span style={{ fontSize: 11, color: 'var(--mu)' }}>{t.name}</span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--mu)' }}>{t.sector}</td>
                  <td><span style={{ fontSize: 11, fontWeight: 600, textTransform: 'capitalize' }}>{t.horizon}</span></td>
                  <td><ScorePill val={t.scores.narrative} /></td>
                  <td><ScorePill val={t.scores.macro} /></td>
                  <td><ScorePill val={t.scores.sector} /></td>
                  <td><ScorePill val={t.scores.timing} /></td>
                  <td><ScorePill val={t.scores.rr} /></td>
                  <td><span className={`sc-pill ${tone}`} style={{ fontSize: 14, fontWeight: 800 }}>{t.composite.toFixed(1)}</span></td>
                  <td className="mono" style={{ fontSize: 12 }}>{t.entry}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{t.target}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{t.stop}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ScorePill({ val }: { val: number }) {
  const tone = val >= 80 ? 'hi' : val >= 60 ? 'md' : 'lo'
  return <span className={`sc-pill ${tone}`}>{val}</span>
}

function EdgeSection() {
  return (
    <div className="opp-section">
      <h2>Edge Analysis <span className="opp-sub">Why the market is wrong</span></h2>
      {OPP_TRADES.map(t => (
        <div key={t.tk} className="edge-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="mono" style={{ fontWeight: 700 }}>{t.tk}</span>
            <span style={{ fontSize: 12, color: 'var(--mu)' }}>{t.name}</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--mu)', lineHeight: 1.55 }}>{t.whyWrong}</div>
        </div>
      ))}
    </div>
  )
}

function RisksSection() {
  const categories = [
    { key: 'fakeHype' as const, title: 'Fake Hype & FOMO' },
    { key: 'crowded' as const, title: 'Crowded Trades' },
    { key: 'macro' as const, title: 'Macro Risks' },
  ]

  return (
    <div className="opp-section">
      <h2>Risk Dashboard <span className="opp-sub">What could go wrong</span></h2>
      <div className="risk-grid">
        {categories.map(cat => (
          <div key={cat.key} className="risk-col">
            <h4>{cat.title}</h4>
            {OPP_RISKS[cat.key].map((r, i) => (
              <div key={i} className="risk-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{r.item}</span>
                  <span className={`ri-level ${r.level}`}>{r.level}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.5 }}>{r.note}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
