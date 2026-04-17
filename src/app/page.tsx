'use client'

import { useState, useCallback } from 'react'
import type { Tier, Horizon } from '@/lib/types'
import { ALL_INS } from '@/data/instruments'
import { INST } from '@/data/inst-data'
import Nav from '@/components/layout/Nav'
import Sidebar from '@/components/layout/Sidebar'
import HomeView from '@/components/home/HomeView'
import InstrumentView from '@/components/instrument/InstrumentView'

export default function DashboardPage() {
  const [tier, setTier] = useState<Tier>('pro')
  const [currentTk, setCurrentTk] = useState<string | null>(null)
  const [horizon, setHorizon] = useState<Horizon>('swing')
  const [view, setView] = useState<'analysis' | 'flow'>('analysis')

  const handlePickInstrument = useCallback((tk: string) => {
    setCurrentTk(tk)
    setView('analysis')
  }, [])

  const handleGoHome = useCallback(() => {
    setCurrentTk(null)
  }, [])

  const meta = currentTk ? ALL_INS[currentTk] : null
  const inst = currentTk ? INST[currentTk] : null

  return (
    <>
      <Nav tier={tier} onTierChange={setTier} onPickInstrument={handlePickInstrument} />
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', flex: 1, overflow: 'hidden' }}>
        <Sidebar currentTk={currentTk} onPickInstrument={handlePickInstrument} />
        <main className="main" style={{ overflowY: 'auto', height: 'calc(100vh - 64px)', padding: '24px 32px' }}>
          {currentTk === null ? (
            <HomeView
              tier={tier}
              onPickInstrument={handlePickInstrument}
            />
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
            />
          )}
        </main>
      </div>
    </>
  )
}

