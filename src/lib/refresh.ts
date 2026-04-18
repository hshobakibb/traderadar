import type { Instrument } from '@/lib/types'

/* ââââââââââââââââââââââââââââââââââââââââââââââ
   Client-side refresh â calls /api/refresh to get
   live analysis for any instrument
   ââââââââââââââââââââââââââââââââââââââââââââââ */

export interface RefreshResult {
  instrument: Instrument
  refreshedAt: string
}

export interface RefreshError {
  error: string
}

export async function refreshInstrument(
  tk: string,
  name: string,
  category: string,
  score: number,
): Promise<RefreshResult> {
  const res = await fetch('/api/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tk, name, category, score }),
  })

  if (!res.ok) {
    const err: RefreshError = await res.json()
    throw new Error(err.error || `API returned ${res.status}`)
  }

  return res.json()
}
