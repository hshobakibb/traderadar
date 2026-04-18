import { NextRequest, NextResponse } from 'next/server'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

const SYSTEM_PROMPT = `You are TradeRadar's analysis engine. You generate real-time 10-factor market analysis for tradeable instruments.

RULES:
- All explanations must be in plain English. No jargon without explanation.
- Bold key phrases using <b> tags for HTML rendering.
- Scores are 0-10 with one decimal place.
- Prices must include currency symbols.
- Timestamps use format: "18 Apr 2026, HH:MM BST"
- Be specific with numbers, percentages, and levels.
- Write as if explaining to a smart friend who is not a finance professional.

You MUST return ONLY valid JSON matching the Instrument schema. No markdown, no code fences, no commentary.

SCHEMA:
{
  "tk": "string", "name": "string", "category": "string", "exchange": "string",
  "price": "string", "priceRaw": 0, "chg": "string", "dir": "up|down",
  "source": "string", "ts": "string", "score": 0, "conf": "High|Medium|Low",
  "summary": ["string","string"],
  "levels": [{"label":"Buy Zone","price":"string","rationale":"string"},{"label":"Stop Loss","price":"string","rationale":"string"},{"label":"Target","price":"string","rationale":"string"}],
  "factors": [{"name":"Trend","score":0,"desc":"Direction","expl":"string"},{"name":"Momentum","score":0,"desc":"Acceleration","expl":"string"},{"name":"Supply & Demand","score":0,"desc":"Key zones","expl":"string"},{"name":"Volatility","score":0,"desc":"Calm vs chaotic","expl":"string"},{"name":"Breadth","score":0,"desc":"Participation","expl":"string"},{"name":"Cross-asset","score":0,"desc":"Other markets","expl":"string"},{"name":"Macro","score":0,"desc":"Economy","expl":"string"},{"name":"News","score":0,"desc":"Headlines","expl":"string"},{"name":"Sentiment","score":0,"desc":"Social mood","expl":"string"},{"name":"Options Flow","score":0,"desc":"Pro money","expl":"string"}],
  "zones": [{"type":"demand|supply","range":"string","strength":"string","note":"string"}],
  "catalysts": {"up":["string"],"down":["string"]},
  "cot": {"lead":"string","rows":[{"group":"string","long":"string","short":"string","net":"string"}],"meaning":"string","hasCot":true},
  "calendar": [{"date":"string","event":"string","impact":"high|medium|low","explain":"string"}],
  "season": {"avg":"string","win":"string","note":"string"},
  "inv": "string|null", "macro": "string",
  "hist": [0], "stats": [{"k":"string","v":"string"}],
  "flow": [{"contract":"string","expiry":"string","volume":"string","premium":"string","bias":"Bullish|Bearish|Neutral"}],
  "flowGex": {"val":"string","interp":"string"},
  "pcRatio": {"val":"string","interp":"string"}
}`

export async function POST(request: NextRequest) {
  try {
    const { tk, name, category, score } = await request.json()
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured. Add it to your .env.local file.' }, { status: 500 })
    }

    const userPrompt = `Generate a complete 10-factor analysis for:
Ticker: ${tk}
Name: ${name}
Category: ${category}
Current base score: ${score}

Today's date: 18 April 2026.

Use your knowledge to create a realistic, detailed analysis. Include:
- Realistic current price and change
- Thoughtful 10-factor scores that average close to the base score of ${score}
- Specific supply/demand zones with price levels
- Real upcoming catalysts and calendar events
- COT data if this instrument has futures (set hasCot to false for single stocks)
- 30-day score history showing realistic variation
- Options flow data (realistic contracts and premiums)
- Plain English throughout with bold key phrases using <b> tags

Return ONLY the JSON object. No markdown fences, no explanation.`

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
      console.error('Anthropic API error:', response.status, errorText)
      return NextResponse.json({ error: `Anthropic API returned ${response.status}` }, { status: 502 })
    }

    const data = await response.json()
    const content = data.content?.[0]?.text
    if (!content) {
      return NextResponse.json({ error: 'No content in Claude response' }, { status: 502 })
    }

    let jsonStr = content.trim()
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
    }

    const instrument = JSON.parse(jsonStr)
    return NextResponse.json({ instrument, refreshedAt: new Date().toISOString() })
  } catch (err: unknown) {
    console.error('Refresh error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
      }
