import type { RawCot } from './types'

export async function fetchCot(_ticker: string): Promise<RawCot | null> {
  // TODO: Phase 2 â Implement CFTC COT data fetcher
  //
  // CFTC publishes Commitment of Traders (COT) reports weekly:
  // - URL: https://www.cftc.gov/Market/CommitmentsofTraders/historical
  // - Format: CSV downloads for each contract
  // - Parsing strategy:
  //   1. Download the CSV for the instrument (requires mapping ticker to CFTC contract code)
  //   2. Parse the latest row for: reportDate, commercial (long/short/net), nonCommercial, speculator
  //   3. Return RawCot structure
  //
  // Challenges:
  // - CFTC doesn't offer a direct JSON API, requires CSV parsing
  // - Reports are weekly (Tuesday release for previous Tuesday data)
  // - Contract codes differ from TradeRadar tickers (e.g., 'CL' â 'Crude Oil WTI')
  //
  // For now, return null to prevent blocking the pipeline.

  return null
}
