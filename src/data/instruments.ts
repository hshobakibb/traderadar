import type { Category, InstrumentMeta, Tone } from '@/lib/types'

/* ââââââââââââââââââââââââââââââââââââââââââââââ
   CATEGORY TREE â 9 asset classes, ~140 instruments
   ââââââââââââââââââââââââââââââââââââââââââââââ */

export const CATS: Category[] = [
  {id:'fx', name:'Forex', groups:[
    {name:'USD Majors', rows:[['EURUSD','EUR/USD',6.8,'md'],['GBPUSD','GBP/USD',7.0,'hi'],['USDJPY','USD/JPY',5.5,'md'],['USDCHF','USD/CHF',5.2,'md']]},
    {name:'Commodity FX', rows:[['AUDUSD','AUD/USD',6.0,'md'],['NZDUSD','NZD/USD',5.5,'md'],['USDCAD','USD/CAD',5.8,'md']]},
    {name:'EM FX', rows:[['USDMXN','USD/MXN',5.2,'md'],['USDZAR','USD/ZAR',4.5,'lo'],['USDTRY','USD/TRY',3.2,'lo'],['USDBRL','USD/BRL',4.8,'lo']]},
    {name:'Crosses', rows:[['EURGBP','EUR/GBP',5.8,'md'],['EURJPY','EUR/JPY',6.5,'md'],['GBPJPY','GBP/JPY',6.8,'md'],['AUDNZD','AUD/NZD',5.0,'md']]},
    {name:'Index', rows:[['DXY','US Dollar Index',4.5,'lo']]}
  ]},
  {id:'rv', name:'Rates & Volatility', groups:[
    {name:'US Rates', rows:[['US02Y','US 2Y Yield',5.5,'md'],['US10Y','US 10Y Yield',6.0,'md'],['US30Y','US 30Y Yield',5.8,'md']]},
    {name:'Global Rates', rows:[['DE10Y','German 10Y Bund',5.5,'md'],['UK10Y','UK 10Y Gilt',5.8,'md'],['JP10Y','Japan 10Y JGB',4.2,'lo']]},
    {name:'Volatility', rows:[['VIX','CBOE VIX',5.5,'md'],['MOVE','MOVE Index',5.0,'md']]}
  ]},
  {id:'idx', name:'Equity Indices', groups:[
    {name:'US', rows:[['SPX','S&P 500',7.8,'hi'],['NDX','Nasdaq 100',8.2,'hi'],['DJI','Dow Jones',7.2,'hi'],['RUT','Russell 2000',6.5,'md']]},
    {name:'Europe', rows:[['FTSE','FTSE 100',6.8,'md'],['DAX','DAX 40',7.0,'hi'],['CAC','CAC 40',6.5,'md'],['STOXX','Euro Stoxx 50',6.4,'md'],['IBEX','IBEX 35',5.8,'md']]},
    {name:'Asia', rows:[['NKY','Nikkei 225',7.5,'hi'],['HSI','Hang Seng',6.2,'md'],['SHCOMP','Shanghai Comp',5.0,'md'],['KOSPI','KOSPI',6.8,'md'],['SENSEX','BSE Sensex',6.5,'md']]}
  ]},
  {id:'eq', name:'Single Stocks', groups:[
    {name:'Mega-cap Tech', rows:[['NVDA','Nvidia',8.5,'hi'],['AAPL','Apple',7.0,'hi'],['MSFT','Microsoft',7.2,'hi'],['GOOG','Alphabet',6.8,'md'],['AMZN','Amazon',7.4,'hi'],['META','Meta Platforms',7.8,'hi'],['TSLA','Tesla',7.5,'hi']]},
    {name:'Semis & AI', rows:[['AMD','AMD',8.0,'hi'],['AVGO','Broadcom',7.5,'hi'],['TSM','TSMC',7.0,'hi'],['INTC','Intel',4.5,'lo'],['MU','Micron',7.8,'hi'],['QCOM','Qualcomm',5.0,'md'],['ARM','Arm Holdings',7.2,'hi']]},
    {name:'Growth', rows:[['NFLX','Netflix',4.5,'lo'],['CRM','Salesforce',5.0,'md'],['SNOW','Snowflake',4.2,'lo'],['PLTR','Palantir',7.5,'hi'],['SHOP','Shopify',5.2,'md']]},
    {name:'Autos', rows:[['TM','Toyota',6.2,'md'],['F','Ford',5.0,'md'],['GM','General Motors',5.2,'md']]},
    {name:'Banks', rows:[['JPM','JP Morgan',7.0,'hi'],['GS','Goldman Sachs',6.5,'md'],['MS','Morgan Stanley',6.2,'md'],['BAC','Bank of America',6.0,'md'],['WFC','Wells Fargo',5.8,'md'],['HSBA','HSBC',6.0,'md'],['C','Citigroup',5.5,'md']]},
    {name:'Energy & Industrial', rows:[['XOM','ExxonMobil',6.5,'md'],['CVX','Chevron',6.2,'md'],['COP','ConocoPhillips',6.0,'md'],['BA','Boeing',5.8,'md'],['CAT','Caterpillar',7.0,'hi']]},
    {name:'Healthcare', rows:[['JNJ','Johnson & Johnson',5.5,'md'],['UNH','UnitedHealth',4.0,'lo'],['PFE','Pfizer',4.5,'lo'],['LLY','Eli Lilly',7.2,'hi'],['ABBV','AbbVie',6.2,'md']]},
    {name:'UK FTSE 100', rows:[['SHEL','Shell',6.5,'md'],['AZN','AstraZeneca',6.8,'md'],['ULVR','Unilever',5.5,'md'],['RIO','Rio Tinto',6.0,'md'],['BP','BP',5.8,'md'],['GSK','GSK',5.2,'md']]},
    {name:'Europe', rows:[['ASML','ASML',8.0,'hi'],['SAP','SAP',7.0,'hi'],['NOVO','Novo Nordisk',6.5,'md'],['LVMH','LVMH',6.0,'md']]},
    {name:'Asia', rows:[['9984','SoftBank',5.8,'md'],['700','Tencent',6.0,'md'],['005930','Samsung',6.2,'md']]}
  ]},
  {id:'en', name:'Energy', groups:[
    {name:'Crude', rows:[['CL','WTI Crude',7.0,'hi'],['BZ','Brent Crude',7.2,'hi']]},
    {name:'Gas', rows:[['NG','Natural Gas',4.5,'lo'],['TTF','EU Natural Gas',5.0,'md']]},
    {name:'Refined', rows:[['HO','Heating Oil',6.0,'md'],['RB','RBOB Gasoline',6.2,'md']]},
    {name:'Power & Coal', rows:[['COAL','Newcastle Coal',4.2,'lo'],['CARBON','EU Carbon',5.5,'md']]}
  ]},
  {id:'pm', name:'Precious Metals', groups:[
    {name:'Gold & Silver', rows:[['XAU','Gold',9.0,'hi'],['XAG','Silver',7.5,'hi']]},
    {name:'Platinum Group', rows:[['XPT','Platinum',5.5,'md'],['XPD','Palladium',6.0,'md']]}
  ]},
  {id:'cr', name:'Crypto', groups:[
    {name:'Large Cap', rows:[['BTC','Bitcoin',5.5,'md'],['ETH','Ethereum',5.0,'md']]},
    {name:'L1 Alts', rows:[['SOL','Solana',5.5,'md'],['ADA','Cardano',3.5,'lo'],['AVAX','Avalanche',4.0,'lo'],['DOT','Polkadot',3.0,'lo'],['NEAR','NEAR Protocol',4.2,'lo']]},
    {name:'DeFi & L2', rows:[['UNI','Uniswap',3.8,'lo'],['AAVE','Aave',4.5,'lo'],['ARB','Arbitrum',4.0,'lo']]},
    {name:'Memes', rows:[['DOGE','Dogecoin',3.0,'lo'],['SHIB','Shiba Inu',2.5,'lo']]}
  ]},
  {id:'im', name:'Industrial Metals', groups:[
    {name:'Base', rows:[['HG','Copper',7.0,'hi'],['ALI','Aluminium',6.0,'md'],['ZNC','Zinc',5.5,'md'],['NI','Nickel',5.0,'md']]},
    {name:'Steel & Iron', rows:[['STEEL','Steel HRC',5.5,'md'],['IO','Iron Ore',5.8,'md']]},
    {name:'Battery & Rare', rows:[['LIT','Lithium',4.0,'lo'],['COBALT','Cobalt',3.8,'lo']]}
  ]},
  {id:'ag', name:'Softs & Agri', groups:[
    {name:'Softs', rows:[['KC','Coffee',6.5,'md'],['SB','Sugar',5.2,'md'],['CC','Cocoa',5.8,'md'],['CT','Cotton',5.0,'md']]},
    {name:'Grains', rows:[['ZW','Wheat',4.5,'lo'],['ZC','Corn',5.5,'md'],['ZS','Soybeans',5.2,'md']]},
    {name:'Livestock', rows:[['LC','Live Cattle',6.0,'md'],['LH','Lean Hogs',5.2,'md'],['FC','Feeder Cattle',5.5,'md']]},
    {name:'Oils', rows:[['ZL','Soybean Oil',5.0,'md'],['PO','Palm Oil',4.5,'lo']]}
  ]}
]

/* ââ Flat lookup: ticker â meta ââ */
export const ALL_INS: Record<string, InstrumentMeta> = {}
CATS.forEach(c =>
  c.groups.forEach(g =>
    g.rows.forEach(r => {
      ALL_INS[r[0]] = {
        tk: r[0],
        name: r[1] as string,
        score: r[2] as number,
        tone: r[3] as Tone,
        cat: c.name,
        group: g.name,
        catId: c.id,
      }
    })
  )
)

/* ââ Free tier: first 2 per category ââ */
export const FREE_TICKERS = new Set<string>()
CATS.forEach(c => {
  let n = 0
  c.groups.forEach(g =>
    g.rows.forEach(r => {
      if (n < 2) { FREE_TICKERS.add(r[0]); n++ }
    })
  )
})
