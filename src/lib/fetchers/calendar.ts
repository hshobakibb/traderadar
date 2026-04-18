import type { RawCalendarEvent } from './types'

export async function fetchCalendar(): Promise<RawCalendarEvent[]> {
  // TODO: Phase 2 â Implement Forex Factory or Bloomberg economic calendar scraper
  //
  // Forex Factory provides comprehensive economic calendar data:
  // - URL: https://www.forexfactory.com/calendar.php
  // - Requires headless browser (Puppeteer/Playwright) to scrape dynamic content
  // - Alternative: Bloomberg terminal API (paid) or Polygon.io (limited free tier)
  //
  // For now, return a static set of known upcoming events to demonstrate structure.

  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  return [
    {
      date: tomorrow.toISOString().split('T')[0],
      event: 'US Initial Jobless Claims',
      impact: 'high',
      forecast: '212K',
      previous: '218K',
    },
    {
      date: tomorrow.toISOString().split('T')[0],
      event: 'Eurozone CPI (YoY)',
      impact: 'high',
      forecast: '2.3%',
      previous: '2.4%',
    },
    {
      date: nextWeek.toISOString().split('T')[0],
      event: 'US PPI Release',
      impact: 'medium',
      forecast: '0.2%',
      previous: '0.1%',
    },
    {
      date: nextWeek.toISOString().split('T')[0],
      event: 'Fed Interest Rate Decision',
      impact: 'high',
    },
  ]
}

// TODO: Phase 2 â Add Forex Factory scraper with headless browser
// TODO: Phase 2 â Add Bloomberg calendar integration for premium data
