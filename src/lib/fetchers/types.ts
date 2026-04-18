export interface RawPrice {
  price: number
  change: number
  changePct: number
  volume: number
  high52w: number
  low52w: number
  marketCap?: number
  pe?: number
  atr?: number
  source: string
  ts: string
}

export interface RawHeadline {
  title: string
  url: string
  source: string // 'Yahoo' | 'Barchart' | 'Investing.com' | 'ForexLive' | 'CoinDesk'
  time: string
  sentiment?: 'positive' | 'negative' | 'neutral'
}

export interface RawSentiment {
  bullish: number // 0-100
  bearish: number // 0-100
  volume: number // message count
  source: string // 'StockTwits' | 'Fear&Greed'
}

export interface RawCot {
  reportDate: string
  commercial: { long: number; short: number; net: number }
  nonCommercial: { long: number; short: number; net: number }
  speculator: { long: number; short: number; net: number }
}

export interface RawMacro {
  indicator: string
  value: number
  date: string
  source: string
}

export interface RawCalendarEvent {
  date: string
  event: string
  impact: 'high' | 'medium' | 'low'
  actual?: string
  forecast?: string
  previous?: string
}

export interface RawOptionsFlow {
  strike: number
  expiry: string
  type: 'call' | 'put'
  volume: number
  openInterest: number
  impliedVol?: number
}

export interface RawDataBundle {
  tk: string
  name: string
  category: string
  price: RawPrice | null
  headlines: RawHeadline[]
  sentiment: RawSentiment | null
  cot: RawCot | null
  macro: RawMacro[]
  calendar: RawCalendarEvent[]
  options: RawOptionsFlow[]
  fearGreed: { value: number; label: string; source: string } | null
  fetchedAt: string
}
