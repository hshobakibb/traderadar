'use client'

import { useState, useCallback } from 'react'
import type { Tier, Horizon, Instrument } from '@/lib/types'
import { ALL_INS } from '@/data/instruments'
import { INST } from '@/data/inst-data'
import { refreshInstrument } from '@/lib/refresh'
import Nav from '@/components/layout/Nav'
import Sidebar from '@/components/layout/Sidebar'
import HomeView from '@/components/home/HomeView'
import InstrumentView from '@/components/instrument/InstrumentView'

export default function DashboardPage() {
  const [tier, setTier] = useState<Tier>('pro')
  const [currentTk, setCurrentTk] = useState<string | null>(null)
  const [horizon, setHorizon] = useState<Horizon>('swing')
  const [view, setView] = useState<'analysis' | 'flow'>('analysis')

  /* Live-refreshed instruments keyed by ticker */
  const [liveInst, setLiveInst] = useState<Record<string, Instrument>>({})
  const [refreshing, setRefreshing] = useState<string | null>(null)
  const [refreshError, setRefreshError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Record<string, string>>({})

  const handlePickInstrument = useCallback((tk: string) => {
    setCurrentTk(tk)
    setView('analysis')
    setRefreshError(null)
  }, [])

  const handleGoHome = useCallback(() => {
    setCurrentTk(null)
    setRefreshError(null)
  }, [])

  const handleRefresh = useCallback(async (tk: string) => {
    const meta = ALL_INS[tk]
    if (!meta) return
    setRefreshing(tk)
    setRefreshError(null)
    try {
      const result = await refreshInstrument(tk, meta.name, meta.cat, meta.score)
      setLiveInst(prev => ({ ...prev, [tk]: result.instrument }))
      setLastRefresh(prev => ({ ...prev, [tk]: result.refreshedAt }))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Refresh failed'
      setRefreshError(msg)
    } finally {
      setRefreshing(null)
    }
  }, [])

  const meta = currentTk ? ALL_INS[currentTk] : null
  const inst = currentTk ? (liveInst[currentTk] || INST[currentTk] || null) : null

  return (
    <>
      <Nav tier={tier} onTierChange={setTier} onPickInstrument={handlePickInstrument} />
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', flex: 1, overflow: 'hidden' }}>
        <Sidebar currentTk={currentTk} onPickInstrument={handlePickInstrument} />
        <main className="main" style={{ overflowY: 'auto', height: 'calc(100vh - 64px)', padding: '24px 32px' }}>
          {currentTk === null ? (
            <HomeView tier={tier} onPickInstrument={handlePickInstrument} />
          ) : (
            <InstrumentView
              tk={currentTk}
              meta={meta!}
              inst={inst}
              tier={tier}
              horizon={horizon}
              view={view}
              onHorizonChange={setHorizon}
              onViewChange={setView}
              onGoHome={handleGoHome}
              onPickInstrument={handlePickInstrument}
              onRefresh={handleRefresh}
              isRefreshing={refreshing === currentTk}
              refreshError={refreshError}
              lastRefresh={lastRefresh[currentTk] || null}
            />
          )}
        </main>
      </div>
    </>
  )
    }
