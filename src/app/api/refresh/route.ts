import { NextRequest, NextResponse } from 'next/server'
import { fetchDataBundle } from '@/lib/fetchers'
import { ALL_INS } from '@/data/instruments'

/* ââââââââââââââââââââââââââââââââââââââââââââââ
   /api/refresh â live instrument analysis engine

   1. Fetches real market data from 13 free sources
   2. Feeds the raw data to the analysis engine
   3. Returns a scored Instrument object
   ââââââââââââââââââââââââââââââââââââââââââââââ */

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

const SYSTEM_PROMPT = `You are TradeRadar's analysis engine. You receive REAL market data and produce a scored 10-factor analysis.

RULES:
- All explanations in plain English. No jargon without explanation.
- Bold key phrases using <b> tags.
- Scores are 0-10 with one decimal place.
- Prices include currency symbols.
- Timestamps use format: "18 Apr 2026, HH:MM BST"
- Be specific with numbers, percentages, and levels from the data provided.
- Write as if explaining to a smart friend who isn't a finance professional.
- When multiple news sources agree, confidence is HIGH. When they conflict, note it and lower confidence.
- Base your scores on the ACTUAL DATA provided, not assumptions.

Return ONLY valid JSON matching the Instrument schema. No markdown, no code fences.

SCHEMA:
{
  "tk": string, "name": string, "category": string, "exchange": string,
  "price": string, "priceRaw": number, "chg": string, "dir": "up"|"down",
  "source": string, "ts": string, "score": number, "conf": "High"|"Medium"|"Low",
  "summary": [string, string],
  "levels": [{"label":"Buy Zone","price":string,"rationale":string},{"label":"Stop Loss","price":string,"rationale":string},{"label":"Target","price":string,"rationale":string}],
  "factors": [
    {"name":"Trend","score":number,"desc":"Direction","expl":string},
    {"name":"Momentum","score":number,"desc":"Acceleration","expl":string},
    {"name":"Supply & Demand","score":number,"desc":"Key zones","expl":string},
    {"name":"Volatility","score":number,"desc":"Calm vs chaotic","expl":string},
    {"name":"Breadth","score":number,"desc":"Participation","expl":string},
    {"name":"Cross-asset","score":number,"desc":"Other markets","expl":string},
    {"name":"Macro","score":number,"desc":"Economy","expl":string},
    {"name":"News","score":number,"desc":"Headlines","expl":string},
    {"name":"Sentiment","score":number,"desc":"Social mood","expl":string},
    {"name":"Options Flow","score":number,"desc":"Pro money","expl":string}
  ],
  "zones": [{"type":"demand"|"supply","range":string,"strength":string,"note":string}],
  "catalysts": {"up":[string,string,string],"down":[string,string,string]},
  "cot": {"lead":string,"rows":[{"group":string,"long":string,"short":string,"net":string}],"meaning":string,"hasCot":boolean},
  "calendar": [{"date":string,"event":string,"impact":"high"|"medium"|"low","explain":string}],
  "season": {"avg":string,"win":string,"note":string},
  "inv": string|null, "macro": string,
  "hist": number[],
  "stats": [{"k":string,"v":string}],
  "flow": [{"contract":string,"expiry":string,"volume":string,"premium":string,"bias":"Bullish"|"Bearish"|"Neutral"}],
  "flowGex": {"val":string,"interp":string},
  "pcRatio": {"val":string,"interp":string}
}`

