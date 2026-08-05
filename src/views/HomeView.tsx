import { days, flightLegs, tripMeta } from '../data/trip'
import type { DayPlan } from '../data/types'
import { shareLink } from '../lib/share'

interface Props {
  onOpenDay: (day: number) => void
  onOpenBudget: () => void
  onOpenPlaces: () => void
}

const cities = [
  { name: '布達佩斯', nights: '3 晚', dates: '12/8–11' },
  { name: '維也納', nights: '4 晚', dates: '12/11–15' },
  { name: '布拉格', nights: '5 晚', dates: '12/15–20' },
]

function todayDay(): DayPlan | undefined {
  const now = new Date()
  const start = new Date(`${tripMeta.start}T00:00:00`)
  const end = new Date(`${tripMeta.end}T23:59:59`)
  if (now < start || now > end) return undefined
  const diff = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1
  return days.find((d) => d.day === Math.min(diff, 14))
}

export function HomeView({ onOpenDay, onOpenBudget, onOpenPlaces }: Props) {
  const current = todayDay()

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Christmas Markets · 2026</p>
        <h1>{tripMeta.title}</h1>
        <p className="hero-sub">
          {tripMeta.nights}　·　{tripMeta.dateRangeLabel}
        </p>
        <button
          type="button"
          className="ghost-btn"
          onClick={() => shareLink(tripMeta.title, '奧匈捷 14 天聖誕市集行程')}
        >
          分享給同行
        </button>
      </header>

      {current ? (
        <button type="button" className="today-card" onClick={() => onOpenDay(current.day)}>
          <span className="today-label">今天行程</span>
          <strong>
            Day {current.day}　{current.date}（{current.weekday}）
          </strong>
          <span>{current.title}</span>
        </button>
      ) : null}

      <section className="section">
        <div className="section-head">
          <h2>三座城市</h2>
        </div>
        <div className="city-grid">
          {cities.map((c) => (
            <div key={c.name} className="city-card">
              <strong>{c.name}</strong>
              <span>{c.nights}</span>
              <em>{c.dates}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>航班</h2>
          <button type="button" className="text-btn" onClick={onOpenBudget}>
            看預算
          </button>
        </div>
        <div className="list-card">
          {flightLegs.map((leg) => (
            <div key={leg.route} className="list-row">
              <strong>{leg.route}</strong>
              <span>{leg.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>每日行程</h2>
          <button type="button" className="text-btn" onClick={() => onOpenDay(1)}>
            全部
          </button>
        </div>
        <div className="day-list">
          {days.map((d) => (
            <button
              key={d.day}
              type="button"
              className="day-row"
              onClick={() => onOpenDay(d.day)}
            >
              <span className="day-num">
                <em>Day</em>
                {d.day}
              </span>
              <span className="day-info">
                <strong>{d.title}</strong>
                <span>
                  {d.date}（{d.weekday}）· {d.cityLabel}
                </span>
              </span>
              <span className="chevron">›</span>
            </button>
          ))}
        </div>
      </section>

      <button type="button" className="ghost-btn" onClick={onOpenPlaces}>
        瀏覽全部景點與餐廳簡介
      </button>
    </div>
  )
}
