/* ââ Client-side state management ââ */

import type { Tier, Horizon } from './types'

/* Current app state â in production this would use Zustand or context */
export const defaultState = {
  tier: 'pro' as Tier,
  currentTk: null as string | null,
  horizon: 'swing' as Horizon,
  view: 'analysis' as 'analysis' | 'flow',
  homeTab: 'overview' as 'overview' | 'opportunity',
  sidebarOpen: {} as Record<string, boolean>,
}

/* Watchlist (localStorage) */
export function getWatch(): string[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem('tr_watch') || '[]') }
  catch { return [] }
}

export function isWatched(tk: string): boolean {
  return getWatch().includes(tk)
}

export function toggleWatch(tk: string): boolean {
  const w = getWatch()
  const i = w.indexOf(tk)
  if (i >= 0) w.splice(i, 1)
  else w.push(tk)
  localStorage.setItem('tr_watch', JSON.stringify(w))
  return w.includes(tk)
}
