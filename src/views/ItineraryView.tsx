import { useEffect, useRef } from 'react'
import { FadeImage } from '../components/FadeImage'
import { PlaceChips } from '../components/PlaceChips'
import { getPlace, placeImage } from '../data/places'
import type { DayPlan } from '../data/types'
import { warmDayCovers } from '../lib/preloadImages'
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
  const { resolvedDays: days } = useStayPlan()
  const day: DayPlan = days.find((d) => d.day === dayNumber) ?? days[0]
  const prev = days.find((d) => d.day === day.day - 1)
  const next = days.find((d) => d.day === day.day + 1)
  const cover = day.coverPlaceId ? getPlace(day.coverPlaceId) : undefined
  const scrollerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const dayRef = useRef(day)
  const prevRef = useRef(prev)
  const nextRef = useRef(next)
  const touchStart = useRef<{
    x: number
    y: number
    ignore: boolean
    axis: 'undecided' | 'x' | 'y'
  } | null>(null)
  const animating = useRef(false)
  const pendingDay = useRef<number | null>(null)
  const pendingDir = useRef<'prev' | 'next' | null>(null)

  dayRef.current = day
  prevRef.current = prev
  nextRef.current = next

  const setPanelX = (x: number, withTransition: boolean) => {
    const el = panelRef.current
    if (!el) return
    el.style.transition = withTransition
      ? 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)'
      : 'none'
    el.style.transform = `translate3d(${x}px, 0, 0)`
  }

  const finishPending = () => {
    const target = pendingDay.current
    if (target == null) return
    pendingDay.current = null
    // Keep panel off-screen; the day effect will slide the new card in.
    onSelectDay(target)
  }

  const slideToDay = (targetDay: number, direction: 'prev' | 'next') => {
    if (animating.current || targetDay === dayRef.current.day) return
    const width = viewportRef.current?.clientWidth ?? window.innerWidth
    animating.current = true
    pendingDay.current = targetDay
    pendingDir.current = direction
    setPanelX(direction === 'next' ? -width : width, true)
  }

  const goPrev = () => {
    const p = prevRef.current
    if (p) slideToDay(p.day, 'prev')
  }

  const goNext = () => {
    const n = nextRef.current
    if (n) slideToDay(n.day, 'next')
  }

  const selectDay = (target: number) => {
    if (target === day.day) return
    slideToDay(target, target > day.day ? 'next' : 'prev')
  }

  const bounceBack = () => {
    animating.current = true
    setPanelX(0, true)
    window.setTimeout(() => {
      animating.current = false
    }, 320)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const active = scrollerRef.current?.querySelector<HTMLButtonElement>('.day-pill.active')
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    warmDayCovers(days, day.day)

    const dir = pendingDir.current
    if (dir) {
      pendingDir.current = null
      const width = viewportRef.current?.clientWidth ?? window.innerWidth
      setPanelX(dir === 'next' ? width : -width, false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPanelX(0, true)
        })
      })
    } else {
      setPanelX(0, false)
      animating.current = false
    }
  }, [day.day, days])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const onStart = (e: TouchEvent) => {
      if (animating.current) return
      const t = e.touches[0]
      const target = e.target as HTMLElement | null
      touchStart.current = {
        x: t.clientX,
        y: t.clientY,
        ignore: Boolean(target?.closest('.day-scroller, .chips, a, input, textarea, select')),
        axis: 'undecided',
      }
    }

    const onMove = (e: TouchEvent) => {
      const start = touchStart.current
      if (!start || start.ignore || animating.current) return
      const t = e.touches[0]
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (start.axis === 'undecided') {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        start.axis = Math.abs(dx) > Math.abs(dy) * 1.1 ? 'x' : 'y'
        if (start.axis === 'y') return
      }
      if (start.axis !== 'x') return
      if (e.cancelable) e.preventDefault()
      let x = dx
      if ((!prevRef.current && dx > 0) || (!nextRef.current && dx < 0)) x = dx * 0.28
      setPanelX(x, false)
    }

    const onEnd = (e: TouchEvent) => {
      const start = touchStart.current
      touchStart.current = null
      if (!start || start.ignore || start.axis !== 'x' || animating.current) {
        setPanelX(0, true)
        return
      }
      const t = e.changedTouches[0]
      const dx = t.clientX - start.x
      const width = viewport.clientWidth
      const threshold = Math.min(72, width * 0.18)
      if (dx > threshold && prevRef.current) {
        slideToDay(prevRef.current.day, 'prev')
        return
      }
      if (dx < -threshold && nextRef.current) {
        slideToDay(nextRef.current.day, 'next')
        return
      }
      bounceBack()
    }

    const onCancel = () => {
      touchStart.current = null
      if (!animating.current) bounceBack()
    }

    viewport.addEventListener('touchstart', onStart, { passive: true })
    viewport.addEventListener('touchmove', onMove, { passive: false })
    viewport.addEventListener('touchend', onEnd)
    viewport.addEventListener('touchcancel', onCancel)
    return () => {
      viewport.removeEventListener('touchstart', onStart)
      viewport.removeEventListener('touchmove', onMove)
      viewport.removeEventListener('touchend', onEnd)
      viewport.removeEventListener('touchcancel', onCancel)
    }
  }, [onSelectDay])

  return (
    <div className="page itinerary-page">
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
            onClick={() => selectDay(d.day)}
          >
            <em>D{d.day}</em>
            <span>{d.date}</span>
          </button>
        ))}
      </div>

      <div className="day-slide-viewport" ref={viewportRef}>
        <div
          className="day-slide-panel"
          ref={panelRef}
          onTransitionEnd={(e) => {
            if (e.target !== panelRef.current) return
            if (e.propertyName !== 'transform') return
            if (pendingDay.current != null) finishPending()
            else animating.current = false
          }}
        >
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
                <FadeImage key={cover.id} src={placeImage(cover)} alt={cover.name} />
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
      </div>
    </div>
  )
}
