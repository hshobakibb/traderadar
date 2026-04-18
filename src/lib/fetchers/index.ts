import type { RawDataBundle } from './types'
import { fetchPrice } from './price'
import { fetchNews } from './news'
import { fetchSentiment, fetchFearGreed, fetchCryptoFearGreed } from './sentiment'
import { fetchMacro } from './macro'
import { fetchCot } from './cot'
import { fetchOptions } from './options'
import { fetchCalendar } from './calendar'

export type { RawDataBundle, RawPrice, RawHeadline, RawSentiment, RawCot, RawMacro, RawCalendarEvent, RawOptionsFlow } from './types'
export { fetchPrice, fetchNews, fetchSentiment, fetchFearGreed, fetchCryptoFearGreed, fetchMacro, fetchCot, fetchOptions, fetchCalendar }

export async function fetchDataBundle(tk: string, name: string, category: string): Promise<RawDataBundle> {
  const startTime = Date.now()
  const timings: Record<string, number> = {}

  // Run all fetchers in parallel
  const results = await Promise.allSettled([
    (async () => {
      const t0 = Date.now()
      const result = await fetchPrice(tk)
      timings['price'] = Date.now() - t0
      return result
    })(),

    (async () => {
      const t0 = Date.now()
      const result = await fetchNews(tk, name, category)
      timings['news'] = Date.now() - t0
      return result
    })(),

    (async () => {
      const t0 = Date.now()
      const result = await fetchSentiment(tk)
      timings['sentiment'] = Date.now() - t0
      return result
    })(),

    (async () => {
      const t0 = Date.now()
      const result = await fetchMacro()
      timings['macro'] = Date.now() - t0
      return result
    })(),

    (async () => {
      const t0 = Date.now()
      const result = await fetchCot(tk)
      timings['cot'] = Date.now() - t0
      return result
    })(),

    (async () => {
      const t0 = Date.now()
      const result = await fetchOptions(tk)
      timings['options'] = Date.now() - t0
      return result
    })(),

    (async () => {
      const t0 = Date.now()
      const result = await fetchCalendar()
      timings['calendar'] = Date.now() - t0
      return result
    })(),

    (async () => {
      const t0 = Date.now()
      const result = category.toLowerCase().includes('crypto')
        ? await fetchCryptoFearGreed()
        : await fetchFearGreed()
      timings['fearGreed'] = Date.now() - t0
      return result
    })(),
  ])

  // Extract results safely
  const getResult = <T,>(idx: number, fallback: T): T => {
    const r = results[idx]
    return r.status === 'fulfilled' ? (r.value as T) : fallback
  }

  const price = getResult(0, null)
  const headlines = getResult(1, [])
  const sentiment = getResult(2, null)
  const macro = getResult(3, [])
  const cot = getResult(4, null)
  const options = getResult(5, [])
  const calendar = getResult(6, [])
  const fearGreed = getResult(7, null)

  const totalTime = Date.now() - startTime

  // Log timings
  console.log(
    `[DataBundle] ${tk} fetched in ${totalTime}ms:`,
    Object.entries(timings)
      .map(([k, v]) => `${k}=${v}ms`)
      .join(', ')
  )

  return {
    tk,
    name,
    category,
    price,
    headlines,
    sentiment,
    cot,
    macro,
    calendar,
    options,
    fearGreed,
    fetchedAt: new Date().toISOString(),
  }
}
