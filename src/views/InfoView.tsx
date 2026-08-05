import { useEffect, useMemo, useState } from 'react'

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
  { city: '布達佩斯', high: '3–5°C', low: '-2–0°C', note: '濕冷，偶有薄雪' },
  { city: '維也納', high: '3–4°C', low: '-1–1°C', note: '市集風大，體感更低' },
  { city: '薩爾斯堡／哈修塔特', high: '0–3°C', low: '-5–-1°C', note: '湖區與山區最冷' },
  { city: '布拉格', high: '1–3°C', low: '-3–0°C', note: '陰天多，可能下雪' },
]

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
  const [now, setNow] = useState(() => new Date())
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState<MoneyCode>('TWD')
  const [to, setTo] = useState<MoneyCode>('EUR')
  const [perTwd, setPerTwd] = useState(fallbackPerTwd)
  const [rateNote, setRateNote] = useState('使用備用匯率，連上網後會更新')

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

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
    <div className="page">
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
        <h2>12 月天氣</h2>
        <p className="hero-sub pending-lead">約略均溫，實際以出發前一週為準。白天短，約 8:00–16:00。</p>
        <div className="stack">
          {weather.map((item) => (
            <div key={item.city} className="weather-card">
              <strong>{item.city}</strong>
              <span>
                白天 {item.high}　夜晚 {item.low}
              </span>
              <em>{item.note}</em>
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
            <strong>白天很短</strong>
            <p>12 月約下午 4 點天黑。11 點出門後，戶外拍照與夕陽時間不多，溫泉、市集、夜景可排晚上。</p>
          </div>
          <div className="info-card">
            <strong>緊急電話</strong>
            <p>歐盟通用 112。市集人多注意包包；卡片可刷，攤位仍常收現金。</p>
          </div>
          <div className="info-card">
            <strong>打包</strong>
            <p>保暖層、防水靴、手套、圍巾、行動電源。溫泉記得泳衣；歌劇院穿著整齊即可，不必禮服。</p>
          </div>
        </div>
      </section>
    </div>
  )
}
