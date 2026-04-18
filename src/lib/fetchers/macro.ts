import type { RawMacro } from './types'

const FRED_SERIES = {
  DFF: 'Fed Funds Rate',
  DGS10: '10Y Yield',
  DGS2: '2Y Yield',
  CPIAUCSL: 'CPI',
  UNRATE: 'Unemployment Rate',
}

export async function fetchMacro(): Promise<RawMacro[]> {
  const apiKey = process.env.FRED_API_KEY
  if (!apiKey) {
    console.warn('FRED_API_KEY not configured')
    return []
  }

  const results: RawMacro[] = []

  for (const [seriesId, label] of Object.entries(FRED_SERIES)) {
    try {
      const url = new URL('https://api.stlouisfed.org/fred/series/observations')
      url.searchParams.append('series_id', seriesId)
      url.searchParams.append('api_key', apiKey)
      url.searchParams.append('file_type', 'json')
      url.searchParams.append('sort_order', 'desc')
      url.searchParams.append('limit', '1')

      const response = await fetch(url.toString())

      if (!response.ok) {
        console.warn(`FRED API error for ${seriesId}: ${response.status}`)
        continue
      }

      const data = await response.json()

      if (!data.observations || data.observations.length === 0) {
        continue
      }

      const obs = data.observations[0]
      const value = parseFloat(obs.value)

      if (!isNaN(value)) {
        results.push({
          indicator: label,
          value,
          date: obs.date,
          source: 'FRED',
        })
      }
    } catch (err) {
      console.error(`Error fetching FRED series ${seriesId}:`, err)
    }
  }

  return results
}
