import { NextRequest, NextResponse } from 'next/server'
import { fetchDataBundle } from '@/lib/fetchers'
import { ALL_INS } from '@/data/instruments'

export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  try {
    const ticker = params.ticker.toUpperCase()

    const instrument = ALL_INS[ticker]
    if (!instrument) {
      return NextResponse.json(
        { error: `Unknown ticker: ${ticker}` },
        { status: 404 }
      )
    }

    const bundle = await fetchDataBundle(instrument.tk, instrument.name, instrument.cat)

    return NextResponse.json(bundle)
  } catch (err: unknown) {
    console.error('Data API error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
