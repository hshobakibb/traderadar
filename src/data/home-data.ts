import type {
  MiniGauge, NewsItem, CalItem, SentimentWidget,
  OppNarrative, OppTrade, OppRisks, Spotlight, IdeaRow
} from '@/lib/types'

/* ââ Mini gauges (top of home) ââ */
export const MINI_GAUGES: MiniGauge[] = [
  {label:'S&P 500',val:'7,046',chg:'+0.33%',tone:'hi',pct:82,read:'Record highs',tk:'SPX'},
  {label:'Nasdaq 100',val:'26,374',chg:'+0.65%',tone:'hi',pct:85,read:'Tech leads',tk:'NDX'},
  {label:'VIX',val:'18.7',chg:'+2.7%',tone:'md',pct:38,read:'Slightly elevated',tk:'VIX'},
  {label:'US 10Y',val:'4.31%',chg:'-2bp',tone:'md',pct:44,read:'Yields easing',tk:'US10Y'},
  {label:'Gold',val:'$4,878',chg:'+2.1%',tone:'hi',pct:92,read:'Near record',tk:'XAU'},
  {label:'Bitcoin',val:'$75.8K',chg:'+4.5%',tone:'md',pct:48,read:'Recovering',tk:'BTC'},
  {label:'DXY Dollar',val:'98.2',chg:'-0.5%',tone:'lo',pct:35,read:'Weakening',tk:'DXY'},
  {label:'EUR/USD',val:'1.1524',chg:'+0.3%',tone:'md',pct:55,read:'Euro firmer',tk:'EURUSD'},
  {label:'USD/JPY',val:'159.00',chg:'+0.2%',tone:'lo',pct:65,read:'Intervention risk',tk:'USDJPY'},
  {label:'GBP/USD',val:'1.3534',chg:'-0.2%',tone:'hi',pct:58,read:'Sterling firm',tk:'GBPUSD'},
]

/* ââ Market verdict ââ */
export const MARKET_VERDICT = 'Risk-on rally as Iran ceasefire hopes grow'
export const MARKET_SUMMARY = 'S&P 500 at all-time highs (7,046) with back-to-back records. Nasdaq leading at +0.65%. Gold surging past $4,878 on central bank buying and Warsh Fed shock. Dollar breaking down (DXY 98.2). Bitcoin bouncing to $75.8K from $66K lows. Oil easing from $100+ as ceasefire talks progress. Retail traders chasing the upside.'

/* ââ Fear & Greed ââ */
export const FG_VAL = 62
export const SS_VAL = 58

/* ââ Headlines ââ */
export const HEADLINES: NewsItem[] = [
  {time:'14:30',text:'<b>S&P 500</b> notches fresh all-time high at 7,046 as Iran ceasefire optimism lifts risk appetite. Back-to-back records.',ctx:'Retail buying activity surged from 10th to 55th percentile per JPMorgan data. FOMO kicking in \u2014 but late-cycle chasing can extend rallies for weeks.',src:'Bloomberg',tag:'hi'},
  {time:'13:15',text:'<b>Gold</b> surges to $4,878 \u2014 up 25%+ YTD. J.P. Morgan targets $5,055 by Q4. UBP targets $6,000.',ctx:'Warsh Fed nomination shock, PBoC buying 18th consecutive month, and dollar weakness driving the historic rally. This is a generational gold bull market.',src:'Reuters',tag:'hi'},
  {time:'12:00',text:'<b>Nvidia</b> on 10-day winning streak, up 18%. Longest run since 2023. $215.9B fiscal 2026 revenue.',ctx:'TSMC raised 2026 outlook above 30%. AI capex acceleration confirmed. Nvidia earnings on May 20 is the next mega-catalyst.',src:'CNBC',tag:'hi'},
  {time:'11:30',text:'Israel and Lebanon reach 10-day ceasefire. Trump confirms both leaders agreed to begin at 5 PM EST.',ctx:'Oil falling from $100+ crisis highs. Brent at $96, WTI at $91. If full Iran ceasefire materialises, expect another $5\u201310 drop in crude.',src:'Reuters',tag:'hi'},
  {time:'10:45',text:'<b>Bitcoin</b> recovers to $75.8K from $66.6K lows. Crypto Fear & Greed Index still at 12 (Extreme Fear).',ctx:'ETF inflows of $2.8B in April. On-chain shows long-term holders not selling. Extreme fear often precedes 30\u201360 day rallies \u2014 but timing is everything.',src:'CoinDesk',tag:'md'},
  {time:'09:15',text:'<b>TSMC</b> raised 2026 revenue outlook above 30% in USD. Capex held at high end of $52\u2013$56B range.',ctx:'AI spending acceleration confirmed at the supply chain level. Semis rallying: AMD +7.8%, ARM +1.9%. Broadcom strong.',src:'Bloomberg',tag:'hi'},
  {time:'08:00',text:'<b>DXY Dollar Index</b> breaks below 98 for first time in 3 years. Third consecutive weekly decline.',ctx:'Dollar weakness accelerating as Iran ceasefire reduces safe-haven flows. Benefits gold, commodities, EM assets, and multinationals.',src:'Financial Times',tag:'md'},
  {time:'07:30',text:'<b>WTI crude</b> at $91 as ceasefire optimism offsets earlier Iran/Strait of Hormuz crisis spike to $100+.',ctx:'Energy risk premium fading but structural supply concerns remain. OPEC meeting in May will be key for direction.',src:'S&P Global',tag:'md'},
]

