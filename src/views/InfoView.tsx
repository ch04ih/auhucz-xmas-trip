import { useEffect, useMemo, useState } from 'react'
import type { StayPlanId } from '../data/stayPlans'
import { useStayPlan } from '../lib/StayPlanContext'

type MoneyCode = 'TWD' | 'EUR' | 'CZK' | 'HUF'

const moneyLabels: Record<MoneyCode, string> = {
  TWD: '台幣 TWD',
  EUR: '歐元 EUR',
  CZK: '克朗 CZK',
  HUF: '福林 HUF',
}

const fallbackPerTwd: Record<Exclude<MoneyCode, 'TWD'>, number> = {
  EUR: 0.028,
  CZK: 0.69,
  HUF: 11.2,
}

const weather = [
  {
    city: '布達佩斯',
    high: '3–5°C',
    low: '-2–0°C',
    note: '河邊風稍大，著重頭頸防風保暖；隨處有暖氣與熱飲。',
  },
  {
    city: '維也納',
    high: '3–4°C',
    low: '-1–1°C',
    note: '市集廣場無遮蔽，外層建議穿防風羽絨外套。',
  },
  {
    city: '薩爾斯堡／哈修塔特',
    high: '0–3°C',
    low: '-5–-1°C',
    note: '山區湖區較冷，搭乘厚羊毛襪與發熱褲，注意保暖。',
  },
  {
    city: '布拉格',
    high: '1–3°C',
    low: '-3–0°C',
    note: '陰天多、偶有飄雪，地面若有融雪注意鞋底防滑。',
  },
]

const wearLayers = ['防風長版外套', '發熱衣', '中層毛衣／刷毛', '毛帽圍巾', '防滑防水鞋']
const kitItems = ['護唇膏', '保濕乳霜', '手套', '折疊傘']

const BOOKING_DONE_KEY = 'auhucz-booking-done'

type BookingItem = { name: string; note: string; food?: boolean }

function getBookingGroups(planId: StayPlanId): { when: string; hint: string; items: BookingItem[] }[] {
  const is444 = planId === '4-4-4'
  return [
    {
      when: '出發前 2–3 個月',
      hint: '聖誕旺季最容易搶光，能早訂就早訂',
      items: [
        { name: '維也納國家歌劇院', note: '熱門劇目／週末場常提前售完；站票也建議提早盯' },
        { name: '飯店', note: 'BasiliQ、Miiro、希爾頓待訂；聖誕旺季建議提早' },
        { name: '華航豪經艙', note: '已訂 · 12/10 去程、12/23 回程' },
        {
          name: 'Restaurant Bellevue',
          note: is444
            ? '12/22 18:30 歡送晚宴，指定河景／橋景桌'
            : '12/22 18:30 歡送晚宴，指定河景／橋景桌',
          food: true,
        },
        {
          name: 'Mlynec',
          note: is444
            ? '12/21 19:00 城堡日晚餐，橋景／窗邊位'
            : '12/20 19:00 城堡日晚餐，橋景／窗邊位',
          food: true,
        },
      ],
    },
    {
      when: '出發前 3–4 週',
      hint: '門票場次與一日遊，愈早愈穩',
      items: [
        { name: '國會大廈內部導覽', note: '官網先訂場次，選中文語音' },
        { name: 'Klook 薩爾斯堡＆哈修塔特', note: '一日遊名額有限' },
        { name: 'ÖBB 頭等艙車票', note: '維也納⇄布達佩斯、維也納→布拉格' },
        {
          name: 'Figlmüller',
          note: is444
            ? '12/15 約 19:00 維也納第一晚炸牛排'
            : '12/14 約 19:00 維也納第一晚炸牛排',
          food: true,
        },
        {
          name: '紐約咖啡館',
          note: '12/12 11:30 早午餐',
          food: true,
        },
        {
          name: 'Plachutta',
          note: is444
            ? '12/16 19:00 Tafelspitz 晚餐'
            : '12/15 19:00 Tafelspitz 晚餐',
          food: true,
        },
      ],
    },
    {
      when: '出發前 1–2 週',
      hint: '多數餐廳與預購票',
      items: [
        { name: '美景宮上宮（《吻》）', note: '官網預購較省排隊' },
        { name: '布拉格城堡套票', note: '若進主迴路建議線上買' },
        {
          name: 'Lokál Dlouhááá',
          note: is444
            ? '12/19 20:15 抵達布拉格第一晚'
            : '12/18 20:15 抵達布拉格第一晚',
          food: true,
        },
        {
          name: '帝國咖啡館下午茶',
          note: is444
            ? '12/21 約 14:30–17:00 城堡日下午茶'
            : '12/20 約 14:30–17:00 城堡日下午茶',
          food: true,
        },
        {
          name: 'Terasa U Zlaté studně',
          note: is444
            ? '12/21 約 12:00 城堡景觀午餐，指定座位'
            : '12/20 約 12:00 城堡景觀午餐，指定座位',
          food: true,
        },
        ...(is444
          ? []
          : [
              {
                name: 'V Zátiší',
                note: '12/21 19:00 高堡日晚餐',
                food: true,
              } satisfies BookingItem,
            ]),
      ],
    },
    {
      when: '出發前幾天～當天早上',
      hint: '多數仍建議訂，臨時也常有位',
      items: [
        { name: '多瑙河夜航', note: '12/13 20:30；可現場買，旺季先訂較安心' },
        {
          name: 'Café Central',
          note: is444
            ? '12/16 11:30 早午餐'
            : '12/15 11:30 早午餐',
          food: true,
        },
        {
          name: 'Zum Schwarzen Kameel',
          note: is444
            ? '12/19 12:20 轉布拉格當日午餐'
            : '12/18 12:20 轉布拉格當日午餐',
          food: true,
        },
        {
          name: 'Kiskakukk',
          note: '12/12 19:00 國會與城堡日晚餐',
          food: true,
        },
        {
          name: 'Menza',
          note: '12/13 19:30 溫泉日晚餐',
          food: true,
        },
        {
          name: 'NENI',
          note: is444
            ? '12/18 12:30 維也納放鬆日午餐'
            : '12/17 12:30 維也納放鬆日午餐',
          food: true,
        },
      ],
    },
    {
      when: '不用預約（walk-in）',
      hint: '直接去即可，尖峰可能稍候',
      items: [
        { name: '各大聖誕市集', note: '免票入場，攤位現金方便' },
        { name: '塞切尼溫泉', note: '現場買票；平日較不擠' },
        { name: '布達城堡纜車', note: '現場買；排隊長可改搭巴士' },
        { name: '查理大橋／老城廣場', note: '戶外免費逛' },
        { name: '中央大市場／納許市場', note: '小吃與採買隨到隨吃' },
        { name: '漁人堡／高堡區外圍', note: '散步即可' },
        {
          name: 'U Fleků',
          note: is444
            ? '12/20 約 19:00 可現場候位或提早到'
            : '12/19 約 19:00 可現場候位或提早到',
          food: true,
        },
        {
          name: 'Café Louvre',
          note: '12/22 約 11:30 最後一天輕食，通常免訂',
          food: true,
        },
      ],
    },
  ]
}

