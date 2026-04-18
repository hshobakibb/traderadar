import type { RawHeadline } from './types'

const TICKER_MAP: Record<string, string> = {
  EURUSD: 'EURUSD=X',
  GBPUSD: 'GBPUSD=X',
  USDJPY: 'JPY=X',
  USDCHF: 'CHF=X',
  SPX: '^GSPC',
  NDX: '^NDX',
  DJI: '^DJI',
  VIX: '^VIX',
  XAU: 'GC=F',
  XAG: 'SI=F',
  CL: 'CL=F',
  BZ: 'BZ=F',
  BTC: 'BTC-USD',
  ETH: 'ETH-USD',
  NVDA: 'NVDA',
  AAPL: 'AAPL',
  MSFT: 'MSFT',
  GOOG: 'GOOG',
  AMZN: 'AMZN',
  META: 'META',
  TSLA: 'TSLA',
  JPM: 'JPM',
  GS: 'GS',
  BAC: 'BAC',
}

interface RSSItem {
  title?: string
  link?: string
  pubDate?: string
  description?: string
}

interface RSSFeed {
  items: RSSItem[]
}

function parseRSSXML(xml: string): RSSFeed {
  const items: RSSItem[] = []

  // Simple regex-based RSS parser (no external XML library)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemStr = match[1]

    const titleMatch = itemStr.match(/<title[^>]*>([^<]+)<\/title>/)
    const linkMatch = itemStr.match(/<link[^>]*>([^<]+)<\/link>/)
    const pubDateMatch = itemStr.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/)
    const descriptionMatch = itemStr.match(/<description[^>]*>([^<]+)<\/description>/)

    items.push({
      title: titleMatch?.[1]?.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"') || '',
      link: linkMatch?.[1] || '',
      pubDate: pubDateMatch?.[1] || '',
      description: descriptionMatch?.[1] || '',
    })
  }

  return { items }
}

function parseTime(pubDate: string): string {
  try {
    const date = new Date(pubDate)
    if (isNaN(date.getTime())) return 'unknown'

    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  } catch {
    return 'unknown'
  }
}

export async function fetchNews(
  ticker: string,
  _name: string,
  _category: string
): Promise<RawHeadline[]> {
  try {
    const yahooTicker = TICKER_MAP[ticker]
    if (!yahooTicker) {
      console.warn(`No news fetcher mapping for ${ticker}`)
      return []
    }

    const url = `https://finance.yahoo.com/rss/headline?s=${yahooTicker}`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      console.warn(`Failed to fetch news for ${ticker}: ${response.status}`)
      return []
    }

    const xml = await response.text()
    const feed = parseRSSXML(xml)

    return feed.items
      .slice(0, 10)
      .map((item) => ({
        title: item.title || 'Untitled',
        url: item.link || '',
        source: 'Yahoo',
        time: parseTime(item.pubDate || ''),
      }))
  } catch (err) {
    console.error(`Error fetching news for ${ticker}:`, err)
    return []
  }
}

// TODO: Phase 2 â Add Barchart scraper (requires headless browser or more complex scraping)
// TODO: Phase 2 â Add Investing.com scraper (requires headless browser or more complex scraping)
// TODO: Phase 2 â Add ForexLive scraper for FX news
// TODO: Phase 2 â Add CoinDesk API for crypto news
