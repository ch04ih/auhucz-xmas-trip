import { useEffect, useState } from 'react'
import { tripMeta } from '../data/trip'
import { Holly } from '../components/Festive'
import { FlightSummary } from '../components/FlightSummary'
import type { DayPlan } from '../data/types'
import { useStayPlan } from '../lib/StayPlanContext'
import { shareLink } from '../lib/share'

interface Props {
  onOpenDay: (day: number) => void
  onOpenPlaces: () => void
}

function todayDay(daysList: DayPlan[]): DayPlan | undefined {
  const now = new Date()
  const start = new Date(`${tripMeta.start}T00:00:00`)
  const end = new Date(`${tripMeta.end}T23:59:59`)
  if (now < start || now > end) return undefined
  const diff = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1
  return daysList.find((d) => d.day === Math.min(diff, 14))
}

const departureAt = new Date(tripMeta.departure).getTime()

function DepartureCountdown() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const left = departureAt - now
  if (left <= 0) return null
  const seconds = Math.floor(left / 1000)
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="countdown-card">
      <Holly className="holly holly-left" />
      <Holly className="holly holly-right" />
      <span className="countdown-label">倒數出發</span>
      <p className="countdown-nums">
        <strong>{days}</strong>
        <span>天</span>
        <strong>{pad(hours)}</strong>
        <span>時</span>
        <strong>{pad(mins)}</strong>
        <span>分</span>
        <strong>{pad(secs)}</strong>
        <span>秒</span>
      </p>
      <span className="countdown-sub">{tripMeta.departureLabel}</span>
    </div>
  )
}

export function HomeView({ onOpenDay, onOpenPlaces }: Props) {
  const { plan } = useStayPlan()
  const current = todayDay(plan.days)

  return (
    <div className="page home-page">
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

      <DepartureCountdown />

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
          {plan.cities.map((c) => (
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
        </div>
        <FlightSummary showPrice={false} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>每日行程</h2>
          <button type="button" className="text-btn" onClick={() => onOpenDay(1)}>
            全部
          </button>
        </div>
        <div className="day-list">
          {plan.days.map((d) => (
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
