'use client'

import { useState, useRef, useEffect } from 'react'
import type { Tier } from '@/lib/types'
import { ALL_INS } from '@/data/instruments'

interface NavProps {
  tier: Tier
  onTierChange: (t: Tier) => void
  onPickInstrument: (tk: string) => void
}

export default function Nav({ tier, onTierChange, onPickInstrument }: NavProps) {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const results = query.length > 0
    ? Object.values(ALL_INS)
        .filter(i => i.tk.toLowerCase().includes(query.toLowerCase()) || i.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 12)
    : []

  function handleSearch(val: string) {
    setQuery(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowResults(val.length > 0), 120)
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className="nav">
      <div className="nav-logo">Trade<span>Radar</span></div>

      <div className="nav-search" ref={searchRef} style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
        <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--mu)', width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search 140+ instruments..."
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => query.length > 0 && setShowResults(true)}
          style={{ width: '100%', paddingLeft: 40, height: 40, fontSize: 13, borderRadius: 20 }}
        />
        {showResults && results.length > 0 && (
          <div style={{
            position: 'absolute', top: 48, left: 0, right: 0,
            background: 'var(--bg2)', border: '1px solid var(--ln)',
            borderRadius: 'var(--r)', maxHeight: 360, overflowY: 'auto',
            zIndex: 50, boxShadow: 'var(--shadow2)',
          }}>
            {results.map(r => (
              <div
                key={r.tk}
                onClick={() => { onPickInstrument(r.tk); setShowResults(false); setQuery('') }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 14px', cursor: 'pointer', fontSize: 13,
                  transition: 'all .12s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span className="mono" style={{ fontWeight: 600, minWidth: 52, fontSize: 12 }}>{r.tk}</span>
                <span style={{ flex: 1, color: 'var(--mu)', fontSize: 12 }}>{r.name}</span>
                <span className={`mono ${r.tone}`} style={{ fontWeight: 700, fontSize: 12 }}>{r.score.toFixed(1)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 14, marginLeft: 'auto' }}>
        <div className="health-pill">
          <span className="health-dot" />
          Live
        </div>

        <div className="tier-btns">
          {(['free', 'pro', 'elite'] as Tier[]).map(t => (
            <button
              key={t}
              className={tier === t ? 'active' : ''}
              onClick={() => onTierChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="avatar">H</div>
      </div>
    </nav>
  )
}
