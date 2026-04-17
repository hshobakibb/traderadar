import type { Instrument } from '@/lib/types'

/* ââââââââââââââââââââââââââââââââââââââââââââââ
   FULL INSTRUMENT DATA â 3 fully wired
   In production, this comes from the API/database.
   ââââââââââââââââââââââââââââââââââââââââââââââ */

export const INST: Record<string, Instrument> = {

'NVDA': {
  tk:'NVDA', name:'Nvidia', category:'Single Stocks', exchange:'NASDAQ',
  price:'$198.35', priceRaw:198.35, chg:'+18.2% (10d)', dir:'up',
  source:'[NASDAQ Real-time]', ts:'17 Apr 2026, 14:30 BST',
  score:8.5, conf:'High',
  summary:[
    "Nvidia is on a <b>10-day winning streak</b>, surging 18% over the past ten sessions \u2014 the longest streak since 2023. The AI chip giant reported record fiscal 2026 revenue of $215.9 billion, up 65% year-over-year, with data centre revenue making up 88% of the business. CEO Jensen Huang confirmed <b>over $1 trillion in GPU orders through 2027</b> for Blackwell and next-gen Vera Rubin architectures.",
    "The broader market is helping too: the S&P 500 is at record highs, Iran ceasefire optimism is boosting risk appetite, and retail traders are chasing the upside. <b>TSMC just raised its 2026 revenue outlook above 30%</b>, confirming AI spending acceleration. Next catalyst: Nvidia Q1 earnings on 20 May. The only headwind is valuation stretch and potential China export curbs."
  ],
  levels:[
    {label:'Buy Zone', price:'$188.00 \u2013 $192.00', rationale:'Demand zone from early April consolidation. Institutional buyers accumulated heavily in this range before the breakout.'},
    {label:'Stop Loss', price:'$182.00', rationale:'Below the April swing low and 50-day moving average. A close below here would signal the rally is losing steam.'},
    {label:'Target', price:'$215.00 \u2013 $225.00', rationale:'Measured move target from the April breakout. Aligns with analyst consensus price targets and the January high zone.'}
  ],
  factors:[
    {name:'Trend', score:9, desc:'Direction', expl:'<b>10-day winning streak</b> \u2014 the longest since 2023. Price is well above all major moving averages. The trend is powerful and accelerating. Every dip is being bought aggressively.'},
    {name:'Momentum', score:9, desc:'Acceleration', expl:'Up 18% in 10 sessions on <b>above-average volume</b>. This is not a slow grind higher \u2014 it is an institutional-driven surge with momentum confirming on every timeframe.'},
    {name:'Supply & Demand', score:8, desc:'Key zones', expl:'<b>Strong demand at $188\u2013$192</b> where the breakout launched. Supply zone above $215 is untested in 2026. Clean air above until that level.'},
    {name:'Volatility', score:7, desc:'Calm vs chaotic', expl:'Implied volatility is <b>moderate at 35%</b>. The stock is moving fast but in a controlled bullish manner. Not the chaotic vol that signals a top.'},
    {name:'Breadth', score:8, desc:'Participation', expl:'<b>Semis are rallying broadly</b> \u2014 AMD +7.8%, AVGO strong, TSMC raising guidance. This is a sector-wide AI trade, not just Nvidia.'},
    {name:'Cross-asset', score:8, desc:'Other markets', expl:'<b>Dollar weakening (DXY 98.2) and yields easing</b> at 4.31%. Both are historically supportive for growth stocks. Risk appetite is strong with S&P at records.'},
    {name:'Macro', score:7, desc:'Economy', expl:'Fed holding at <b>3.50\u20133.75%</b> with no cuts expected soon. But markets read this as stable, not hostile. Iran ceasefire hopes are boosting overall risk sentiment.'},
    {name:'News', score:9, desc:'Headlines', expl:'<b>$215.9B fiscal 2026 revenue</b> (up 65% YoY). $1T+ in GPU orders through 2027. TSMC raising outlook confirms AI capex boom. Earnings on 20 May is next catalyst.'},
    {name:'Sentiment', score:8, desc:'Social mood', expl:'<b>Nvidia trending on WallStreetBets</b> and FinTwit. Retail participation rebounding sharply \u2014 JPMorgan data shows buying activity up from 10th to 55th percentile.'},
    {name:'Options Flow', score:8, desc:'Pro money', expl:'<b>Heavy call buying at $210 and $220 strikes</b> for May expiry. Institutional-sized bets on continuation of the rally. Put/call ratio is decidedly bullish.'}
  ],
  zones:[
    {type:'demand', range:'$188.00 \u2013 $192.00', strength:'Strong', note:'April breakout base. Heavy institutional accumulation confirmed by volume analysis.'},
    {type:'demand', range:'$175.00 \u2013 $180.00', strength:'Moderate', note:'March consolidation zone. Backup support if profit-taking accelerates.'},
    {type:'supply', range:'$215.00 \u2013 $225.00', strength:'Untested', note:'January high zone. Analyst consensus target area. Expect first significant resistance here.'},
    {type:'supply', range:'$238.00 \u2013 $245.00', strength:'Historical', note:'All-time high territory from late 2024. Major overhead if the rally extends.'}
  ],
  catalysts:{
    up:['Q1 earnings on 20 May \u2014 consensus expects another beat','TSMC raised 2026 outlook, confirming AI demand acceleration','$1T+ GPU order backlog through 2027 provides visibility'],
    down:['China export restrictions could tighten under new trade tensions','Valuation stretched \u2014 extended rally may invite profit-taking','Fed holding rates higher for longer could cap multiple expansion']
  },
  cot:{
    lead:'CFTC Commitments of Traders data is <b>not directly available</b> for individual equities like Nvidia. COT reports cover futures and options on futures markets.',
    rows:[],
    meaning:'<b>What this means in plain English:</b> COT data tracks the positions of large traders in futures markets. Since Nvidia is a single stock (not a futures contract), there is no official COT report. However, institutional positioning is clearly bullish \u2014 evidenced by the <b>10-day winning streak, heavy call buying, and rising retail participation</b>.',
    hasCot:false
  },
  calendar:[
    {date:'20 May', event:'Nvidia Q1 FY2027 Earnings', impact:'high', explain:'The most-watched earnings report in tech. Consensus expects revenue of ~$55B. A beat with strong Vera Rubin commentary could push the stock toward $220+. A miss or soft guidance would trigger a sharp pullback.'},
    {date:'30 Apr', event:'US GDP Q1 (Advance)', impact:'medium', explain:'Strong GDP supports AI capex spending. Weak GDP raises recession fears but could also bring rate cuts closer \u2014 mixed for Nvidia.'},
    {date:'7 May', event:'FOMC Rate Decision', impact:'high', explain:'Fed expected to hold at 3.50\u20133.75%. Dovish language helps growth stocks. Any hawkish surprise would pressure the whole Nasdaq.'},
    {date:'15 May', event:'US CPI (April)', impact:'medium', explain:'Lower inflation brings rate cuts closer, which is bullish for growth names. Higher-than-expected CPI could stall the rally.'}
  ],
  season:{avg:'+4.1%', win:'72%', note:'April has historically been strong for Nvidia, driven by pre-earnings positioning and AI infrastructure spending cycles.'},
  inv:null,
  macro:'Fed holding at 3.50\u20133.75%. Iran ceasefire optimism boosting risk appetite. Dollar weakening supports tech. AI spending confirmed accelerating by TSMC.',
  hist:[7.0,7.2,7.0,6.8,7.0,7.2,7.5,7.8,8.0,8.2,8.0,7.8,7.5,7.2,7.0,7.2,7.5,7.8,8.0,8.2,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5],
  stats:[{k:'Market Cap',v:'$4.86T'},{k:'P/E (Fwd)',v:'35.5x'},{k:'ATR (14d)',v:'$7.20'},{k:'52w Range',v:'$110.00 \u2013 $240.00'}],
  flow:[
    {contract:'$210 Call',expiry:'16 May',volume:'38,500',premium:'$12.8M',bias:'Bullish'},
    {contract:'$220 Call',expiry:'16 May',volume:'22,000',premium:'$6.4M',bias:'Bullish'},
    {contract:'$190 Put',expiry:'25 Apr',volume:'12,800',premium:'$3.2M',bias:'Bearish'},
    {contract:'$230 Call',expiry:'20 Jun',volume:'15,200',premium:'$4.8M',bias:'Bullish'}
  ],
  flowGex:{val:'+$2.8B', interp:'Strongly positive gamma means dealers are <b>selling into rallies and buying dips</b>, stabilizing the price near current levels. This supports the range but may cap the speed of further gains. Expect orderly moves, not explosive breakouts.'},
  pcRatio:{val:'0.55', interp:'A put/call ratio of 0.55 is <b>decidedly bullish</b>. Nearly twice as many calls as puts. Professional money is positioned for continuation higher. Readings below 0.50 would signal excessive optimism, but 0.55 is healthy.'}
},

'XAU': {
  tk:'XAU', name:'Gold', category:'Precious Metals', exchange:'COMEX',
  price:'$4,878.00', priceRaw:4878.00, chg:'+2.1%', dir:'up',
  source:'[COMEX Real-time]', ts:'17 Apr 2026, 14:30 BST',
  score:9.0, conf:'High',
  summary:[
    "Gold is trading at <b>$4,878 per ounce</b>, near all-time highs and up over 25% year-to-date. The rally has been driven by a perfect storm: the <b>Warsh Shock</b> (Kevin Warsh nominated as next Fed Chair in late March), relentless central bank buying (PBoC adding 25 tonnes in February alone), and a weakening dollar (DXY at 98.2).",
    "J.P. Morgan is forecasting gold to average <b>$5,055 by Q4 2026</b>, while Swiss bank UBP has a $6,000 target. The Iran ceasefire talks are slightly reducing safe-haven demand today, but structural drivers (central bank diversification, fiscal instability, dollar weakness) remain overwhelmingly bullish. <b>This is one of the strongest gold setups in decades.</b>"
  ],
  levels:[
    {label:'Buy Zone', price:'$4,720 \u2013 $4,780', rationale:'April consolidation support. Central bank buying concentrated in this zone. Tested and held twice.'},
    {label:'Stop Loss', price:'$4,600', rationale:'Below the March breakout level. A close below here would suggest the rally is taking a breather.'},
    {label:'Target', price:'$5,050 \u2013 $5,200', rationale:'J.P. Morgan Q4 2026 forecast at $5,055. Measured move from the March breakout. UBP targets $6,000 by year-end.'}
  ],
  factors:[
    {name:'Trend', score:10, desc:'Direction', expl:'Gold is in a <b>historic uptrend</b>, up 25%+ YTD extending a 64% gain from 2025. Every pullback has been shallow and bought aggressively. The trend is as strong as it gets.'},
    {name:'Momentum', score:9, desc:'Acceleration', expl:'<b>New highs being set regularly</b>. The pace of the rally has actually accelerated since the Warsh Shock in late March. Volume is confirming the move higher.'},
    {name:'Supply & Demand', score:9, desc:'Key zones', expl:'<b>Central banks are providing a structural floor</b> under prices. The PBoC alone added 25 tonnes in February. Global gold ETF holdings rising for 8 consecutive weeks. Demand is overwhelming supply.'},
    {name:'Volatility', score:7, desc:'Calm vs chaotic', expl:'Volatility is <b>elevated but controlled</b>. Gold is moving in large increments but without the wild swings that signal panic. This is institutional accumulation, not speculative frenzy.'},
    {name:'Breadth', score:8, desc:'Participation', expl:'<b>Silver, mining stocks, and platinum are all confirming</b>. The entire precious metals complex is participating. Palladium has recovered to $1,584. This is broad-based demand.'},
    {name:'Cross-asset', score:9, desc:'Other markets', expl:'The <b>US dollar is weakening sharply</b> (DXY at 98.2, down three weeks straight). Real yields are falling. Both are historically powerful tailwinds for gold.'},
    {name:'Macro', score:10, desc:'Economy', expl:'<b>Perfect macro storm for gold:</b> Warsh Fed nomination uncertainty, Iran conflict keeping geopolitical risk elevated, central bank reserve diversification away from dollar, and fiscal instability concerns growing.'},
    {name:'News', score:8, desc:'Headlines', expl:'<b>J.P. Morgan targeting $5,055 for Q4 2026</b>. UBP targeting $6,000. PBoC 18th consecutive month of buying. World Gold Council projecting 900 tonnes of official-sector demand in 2026.'},
    {name:'Sentiment', score:7, desc:'Social mood', expl:'<b>Bullish but not euphoric</b>. Gold investors tend to be more institutional than retail. Social media mentions are rising but nowhere near mania territory. This is actually healthy.'},
    {name:'Options Flow', score:8, desc:'Pro money', expl:'<b>Heavy call buying at $5,000 and $5,200 strikes</b> for June and September expiry. Institutional money is positioned for the rally to continue. Put protection is minimal.'}
  ],
  zones:[
    {type:'demand', range:'$4,720 \u2013 $4,780', strength:'Strong', note:'April consolidation base. Central bank buying concentrated here.'},
    {type:'demand', range:'$4,500 \u2013 $4,600', strength:'Moderate', note:'March breakout level. Major support if a deeper pullback occurs.'},
    {type:'supply', range:'$5,000 \u2013 $5,100', strength:'Psychological', note:'Major round number. Likely to attract some profit-taking on first test.'},
    {type:'supply', range:'$5,400 \u2013 $5,500', strength:'Untested', note:'Extension territory. No historical resistance to reference.'}
  ],
  catalysts:{
    up:['Central bank buying accelerating \u2014 PBoC 18th consecutive month','Dollar weakness deepening as DXY breaks below 98','Warsh Fed nomination creating policy uncertainty \u2014 gold thrives on this'],
    down:['Iran ceasefire deal could reduce safe-haven demand short-term','Hawkish Fed surprise or strong dollar reversal','Profit-taking after 25%+ YTD rally is overdue']
  },
  cot:{
    lead:'CFTC Commitments of Traders report shows <b>managed money net longs near multi-year highs</b> in gold futures, reflecting strong institutional conviction.',
    rows:[
      {group:'Managed Money', long:'+310,200', short:'-38,800', net:'+271,400'},
      {group:'Swap Dealers', long:'+88,500', short:'-205,100', net:'-116,600'},
      {group:'Producers', long:'+52,000', short:'-345,200', net:'-293,200'}
    ],
    meaning:'<b>What this means in plain English:</b> Hedge funds and asset managers are holding their <b>largest bullish bets on gold in over two years</b>, with 271,400 more long contracts than short. This is a massive vote of confidence. Producers (mining companies) are hedging at these high prices, which is normal and expected. The key risk: crowded long positioning means any surprise could trigger a sharp but temporary pullback as funds take profits. <b>Overall: professional money is overwhelmingly betting on higher gold prices.</b>',
    hasCot:true
  },
  calendar:[
    {date:'30 Apr', event:'US GDP Q1 (Advance)', impact:'high', explain:'Weak GDP would boost gold as a safe haven and increase rate cut expectations. Strong GDP could temporarily pressure gold by supporting the dollar.'},
    {date:'2 May', event:'US Non-Farm Payrolls', impact:'high', explain:'The jobs report directly affects gold. A weak print is bullish (more rate cuts expected, weaker dollar). A strong print is bearish short-term.'},
    {date:'7 May', event:'FOMC Rate Decision', impact:'high', explain:'Fed expected to hold. Any dovish shift is bullish for gold. Kevin Warsh nomination adds uncertainty about future Fed direction.'},
    {date:'15 May', event:'US CPI (April)', impact:'high', explain:'Inflation data is critical for gold. Higher inflation supports gold as a hedge. Lower inflation supports rate cuts which also helps gold via dollar weakness.'}
  ],
  season:{avg:'+2.5%', win:'65%', note:'April through June is historically one of the strongest periods for gold, supported by central bank buying patterns and seasonal jewelry demand from India and China.'},
  inv:'Global gold ETF holdings have risen for 8 consecutive weeks, adding 52 tonnes. Physical demand from China and India remains strong. Central bank reserves at record levels.',
  macro:'Perfect storm: Warsh Shock on Fed uncertainty, central bank diversification accelerating, dollar weakening (DXY 98.2), Iran geopolitical premium, fiscal instability fears growing.',
  hist:[7.5,7.8,8.0,8.2,8.5,8.5,8.8,9.0,8.8,8.5,8.8,9.0,9.0,8.8,8.5,8.8,9.0,9.2,9.0,8.8,9.0,9.0,9.0,9.0,9.0,9.0,9.0,9.0,9.0,9.0],
  stats:[{k:'Spot Price',v:'$4,878.00'},{k:'YTD Change',v:'+25.4%'},{k:'ATR (14d)',v:'$62.50'},{k:'52w Range',v:'$2,650 \u2013 $4,900'}],
  flow:[
    {contract:'$5,000 Call',expiry:'Jun',volume:'24,500',premium:'$8.2M',bias:'Bullish'},
    {contract:'$5,200 Call',expiry:'Sep',volume:'16,800',premium:'$5.4M',bias:'Bullish'},
    {contract:'$4,600 Put',expiry:'May',volume:'8,200',premium:'$2.8M',bias:'Bearish'}
  ],
  flowGex:{val:'+$1.2B', interp:'Positive gamma means dealers are <b>smoothing price action</b> around current levels. This supports the range but could act as a magnet, slowing the rally near $5,000 until gamma rolls off at expiry.'},
  pcRatio:{val:'0.58', interp:'A put/call ratio of 0.58 shows a <b>strongly bullish lean</b>. Nearly twice as many calls as puts. Professional money is positioned for continuation to $5,000+. This is one of the most bullish readings in gold in years.'}
},

'BTC': {
  tk:'BTC', name:'Bitcoin', category:'Crypto', exchange:'Composite',
  price:'$75,773', priceRaw:75773, chg:'+4.5%', dir:'up',
  source:'[Composite Index]', ts:'17 Apr 2026, 14:30 BST',
  score:5.5, conf:'Medium',
  summary:[
    "Bitcoin is trading at <b>$75,773</b>, recovering sharply after a brutal selloff that took it from $100K+ territory down to $66,600 following Trump's Liberation Day tariffs on April 2. The Crypto Fear & Greed Index hit <b>8 out of 100 (Extreme Fear)</b> earlier this month \u2014 the lowest since 2022. Today's 4.5% bounce is driven by Iran ceasefire optimism and a broader risk-on rally.",
    "The setup is complicated. <b>On-chain data shows long-term holders are not selling</b>, and institutional ETF inflows totalled $2.8B in April. But the tariff shock, elevated macro uncertainty, and the Fed holding at 3.50\u20133.75% are capping upside. Bitcoin needs to reclaim $80K to shift the technical picture from 'dead cat bounce' to genuine recovery. <b>Extreme fear often precedes major rallies</b>, but timing is everything."
  ],
  levels:[
    {label:'Buy Zone', price:'$70,000 \u2013 $73,000', rationale:'On-chain accumulation zone where whale wallets added heavily after the tariff crash. Strongest support since the March 2026 lows.'},
    {label:'Stop Loss', price:'$65,000', rationale:'Below the April low of $66,600. A break here would signal the downtrend is resuming and open the door to $58,000.'},
    {label:'Target', price:'$82,000 \u2013 $88,000', rationale:'If $80K is reclaimed, the next major resistance is the March high. A full recovery to $100K would require sustained risk-on conditions.'}
  ],
  factors:[
    {name:'Trend', score:4, desc:'Direction', expl:'Bitcoin is in a <b>downtrend from the $100K+ highs</b>. Today\'s bounce is encouraging, but until $80K is reclaimed, the structure remains bearish. The 200-day average is now acting as resistance.'},
    {name:'Momentum', score:6, desc:'Acceleration', expl:'<b>+4.5% today is the strongest daily move in two weeks</b>. Momentum is trying to turn, but it is fighting a series of lower highs since January. One good day does not make a trend change.'},
    {name:'Supply & Demand', score:6, desc:'Key zones', expl:'<b>$70K\u2013$73K demand zone is holding</b> with on-chain evidence of whale accumulation. But supply between $78K and $82K is formidable \u2014 lots of trapped buyers from the decline.'},
    {name:'Volatility', score:5, desc:'Calm vs chaotic', expl:'Volatility <b>spiked during the tariff crash</b> and is now normalizing. But it remains elevated compared to Q4 2025. Big moves in both directions are possible.'},
    {name:'Breadth', score:5, desc:'Participation', expl:'<b>Altcoins are mixed</b>. Ethereum outperformed with +8.6% today, Solana is bouncing, but smaller alts are still deeply depressed. Selective recovery, not broad-based.'},
    {name:'Cross-asset', score:6, desc:'Other markets', expl:'<b>Bitcoin is tracking equity risk sentiment</b>. With S&P at records and VIX manageable, the backdrop supports a bounce. But Bitcoin underperformed equities on the way down and needs to catch up.'},
    {name:'Macro', score:5, desc:'Economy', expl:'<b>Trade war uncertainty from tariffs is the key headwind</b>. Fed holding rates steady. Dollar weakening is a modest positive. But crypto is being treated as a risk asset, not a haven, in this environment.'},
    {name:'News', score:5, desc:'Headlines', expl:'<b>No major crypto-specific catalysts</b>. Iran ceasefire optimism is helping broadly. Spot ETF inflows of $2.8B in April show institutional interest, but the tariff overhang dominates sentiment.'},
    {name:'Sentiment', score:3, desc:'Social mood', expl:'<b>Fear & Greed Index at 12 (Extreme Fear)</b>. Social media is dominated by bearish sentiment and loss-posting. Historically, extreme fear is a contrarian buy signal, but sentiment can stay depressed for months.'},
    {name:'Options Flow', score:6, desc:'Pro money', expl:'<b>Call buying at $80K and $85K for June expiry</b> is picking up. Some institutional investors are using the dip to build positions. But protective puts at $65K suggest professional caution.'}
  ],
  zones:[
    {type:'demand', range:'$70,000 \u2013 $73,000', strength:'Strong', note:'Whale accumulation zone post-tariff crash. On-chain data confirms large wallet additions.'},
    {type:'demand', range:'$58,000 \u2013 $62,000', strength:'Historical', note:'2025 consolidation range. Last line of defense before a major trend change.'},
    {type:'supply', range:'$78,000 \u2013 $82,000', strength:'Strong', note:'Trapped buyers from the decline. Expect selling pressure as they try to exit at breakeven.'},
    {type:'supply', range:'$95,000 \u2013 $101,000', strength:'Major', note:'$100K psychological + former breakdown level. Would require sustained bullish catalysts to reclaim.'}
  ],
  catalysts:{
    up:['Iran ceasefire deal would boost global risk appetite significantly','Fed rate cuts later in 2026 would be powerfully bullish for crypto','Bitcoin ETF inflows accelerating could absorb sell pressure'],
    down:['Trump tariff escalation could trigger another risk-off wave','Fed maintaining restrictive stance caps speculative assets','Bitcoin failing to reclaim $80K would confirm the downtrend and invite more selling']
  },
  cot:{
    lead:'CME Bitcoin futures COT data shows <b>asset managers maintaining long positions</b> despite the tariff-driven selloff, while leveraged funds increased short hedges.',
    rows:[
      {group:'Asset Managers', long:'+34,800', short:'-10,200', net:'+24,600'},
      {group:'Leveraged Funds', long:'+18,500', short:'-42,100', net:'-23,600'},
      {group:'Other Reportable', long:'+12,800', short:'-9,500', net:'+3,300'}
    ],
    meaning:'<b>What this means in plain English:</b> Institutional investors held their nerve during the crash \u2014 Asset Managers still hold 24,600 more long contracts than short, down only slightly from pre-tariff levels. Leveraged funds went more heavily short as a hedge against their spot ETF holdings. The key takeaway: <b>institutional money is still structurally bullish on Bitcoin</b>, even if short-term sentiment is terrible. This divergence between positioning and sentiment often precedes recoveries.',
    hasCot:true
  },
  calendar:[
    {date:'25 Apr', event:'CME Bitcoin Futures Expiry', impact:'high', explain:'Options and futures expiry often causes volatility. With the market in recovery mode, the $75K\u2013$80K range will be the battleground for this expiry.'},
    {date:'30 Apr', event:'US GDP Q1 (Advance)', impact:'medium', explain:'Bitcoin trades as a risk asset right now. Strong GDP = risk-on = good for BTC. Weak GDP could spook markets but also brings rate cuts closer.'},
    {date:'7 May', event:'FOMC Rate Decision', impact:'high', explain:'A dovish Fed signal would be powerfully bullish for crypto. Rate cuts make yield-free assets like Bitcoin more attractive and weaken the dollar.'},
    {date:'15 May', event:'Spot ETF 13F Filing Deadline', impact:'medium', explain:'Institutional holders must disclose Bitcoin ETF positions. New big-name holders would validate the institutional adoption narrative and could spark a sentiment shift.'}
  ],
  season:{avg:'+3.8%', win:'55%', note:'April has mixed seasonality for Bitcoin. However, post-crash recoveries tend to be strongest in Q2, and extreme fear readings historically precede 30-60 day rallies.'},
  inv:'Bitcoin ETF net inflows totalled $2.8B in April despite the price crash. Grayscale outflows have slowed to near-zero. On-chain data shows long-term holders not selling.',
  macro:'Trade war tariffs creating uncertainty. Fed holding at 3.50\u20133.75%. Dollar weakening is a modest tailwind. Iran ceasefire hopes boosting risk appetite today.',
  hist:[7.0,6.8,6.5,6.2,5.8,5.5,5.0,4.5,4.0,3.8,4.0,4.2,4.5,4.8,5.0,5.2,5.0,4.8,4.5,4.8,5.0,5.2,5.5,5.5,5.5,5.5,5.5,5.5,5.5,5.5],
  stats:[{k:'Market Cap',v:'$1.50T'},{k:'NVT Ratio',v:'52'},{k:'ATR (14d)',v:'$3,400'},{k:'52w Range',v:'$58,000 \u2013 $109,500'}],
  flow:[
    {contract:'$80K Call',expiry:'Jun',volume:'12,200',premium:'$5.8M',bias:'Bullish'},
    {contract:'$85K Call',expiry:'Jun',volume:'8,400',premium:'$3.2M',bias:'Bullish'},
    {contract:'$65K Put',expiry:'May',volume:'9,800',premium:'$4.1M',bias:'Bearish'}
  ],
  flowGex:{val:'+$280M', interp:'Modest positive gamma. Dealers will <b>buy dips around $73K and sell rallies near $78K</b>, creating a gravitational pull within this range. A break above $80K would require fresh catalyst to overcome dealer hedging flows.'},
  pcRatio:{val:'0.85', interp:'A put/call ratio of 0.85 shows <b>nearly balanced positioning with a slight bearish tilt</b>. More protective puts than usual, reflecting the cautious mood after the tariff crash. This matches the extreme fear reading in sentiment.'}
}

}