function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('zh-TW', {
    timeZone,
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function InfoView() {
  const { planId } = useStayPlan()
  const bookingGroups = useMemo(() => getBookingGroups(planId), [planId])
  const [now, setNow] = useState(() => new Date())
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState<MoneyCode>('TWD')
  const [to, setTo] = useState<MoneyCode>('EUR')
  const [perTwd, setPerTwd] = useState(fallbackPerTwd)
  const [rateNote, setRateNote] = useState('使用備用匯率，連上網後會更新')
  const [doneBookings, setDoneBookings] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(BOOKING_DONE_KEY)
      if (!raw) return new Set()
      const parsed = JSON.parse(raw) as unknown
      return Array.isArray(parsed) ? new Set(parsed.filter((x) => typeof x === 'string')) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(BOOKING_DONE_KEY, JSON.stringify([...doneBookings]))
    } catch {
      /* ignore */
    }
  }, [doneBookings])

  const toggleBookingDone = (name: string) => {
    setDoneBookings((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }
  useEffect(() => {
    let cancelled = false
    fetch('https://open.er-api.com/v6/latest/TWD')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || data?.result !== 'success') return
        setPerTwd({
          EUR: Number(data.rates.EUR) || fallbackPerTwd.EUR,
          CZK: Number(data.rates.CZK) || fallbackPerTwd.CZK,
          HUF: Number(data.rates.HUF) || fallbackPerTwd.HUF,
        })
        setRateNote(`匯率更新：${String(data.time_last_update_utc || '').slice(0, 16)} UTC`)
      })
      .catch(() => {
        if (!cancelled) setRateNote('目前離線，使用備用匯率')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const converted = useMemo(() => {
    const value = Number(amount)
    if (!Number.isFinite(value)) return '—'
    const toTwd = (code: MoneyCode, n: number) => (code === 'TWD' ? n : n / perTwd[code])
    const fromTwd = (code: MoneyCode, n: number) => (code === 'TWD' ? n : n * perTwd[code])
    const result = fromTwd(to, toTwd(from, value))
    return new Intl.NumberFormat('zh-TW', {
      maximumFractionDigits: result >= 100 ? 0 : 2,
    }).format(result)
  }, [amount, from, to, perTwd])

  return (
    <div className="page info-page">
      <header className="page-head">
        <p className="eyebrow">Travel info</p>
        <h1>實用資訊</h1>
        <p className="hero-sub">12 月中歐是冬天時區，台灣比當地快 7 小時。</p>
      </header>

      <section className="section">
        <h2>現在時間</h2>
        <div className="clock-grid">
          <div className="info-card">
            <span>台灣</span>
            <strong>{formatClock(now, 'Asia/Taipei')}</strong>
          </div>
          <div className="info-card">
            <span>當地（維也納／布達佩斯／布拉格）</span>
            <strong>{formatClock(now, 'Europe/Vienna')}</strong>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>貨幣換算</h2>
        <p className="hero-sub pending-lead">
          奧地利用歐元，匈牙利用福林，捷克用克朗。聖誕市集常要現金。
        </p>
        <div className="card">
          <label className="field">
            <span>金額</span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <div className="money-row">
            <label className="field">
              <span>從</span>
              <select value={from} onChange={(e) => setFrom(e.target.value as MoneyCode)}>
                {(Object.keys(moneyLabels) as MoneyCode[]).map((code) => (
                  <option key={code} value={code}>
                    {moneyLabels[code]}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="swap-btn"
              onClick={() => {
                setFrom(to)
                setTo(from)
              }}
            >
              ⇄
            </button>
            <label className="field">
              <span>到</span>
              <select value={to} onChange={(e) => setTo(e.target.value as MoneyCode)}>
                {(Object.keys(moneyLabels) as MoneyCode[]).map((code) => (
                  <option key={code} value={code}>
                    {moneyLabels[code]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="convert-result">
            約等於
            <strong>
              {converted} {to}
            </strong>
          </p>
          <p className="rate-note">{rateNote}</p>
        </div>
      </section>

      <section className="section">
        <h2>❄️ 12 月天氣與穿搭建議</h2>
        <p className="hero-sub pending-lead">
          約略均溫，實際以出發前一週為準。白天短，約 8:00–16:00。
        </p>

        <div className="weather-overview">
          <span>實際均溫</span>
          <p className="weather-temps">
            白天約 <strong>1–5°C</strong>
            <i>／</i>
            夜晚約 <strong>-3–1°C</strong>
          </p>
          <p className="weather-temps-note">三城差不多；薩爾斯堡／哈修塔特再低 2–3°C。</p>
          <span>體感</span>
          <p className="weather-temps">
            約台灣寒流 <strong>12–14°C</strong>
          </p>
          <p className="weather-temps-note">
            穿好防風的話，涼涼乾乾的很好走，沒有濕冷那種黏。實際氣溫更低，可是中歐是乾冷，體感沒數字看起來可怕；空曠市集沒防風，就會再冷好幾度。
          </p>
        </div>

        <div className="weather-pack">
          <div>
            <span>穿搭公式</span>
            <ol className="wear-steps">
              {wearLayers.map((layer) => (
                <li key={layer}>{layer}</li>
              ))}
            </ol>
          </div>
          <div>
            <span>隨身必備</span>
            <p className="kit-note">空氣乾，護唇與保濕很重要。</p>
            <div className="kit-chips">
              {kitItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <h3 className="weather-sub">📍 各城市氣候提示</h3>
        <div className="stack">
          {weather.map((item) => (
            <div key={item.city} className="weather-card">
              <div className="weather-head">
                <strong>{item.city}</strong>
                <span>
                  白天 {item.high}
                  <i>／</i>
                  夜晚 {item.low}
                </span>
              </div>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>訂位與預約清單</h2>
        <p className="hero-sub pending-lead">
          點一下可劃掉已完成；再點可取消。進度會存在這台裝置。聖誕旺季建議盡量提早。
        </p>
        <div className="booking-stack">
          {bookingGroups.map((group) => (
            <div key={group.when} className="booking-group">
              <div className="booking-group-head">
                <strong>{group.when}</strong>
                <span>{group.hint}</span>
              </div>
              <div className="booking-list">
                {group.items.map((item) => {
                  const done = doneBookings.has(item.name)
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={done ? 'booking-row done' : 'booking-row'}
                      aria-pressed={done}
                      onClick={() => toggleBookingDone(item.name)}
                    >
                      <span className="booking-check" aria-hidden="true">
                        {done ? '✓' : ''}
                      </span>
                      <span className="booking-row-body">
                        <strong>
                          {item.food ? '🍴 ' : ''}
                          {item.name}
                        </strong>
                        <span>{item.note}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>出發前也用得到</h2>
        <div className="tip-list">
          <div className="info-card">
            <strong>插頭與電壓</strong>
            <p>中歐是 C／F 型、230V。台灣電器需轉接頭；吹風機建議在當地買或確認雙電壓。</p>
          </div>
          <div className="info-card">
            <strong>緊急電話</strong>
            <p>歐盟通用 112。市集人多注意包包；卡片可刷，攤位仍常收現金。</p>
          </div>
          <div className="info-card">
            <strong>別忘了帶</strong>
            <p>行動電源、泳衣（溫泉）。歌劇院穿著整齊即可，不必禮服。</p>
          </div>
        </div>
      </section>
    </div>
  )
}
