import type { RawSentiment } from './types'

export async function fetchSentiment(ticker: string): Promise<RawSentiment | null> {
  try {
    // StockTwits API endpoint
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${ticker}.json`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      console.warn(`StockTwits unavailable for ${ticker}: ${response.status}`)
      return null
    }

    const data = await response.json()

    const messages = data.messages
    if (!messages || messages.length === 0) return null

    let bullishCount = 0
    let bearishCount = 0

    for (const msg of messages) {
      const s = msg.entities?.sentiment?.basic
      if (s === 'Bullish') bullishCount++
      else if (s === 'Bearish') bearishCount++
    }

    const total = bullishCount + bearishCount || 1

    return {
      bullish: Math.round((bullishCount / total) * 100),
      bearish: Math.round((bearishCount / total) * 100),
      volume: messages.length,
      source: 'StockTwits',
    }
  } catch (err) {
    console.error(`Error fetching StockTwits sentiment for ${ticker}:`, err)
    return null
  }
}

export async function fetchFearGreed(): Promise<{ value: number; label: string; source: string } | null> {
  try {
    // TODO: CNN Fear & Greed requires scraping or alternative data source
    // For now, return placeholder. Phase 2 will implement headless browser approach.
    console.info('Fear & Greed fetcher: placeholder (requires phase 2 implementation)')
    return null
  } catch (err) {
    console.error('Error fetching Fear & Greed:', err)
    return null
  }
}

export async function fetchCryptoFearGreed(): Promise<{ value: number; label: string; source: string } | null> {
  try {
    const url = 'https://api.alternative.me/fng/'

    const response = await fetch(url)

    if (!response.ok) {
      console.warn(`Crypto Fear & Greed unavailable: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (!data.data || data.data.length === 0) {
      return null
    }

    const latest = data.data[0]
    const value = parseInt(latest.value, 10)

    let label = 'Neutral'
    if (value >= 75) label = 'Greed'
    else if (value >= 56) label = 'Neutral'
    else if (value >= 25) label = 'Fear'
    else label = 'Extreme Fear'

    return {
      value,
      label,
      source: 'Crypto Fear & Greed Index',
    }
  } catch (err) {
    console.error('Error fetching crypto fear & greed:', err)
    return null
  }
}