/* ââ Sentiment widgets ââ */
export const SENTIMENT_WIDGETS: SentimentWidget[] = [
  {label:'Crypto F&G',val:'12',tone:'lo',pct:12,id:'cfg',expl:'<b>Crypto Fear & Greed Index</b> measures overall crypto market sentiment from 0 (Extreme Fear) to 100 (Extreme Greed). It combines volatility, volume, social media, surveys, and Bitcoin dominance. Above 70 = greedy (caution), below 30 = fearful (opportunity).'},
  {label:'Put/Call',val:'0.72',tone:'md',pct:55,id:'pcr',expl:'<b>Put/Call Ratio</b> measures how many bearish bets (puts) vs bullish bets (calls) are being placed. Below 0.70 = strongly bullish. Above 1.0 = strongly bearish. 0.72 means slightly more calls than puts \u2014 a modest bullish lean.'},
  {label:'Breadth',val:'72%',tone:'hi',pct:72,id:'brd',expl:'<b>Market Breadth</b> shows what percentage of stocks are trading above their 200-day moving average. Above 60% = healthy, broad-based rally. Below 40% = narrow, fragile rally. 68% means most stocks are participating \u2014 the rally has solid foundations.'},
  {label:'Social Pulse',val:'Bullish',tone:'hi',pct:65,id:'soc',expl:'<b>Social Pulse</b> tracks mentions, tone, and volume of market-related posts across X (Twitter), Reddit, and StockTwits. "Neutral+" means tone is slightly positive but not euphoric. Extreme readings in either direction often signal reversals.'},
]

/* ââ Economic calendar ââ */
export const ECO_CALENDAR: CalItem[] = [
  {w:'25 Apr',n:'CME BTC Futures Expiry',f:'high',p:'$75K battleground. Volatility expected.'},
  {w:'30 Apr',n:'US GDP Q1 (Advance)',f:'crit',p:'First look at growth post-tariffs.'},
  {w:'2 May',n:'US Non-Farm Payrolls',f:'crit',p:'Jobs report drives Fed expectations.'},
  {w:'7 May',n:'FOMC Rate Decision',f:'crit',p:'Hold at 3.50-3.75%. Watch tone on tariffs.'},
  {w:'20 May',n:'Nvidia Q1 FY2027 Earnings',f:'crit',p:'THE catalyst. $55B revenue consensus.'},
]

/* ââ Spotlights ââ */
export const SPOTLIGHTS: Spotlight[] = [
  {tk:'NVDA', dir:'bull', name:'Nvidia', price:'$197.40', score:8.0, conf:'High',
   title:'Blackwell Ultra Exceeds Benchmarks \u2014 Three Hyperscalers Place Orders',
   lede:'Up 2.8% on 1.4\u00d7 volume. <b>$14M in institutional call buying</b> at $210 strike. Clean demand at $192.',
   levels:{buy:'$192\u2013$195', stop:'$186.50', tgt:'$215\u2013$220'}},
  {tk:'XAU', dir:'bull', name:'Gold', price:'$3,285.40', score:7.0, conf:'High',
   title:'Gold at Fresh ATH \u2014 Central Banks Keep Buying',
   lede:'PBoC buying <b>18th consecutive month</b>. Weak dollar + falling real yields.',
   levels:{buy:'$3,240\u2013$3,260', stop:'$3,195', tgt:'$3,350\u2013$3,400'}},
  {tk:'BTC', dir:'wait', name:'Bitcoin', price:'$98,420', score:6.0, conf:'Medium',
   title:'Stalls Below $100K \u2014 Third Rejection',
   lede:'<b>Long-term holders not selling</b>, but short-term positioning elevated. Expiry Friday.'},
]