export async function POST(request: NextRequest) {
  try {
    const { tk, name, category } = await request.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured. Add it to your .env.local file.' },
        { status: 500 }
      )
    }

    // Step 1: Fetch real data from all sources
    const meta = ALL_INS[tk]
    const instName = name || meta?.name || tk
    const instCat = category || meta?.cat || 'Unknown'

    const bundle = await fetchDataBundle(tk, instName, instCat)

    // Step 2: Build the data-enriched prompt
    const priceSection = bundle.price
      ? `PRICE DATA (Yahoo Finance):
  Current: $${bundle.price.price}
  Change: ${bundle.price.change} (${bundle.price.changePct}%)
  Volume: ${bundle.price.volume.toLocaleString()}
  52-week high: $${bundle.price.high52w}
  52-week low: $${bundle.price.low52w}
  ${bundle.price.marketCap ? `Market cap: $${(bundle.price.marketCap / 1e9).toFixed(1)}B` : ''}
  ${bundle.price.pe ? `P/E ratio: ${bundle.price.pe.toFixed(1)}` : ''}`
      : 'PRICE DATA: unavailable'

    const newsSection = bundle.headlines.length > 0
      ? `NEWS HEADLINES (${bundle.headlines.length} articles from ${[...new Set(bundle.headlines.map(h => h.source))].join(', ')}):\n${bundle.headlines.map(h => `  [${h.source}] ${h.title} (${h.time})`).join('\n')}`
      : 'NEWS: no headlines available'

    const sentimentSection = bundle.sentiment
      ? `SOCIAL SENTIMENT (${bundle.sentiment.source}):
  Bullish: ${bundle.sentiment.bullish}% | Bearish: ${bundle.sentiment.bearish}%
  Message volume: ${bundle.sentiment.volume}`
      : 'SOCIAL SENTIMENT: unavailable'

    const fearGreedSection = bundle.fearGreed
      ? `FEAR & GREED (${bundle.fearGreed.source}): ${bundle.fearGreed.value}/100 â ${bundle.fearGreed.label}`
      : ''

    const macroSection = bundle.macro.length > 0
      ? `MACRO DATA (FRED):\n${bundle.macro.map(m => `  ${m.indicator}: ${m.value} (${m.date})`).join('\n')}`
      : ''

    const cotSection = bundle.cot
      ? `COT DATA (CFTC, ${bundle.cot.reportDate}):
  Commercial: Long ${bundle.cot.commercial.long} / Short ${bundle.cot.commercial.short} / Net ${bundle.cot.commercial.net}
  Non-commercial: Long ${bundle.cot.nonCommercial.long} / Short ${bundle.cot.nonCommercial.short} / Net ${bundle.cot.nonCommercial.net}`
      : ''

    const optionsSection = bundle.options.length > 0
      ? `OPTIONS ACTIVITY (${bundle.options.length} notable contracts):\n${bundle.options.slice(0, 5).map(o => `  ${o.type.toUpperCase()} $${o.strike} exp ${o.expiry} â vol: ${o.volume}, OI: ${o.openInterest}`).join('\n')}`
      : ''

    const calendarSection = bundle.calendar.length > 0
      ? `UPCOMING EVENTS:\n${bundle.calendar.map(e => `  ${e.date}: ${e.event} [${e.impact}]`).join('\n')}`
      : ''

    const userPrompt = `Analyze this instrument using the REAL DATA below. Score each of the 10 factors based on what the data shows.

INSTRUMENT: ${tk} â ${instName} (${instCat})
DATA FETCHED: ${bundle.fetchedAt}

${priceSection}

${newsSection}

${sentimentSection}
${fearGreedSection}

${macroSection}

${cotSection}

${optionsSection}

${calendarSection}

Based on ALL the data above, produce the full 10-factor scored analysis. Where data is missing for a factor, use your market knowledge but note lower confidence. The composite score should be the average of all 10 factor scores.

Return ONLY the JSON object.`

    // Step 3: Call the analysis engine
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Analysis API error:', response.status, errorText)
      return NextResponse.json(
        { error: `Analysis engine returned ${response.status}` },
        { status: 502 }
      )
    }

    const data = await response.json()
    const content = data.content?.[0]?.text

    if (!content) {
      return NextResponse.json(
        { error: 'No content in analysis response' },
        { status: 502 }
      )
    }

    // Parse the JSON response
    let jsonStr = content.trim()
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
    }

    const instrument = JSON.parse(jsonStr)

    return NextResponse.json({
      instrument,
      rawData: bundle,
      refreshedAt: new Date().toISOString(),
    })
  } catch (err: unknown) {
    console.error('Refresh error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
