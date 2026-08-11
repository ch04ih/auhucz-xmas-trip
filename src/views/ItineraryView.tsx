import { useEffect, useRef } from 'react'
import { PlaceChips } from '../components/PlaceChips'
import { getPlace, placeImage } from '../data/places'
import type { DayPlan } from '../data/types'
import { useStayPlan } from '../lib/StayPlanContext'
import { shareLink } from '../lib/share'

interface Props {
  dayNumber: number
  onSelectDay: (day: number) => void
  onOpenPlace: (id: string) => void
}

function MealBlock({
  label,
  meal,
  onOpenPlace,
}: {
  label: string
  meal?: { label: string; time?: string; placeIds?: string[] }
  onOpenPlace: (id: string) => void
}) {
  if (!meal) return null
  return (
    <div className="meal">
      <span className="meal-label">{label}</span>
      <div>
        <p>
          {meal.label}
          {meal.time ? <em> · {meal.time}</em> : null}
        </p>
        <PlaceChips ids={meal.placeIds} onOpen={onOpenPlace} />
      </div>
    </div>
  )
}

export function ItineraryView({ dayNumber, onSelectDay, onOpenPlace }: Props) {
  const { plan } = useStayPlan()
  const days = plan.days
  const day: DayPlan = days.find((d) => d.day === dayNumber) ?? days[0]
  const prev = days.find((d) => d.day === day.day - 1)
  const next = days.find((d) => d.day === day.day + 1)
  const cover = day.coverPlaceId ? getPlace(day.coverPlaceId) : undefined
  const scrollerRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number; ignore: boolean } | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const active = scrollerRef.current?.querySelector<HTMLButtonElement>('.day-pill.active')
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [day.day])

  const goPrev = () => {
    if (prev) onSelectDay(prev.day)
  }

  const goNext = () => {
    if (next) onSelectDay(next.day)
  }

  return (
    <div
      className="page itinerary-page"
      onTouchStart={(e) => {
        const t = e.touches[0]
        const target = e.target as HTMLElement | null
        touchStart.current = {
          x: t.clientX,
          y: t.clientY,
          ignore: Boolean(target?.closest('.day-scroller, .chips, a, input, textarea, select')),
        }
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current
        touchStart.current = null
        if (!start || start.ignore) return
        const t = e.changedTouches[0]
        const dx = t.clientX - start.x
        const dy = t.clientY - start.y
        if (Math.abs(dx) < 56) return
        if (Math.abs(dx) < Math.abs(dy) * 1.15) return
        if (dx > 0) goPrev()
        else goNext()
      }}
    >
      {prev ? (
        <div className="day-edge-zone prev">
          <button
            type="button"
            className="day-edge-btn"
            onClick={goPrev}
            aria-label={`前一天 Day ${prev.day}`}
          >
            ‹
          </button>
        </div>
      ) : null}
      {next ? (
        <div className="day-edge-zone next">
          <button
            type="button"
            className="day-edge-btn"
            onClick={goNext}
            aria-label={`下一天 Day ${next.day}`}
          >
            ›
          </button>
        </div>
      ) : null}

      <div className="day-scroller" ref={scrollerRef} role="tablist" aria-label="選擇天數">
        {days.map((d) => (
          <button
            key={d.day}
            type="button"
            role="tab"
            aria-selected={d.day === day.day}
            className={d.day === day.day ? 'day-pill active' : 'day-pill'}
            onClick={() => onSelectDay(d.day)}
          >
            <em>D{d.day}</em>
            <span>{d.date}</span>
          </button>
        ))}
      </div>

      <header className="day-hero">
        <p className="eyebrow">
          Day {day.day}　{day.date}（{day.weekday}）
        </p>
        <h1>{day.title}</h1>
        {day.subtitle && <p className="hero-sub">{day.subtitle}</p>}
        <p className="city-line">{day.cityLabel}</p>
        {day.note && <p className="note">{day.note}</p>}
        <button
          type="button"
          className="text-btn share-day"
          onClick={() =>
            shareLink(`Day ${day.day} ${day.title}`, `${day.date} ${day.title}`)
          }
        >
          分享這一天
        </button>
        {cover && (
          <button
            type="button"
            className="day-cover"
            onClick={() => onOpenPlace(cover.id)}
          >
            <img src={placeImage(cover)} alt={cover.name} />
            <span>{cover.name}</span>
          </button>
        )}
      </header>

      <section className="section">
        <h2>時間軸</h2>
        <ol className="timeline">
          {day.schedule.map((item) => (
            <li key={`${item.time}-${item.title}`} className="tl-item">
              <div className="tl-time">{item.time}</div>
              <div className="tl-body">
                <strong>{item.title}</strong>
                {item.transit ? (
                  <p className="tl-transit">
                    <span aria-hidden="true">→</span>
                    {item.transit}
                  </p>
                ) : null}
                {item.note && <p>{item.note}</p>}
                <PlaceChips ids={item.placeIds} onOpen={onOpenPlace} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2>餐飲</h2>
        <div className="card">
          <MealBlock label="早餐" meal={day.meals.breakfast} onOpenPlace={onOpenPlace} />
          <MealBlock label="午餐" meal={day.meals.lunch} onOpenPlace={onOpenPlace} />
          <MealBlock label="晚餐" meal={day.meals.dinner} onOpenPlace={onOpenPlace} />
        </div>
      </section>

      <section className="section">
        <h2>交通與住宿</h2>
        <div className="card meta-card">
          <div>
            <span className="meta-label">交通</span>
            <p>{day.transport}</p>
          </div>
          <div>
            <span className="meta-label">住宿</span>
            <p>{day.lodging}</p>
            <PlaceChips
              ids={day.lodgingPlaceId ? [day.lodgingPlaceId] : undefined}
              onOpen={onOpenPlace}
            />
          </div>
        </div>
      </section>

      <nav className="day-nav" aria-label="前後天行程">
        {prev ? (
          <button type="button" className="day-nav-btn prev" onClick={goPrev}>
            <span>前一天</span>
            <strong>
              Day {prev.day} · {prev.title}
            </strong>
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button type="button" className="day-nav-btn next" onClick={goNext}>
            <span>下一天</span>
            <strong>
              Day {next.day} · {next.title}
            </strong>
          </button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