/* ââ More ideas ââ */
export const IDEAS: IdeaRow[] = [
  {tk:'ASML',dir:'bull',nm:'ASML',pr:'$1,459',sc:8.0,tone:'hi',body:'Beat & raised 2026 guidance. <b>AI semi demand acceleration.</b>'},
  {tk:'AMD',dir:'bull',nm:'AMD',pr:'$278.26',sc:8.0,tone:'hi',body:'<b>+7.8% today</b>. AI chip competition heating up. Semis breaking out.'},
  {tk:'HG',dir:'bull',nm:'Copper',pr:'$6.07/lb',sc:7.0,tone:'hi',body:'<b>22-year supply deficit</b>. Dollar weakness + infra spending.'},
  {tk:'CL',dir:'bear',nm:'WTI Crude',pr:'$90.78',sc:7.0,tone:'hi',body:'Iran ceasefire would <b>remove $10-15 risk premium</b>.'},
  {tk:'UNH',dir:'bear',nm:'UnitedHealth',pr:'$314.19',sc:4.0,tone:'lo',body:'<b>Down 46.5% in 12 months</b>. Dogs of the Dow territory.'},
]

/* ââ Opportunity data ââ */
export const OPP_NARRATIVES: OppNarrative[] = [
  {stage:'breaking', title:'Iran Ceasefire & Energy Unwind', tickers:['CL','BZ','XOM','CVX','XAU','SPX'],
   why:'US-Iran ceasefire talks gaining momentum. Israel-Lebanon 10-day ceasefire confirmed. Oil down from $100+ peak as Strait of Hormuz risk recedes. Risk assets rallying hard \u2014 S&P at records. <b>Energy shorts and equity longs are the crowded trade.</b>',
   whyNow:'Oil pulled back from crisis highs but still at $91\u2013$96 range. If ceasefire materialises, expect another $5\u201310 drop in crude. Energy stocks could lag. Meanwhile, gold may dip on reduced haven demand but structural bid from central banks limits downside.'},
  {stage:'accelerating', title:'AI Capex Acceleration', tickers:['NVDA','AMD','AVGO','TSM','MSFT','GOOG'],
   why:'TSMC raised 2026 revenue outlook above 30%. Nvidia on 10-day winning streak. AMD +7.8%. <b>AI spending is not slowing down \u2014 it is accelerating.</b> Hyperscaler capex commitments for 2027 already exceeding 2026.',
   whyNow:'Semis are breaking out but valuations are stretched. The smart play: buy confirmed winners (NVDA, AVGO) on pullbacks, not at 10-day highs. Watch TSMC as the supply-chain canary \u2014 if they raise again, the rally has legs.'},
  {stage:'maturing', title:'Gold Supercycle: Central Bank Demand', tickers:['XAU','XAG','HG'],
   why:'Gold at $4,878 \u2014 up 25%+ YTD. PBoC buying 18th consecutive month. Warsh Fed nomination shock. J.P. Morgan targeting $5,055. UBP targeting $6,000. <b>This is a generational gold bull market driven by de-dollarization.</b>',
   whyNow:'COT data shows managed money net longs near multi-year highs \u2014 crowded trade risk. But central bank buying is structural and price-insensitive. Buy dips to $4,720 zone. Silver and miners are lagging and offer better risk/reward.'},
  {stage:'emerging', title:'Crypto Extreme Fear: Contrarian Signal?', tickers:['BTC','ETH','SOL'],
   why:'Fear & Greed Index hit 8 \u2014 lowest since 2022. BTC crashed from $100K+ to $66K on tariff shock. Now bouncing to $75K. <b>Historically, extreme fear readings precede 30\u201360 day rallies.</b> ETF inflows remain positive at $2.8B.',
   whyNow:'Institutional positioning still net long per COT. On-chain shows long-term holders not selling. But the tariff overhang is real. Accumulate slowly in the $70\u2013$73K zone rather than chasing the bounce. $80K reclaim is the confirmation signal.'},
  {stage:'accelerating', title:'Dollar Breakdown: DXY Below 98', tickers:['DXY','EURUSD','GBPUSD','XAU','SPX'],
   why:'DXY down 3 consecutive weeks, breaking below 98. GBP/USD at 1.3534. Dollar weakness benefits gold, commodities, EM, and multinationals. <b>Fed holding at 3.50\u20133.75% but market pricing growing divergence from other central banks.</b>',
   whyNow:'Dollar weakness accelerates as Iran ceasefire reduces energy-driven safe haven flows. Play the second-order effects: gold (already working), copper (breaking out at $6.07), EM FX crosses. Avoid USD longs until DXY finds support.'},
  {stage:'emerging', title:'Retail Traders Chasing the Rally', tickers:['SPX','NDX','TSLA','NVDA','PLTR'],
   why:'JPMorgan data: retail buying activity surged from 10th to 55th percentile in days. Retail traders who sat out the rally are now chasing. <b>FOMO is kicking in \u2014 this is typically a late-cycle signal but can extend rallies for weeks.</b>',
   whyNow:'When retail chases after a move, it often provides one last leg higher before a pullback. The risk is buying at the top. Focus on laggards (financials, industrials) rather than the leaders (mega-cap tech) which are already extended.'},
]

