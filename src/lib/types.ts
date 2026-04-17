/* ââ TradeRadar Type Definitions ââ */

export type Tone = 'hi' | 'md' | 'lo'
export type Tier = 'free' | 'pro' | 'elite'
export type Horizon = 'intraday' | 'swing' | 'positional'
export type Confidence = 'High' | 'Medium' | 'Low'
export type Direction = 'up' | 'down'
export type ZoneType = 'demand' | 'supply'
export type FlowBias = 'Bullish' | 'Bearish' | 'Neutral'

/* ââ Category tree ââ */
export type InstrumentRow = [string, string, number, Tone] // [ticker, name, score, tone]

export interface Group {
  name: string
  rows: InstrumentRow[]
}

export interface Category {
  id: string
  name: string
  groups: Group[]
}

/* ââ Flat instrument lookup ââ */
export interface InstrumentMeta {
  tk: string
  name: string
  score: number
  tone: Tone
  cat: string
  group: string
  catId: string
}

/* ââ Full instrument payload ââ */
export interface Level {
  label: string
  price: string
  rationale: string
}

export interface Factor {
  name: string
  score: number
  desc: string
  expl: string
}

export interface Zone {
  type: ZoneType
  range: string
  strength: string
  note: string
}

export interface Catalysts {
  up: string[]
  down: string[]
}

export interface CotRow {
  group: string
  long: string
  short: string
  net: string
}

export interface CotData {
  lead: string
  rows: CotRow[]
  meaning: string
  hasCot: boolean
}

export interface CalendarEvent {
  date: string
  event: string
  impact: 'high' | 'medium' | 'low'
  explain: string
}

export interface SeasonData {
  avg: string
  win: string
  note: string
}

export interface StatItem {
  k: string
  v: string
}

export interface FlowItem {
  contract: string
  expiry: string
  volume: string
  premium: string
  bias: FlowBias
}

export interface FlowGex {
  val: string
  interp: string
}

export interface PcRatio {
  val: string
  interp: string
}

export interface Instrument {
  tk: string
  name: string
  category: string
  exchange: string
  price: string
  priceRaw: number
  chg: string
  dir: Direction
  source: string
  ts: string
  score: number
  conf: Confidence
  summary: string[]
  levels: Level[]
  factors: Factor[]
  zones: Zone[]
  catalysts: Catalysts
  cot: CotData
  calendar: CalendarEvent[]
  season: SeasonData
  inv: string | null
  macro: string
  hist: number[]
  stats: StatItem[]
  flow: FlowItem[]
  flowGex: FlowGex
  pcRatio: PcRatio
}

/* ââ Home data types ââ */
export interface MiniGauge {
  label: string
  val: string
  chg: string
  tone: Tone
  pct: number
  read: string
  tk: string
}

export interface NewsItem {
  time: string
  text: string
  ctx: string
  src: string
  tag: Tone
}

export interface CalItem {
  w: string
  n: string
  f: 'crit' | 'high' | 'med'
  p: string
}

export interface SentimentWidget {
  label: string
  val: string
  tone: Tone
  pct: number
  id: string
  expl: string
}

/* ââ Opportunity types ââ */
export interface OppNarrative {
  stage: 'breaking' | 'accelerating' | 'maturing' | 'emerging'
  title: string
  tickers: string[]
  why: string
  whyNow: string
}

export interface OppTrade {
  tk: string
  name: string
  sector: string
  horizon: string
  reason: string
  sentiment: { x: string; reddit: string; smart: string }
  scores: { narrative: number; macro: number; sector: number; timing: number; rr: number }
  composite: number
  entry: string
  target: string
  stop: string
  whyWrong: string
}

export interface OppRiskItem {
  item: string
  level: 'high' | 'medium' | 'low'
  note: string
}

export interface OppRisks {
  fakeHype: OppRiskItem[]
  crowded: OppRiskItem[]
  macro: OppRiskItem[]
}

/* ââ Spotlight / idea types ââ */
export interface Spotlight {
  tk: string
  dir: 'bull' | 'bear' | 'wait'
  name: string
  price: string
  score: number
  conf: Confidence
  title: string
  lede: string
  levels?: { buy: string; stop: string; tgt: string }
}

export interface IdeaRow {
  tk: string
  dir: 'bull' | 'bear' | 'wait'
  nm: string
  pr: string
  sc: number
  tone: Tone
  body: string
}

/* ââ Utility ââ */
export function toneFromScore(score: number): Tone {
  if (score >= 7) return 'hi'
  if (score >= 5) return 'md'
  return 'lo'
}

export function toneColor(tone: Tone): string {
  if (tone === 'hi') return 'var(--gr)'
  if (tone === 'md') return 'var(--gd)'
  return 'var(--rd)'
}
