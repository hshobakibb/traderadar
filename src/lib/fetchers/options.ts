import type { RawOptionsFlow } from './types'

export async function fetchOptions(ticker: string): Promise<RawOptionsFlow[]> {
  try {
    // Dynamic import to handle server-side only
    const yf = await import('yahoo-finance2').catch(() => null)
    if (!yf) {
      console.warn('yahoo-finance2 not installed')
      return []
    }

    // Get available expirations
    const expirations = await yf.default.getOptions(ticker)

    if (!expirations || expirations.calls.length === 0) {
      console.warn(`No options data for ${ticker}`)
      return []
    }

    const flows: RawOptionsFlow[] = []
    const sampleSize = Math.min(20, expirations.calls.length)

    // Sample top unusual activity (highest volume relative to OI)
    for (let i = 0; i < sampleSize; i++) {
      const call = expirations.calls[i]
      if (!call) continue

      const activityScore = (call.volume || 0) / Math.max(call.openInterest || 1, 1)

      flows.push({
        strike: call.strike || 0,
        expiry: call.expiration || '',
        type: 'call',
        volume: call.volume || 0,
        openInterest: call.openInterest || 0,
        impliedVol: call.impliedVolatility,
      })

      if (activityScore > 0.5) {
        // High activity â only capture top unusual
        break
      }
    }

    // Sample puts as well
    for (let i = 0; i < Math.min(10, expirations.puts.length); i++) {
      const put = expirations.puts[i]
      if (!put) continue

      flows.push({
        strike: put.strike || 0,
        expiry: put.expiration || '',
        type: 'put',
        volume: put.volume || 0,
        openInterest: put.openInterest || 0,
        impliedVol: put.impliedVolatility,
      })
    }

    return flows
  } catch (err) {
    console.error(`Error fetching options for ${ticker}:`, err)
    return []
  }
}