export const OPP_TRADES: OppTrade[] = [
  {tk:'XAU', name:'Gold', sector:'Precious Metals', horizon:'swing',
   reason:'Central bank supercycle + dollar breakdown. Gold at $4,878, up 25%+ YTD. J.P. Morgan targets $5,055. PBoC buying 18th consecutive month.',
   sentiment:{x:'bullish', reddit:'bullish', smart:'bullish'},
   scores:{narrative:95, macro:95, sector:90, timing:85, rr:80},
   composite:95.0, entry:'$4,720\u2013$4,780', target:'$5,050', stop:'$4,600',
   whyWrong:'The market underestimates the structural nature of central bank buying. This is not speculative \u2014 it is reserve diversification that is price-insensitive. The Warsh Fed shock adds a new layer of uncertainty that gold thrives on.'},
  {tk:'NVDA', name:'Nvidia', sector:'Semis & AI', horizon:'swing',
   reason:'AI capex acceleration confirmed by TSMC. 10-day winning streak. $215.9B fiscal 2026 revenue. $1T+ GPU orders through 2027.',
   sentiment:{x:'bullish', reddit:'bullish', smart:'bullish'},
   scores:{narrative:92, macro:80, sector:90, timing:85, rr:90},
   composite:88.0, entry:'$188\u2013$192', target:'$220', stop:'$182',
   whyWrong:'Bears argue AI spending must slow. But TSMC raising guidance proves the opposite. The $1T order backlog provides 2+ years of visibility. Valuation is stretched but earnings growth justifies it.'},
  {tk:'ASML', name:'ASML', sector:'Semis & AI', horizon:'swing',
   reason:'Beat and raised 2026 guidance. Only company that makes the machines that make advanced chips. AI demand confirmation.',
   sentiment:{x:'neutral', reddit:'neutral', smart:'bullish'},
   scores:{narrative:85, macro:78, sector:88, timing:82, rr:75},
   composite:82.0, entry:'$1,380\u2013$1,420', target:'$1,580', stop:'$1,320',
   whyWrong:'Market treats ASML as a semi stock, but it is a monopoly infrastructure provider. Every AI chip expansion requires ASML machines. The order book extends years into the future.'},
  {tk:'CL', name:'WTI Crude', sector:'Energy', horizon:'short',
   reason:'Iran ceasefire would remove $10\u201315 risk premium from oil. Brent pulling back from $100+ crisis spike.',
   sentiment:{x:'bearish', reddit:'neutral', smart:'bearish'},
   scores:{narrative:82, macro:80, sector:70, timing:85, rr:78},
   composite:78.0, entry:'$91\u2013$94', target:'$80', stop:'$98',
   whyWrong:'Oil is still pricing in significant conflict premium. If Iran ceasefire materialises, the $10\u201315 premium unwinds fast. Even OPEC cannot sustain $90+ without geopolitical support.'},
  {tk:'HG', name:'Copper', sector:'Industrial Metals', horizon:'long',
   reason:'22-year supply deficit + dollar weakness + infrastructure spending boom. Breaking out to $6.07/lb.',
   sentiment:{x:'neutral', reddit:'neutral', smart:'bullish'},
   scores:{narrative:78, macro:80, sector:75, timing:72, rr:70},
   composite:75.0, entry:'$5.90\u2013$6.00', target:'$6.50', stop:'$5.70',
   whyWrong:'Copper deficit is the most underappreciated macro trade of 2026. Every EV, data centre, and grid upgrade needs copper. Supply is not growing fast enough. Dollar weakness adds fuel.'},
  {tk:'BTC', name:'Bitcoin', sector:'Crypto', horizon:'swing',
   reason:'Extreme fear (F&G at 12) contrarian buy signal. ETF inflows $2.8B. On-chain shows long-term holders not selling.',
   sentiment:{x:'bearish', reddit:'bearish', smart:'neutral'},
   scores:{narrative:72, macro:60, sector:65, timing:70, rr:75},
   composite:72.0, entry:'$70,000\u2013$73,000', target:'$85,000', stop:'$65,000',
   whyWrong:'Sentiment is at 2022 crisis levels but fundamentals are vastly different. Spot ETFs exist, institutional adoption is real, and on-chain metrics are healthy. Extreme fear at these levels has preceded 30\u201360 day rallies in 6 of the last 8 instances.'},
]

export const OPP_RISKS: OppRisks = {
  fakeHype:[
    {item:'Retail FOMO Chase', level:'medium', note:'JPMorgan data shows retail buying surging from 10th to 55th percentile. Late-cycle chasing often precedes 3\u20135% pullbacks.'},
    {item:'Iran Ceasefire Priced In?', level:'high', note:'Markets rallying on ceasefire hopes, but negotiations are fragile. Any breakdown would trigger sharp reversal in oil and equities.'},
    {item:'AI Valuation Stretch', level:'medium', note:'NVDA up 18% in 10 days. AMD +7.8%. Semis priced for perfection. Any earnings miss would punish severely.'},
  ],
  crowded:[
    {item:'Gold Longs', level:'high', note:'Managed money net longs at multi-year highs. COT positioning is extremely crowded. A hawkish Fed surprise could trigger a $200+ flush.'},
    {item:'Short USD', level:'medium', note:'Everyone is short the dollar. DXY at 98 is a 3-year low. Positioning is lopsided \u2014 any reversal could be violent.'},
    {item:'Long Mega-Cap Tech', level:'medium', note:'NVDA, MSFT, AMZN, META all at or near highs. Sector rotation risk if rates spike or growth disappoints.'},
  ],
  macro:[
    {item:'Trump Tariff Escalation', level:'high', note:'Liberation Day tariffs already crashed crypto 30%. If tariffs expand to EU or escalate with China, the entire risk rally could reverse.'},
    {item:'Fed Holds Restrictive', level:'medium', note:'Fed at 3.50\u20133.75% with no cuts expected. If inflation surprises higher, rate cut hopes evaporate and growth stocks get crushed.'},
    {item:'Iran Ceasefire Collapse', level:'high', note:'Oil spiked past $100 during the crisis. A ceasefire collapse would send Brent back above $100 and trigger stagflation fears globally.'},
  ],
}

/* ââ Flow & COT for home ââ */
export const HOME_FLOW = {
  spx: {
    name: 'S&P 500',
    bias: 'Bullish Lean' as const,
    gex: '+$5.8B',
    pcRatio: '0.68',
    netPremium: '+$2.4B calls',
    maxPain: '7,020',
    read: 'Positive gamma (+$5.8B) means dealers are stabilizing the market \u2014 buying dips and selling rallies. The low put/call ratio (0.68) shows more bullish bets than bearish. <b>Institutional flow supports the current rally continuing.</b>',
  },
  ndx: {
    name: 'Nasdaq 100',
    bias: 'Bullish Lean' as const,
    gex: '+$2.8B',
    pcRatio: '0.62',
    netPremium: '+$2.1B calls',
    maxPain: '26,200',
    read: 'Even stronger bullish flow than the S&P. Put/call at 0.62 is skewed heavily toward calls. $2.1B in net call premium signals institutional money betting on tech continuing higher. <b>NVDA earnings on May 20 is the next mega-catalyst.</b>',
  },
}

export const HOME_COT = {
  spx: {
    name: 'S&P 500 Futures',
    bias: 'Net Long',
    longPct: 68,
    shortPct: 32,
    managed: '+205,800 net long',
    dealers: '-162,400 net short',
    read: 'Hedge funds are heavily positioned for stocks to keep rising (+205K contracts long). This is at the upper extreme \u2014 <b>crowded, so any shock (like a hot CPI) could trigger a fast unwind.</b> Dealers are short as a hedge, which is normal.',
  },
  ndx: {
    name: 'Nasdaq 100 Futures',
    bias: 'Net Long',
    longPct: 72,
    shortPct: 28,
    managed: '+112,500 net long',
    dealers: '-88,200 net short',
    read: 'Even more bullish positioning than the S&P. Funds are betting heavily on tech continuing to lead. The 72/28 split is the most bullish since the AI rally began. <b>Nvidia earnings on May 20 could either validate this positioning or trigger a sharp reversal.</b>',
  },
}
