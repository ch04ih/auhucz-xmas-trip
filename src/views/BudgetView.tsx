import { useMemo, useState } from 'react'
import { FadeImage } from '../components/FadeImage'
import { FlightSummary } from '../components/FlightSummary'
import { placeImage } from '../data/places'
import {
  defaultHotelSelection,
  flightPlans,
  formatTwd,
  hotelPerPersonFromSelection,
  transportItems,
} from '../data/trip'
import type { HotelCityGroup, HotelOption } from '../data/types'
import { useStayPlan } from '../lib/StayPlanContext'

interface Props {
  onOpenPlace: (id: string) => void
}

interface BudgetRow {
  label: string
  detail: string
  price: number
  placeId?: string
}

function BudgetCards({
  items,
  onOpenPlace,
}: {
  items: BudgetRow[]
  onOpenPlace: (id: string) => void
}) {
  return (
    <div className="stack">
      {items.map((item) =>
        item.placeId ? (
          <button
            key={item.label}
            type="button"
            className="budget-card"
            onClick={() => onOpenPlace(item.placeId!)}
          >
            <div>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </div>
            <em>{formatTwd(item.price)}</em>
          </button>
        ) : (
          <div key={item.label} className="budget-card static">
            <div>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </div>
            <em>{formatTwd(item.price)}</em>
          </div>
        ),
      )}
    </div>
  )
}

function hotelMeta(opt: HotelOption) {
  const bits = [`${'★'.repeat(opt.stars)}`, opt.room]
  if (opt.note) bits.push(opt.note)
  return bits.join(' · ')
}

export function BudgetView({ onOpenPlace }: Props) {
  const { plan } = useStayPlan()
  const hotelCities = plan.hotelCities
  const ticketItems = plan.ticketItems
  const optionalTicketItems = plan.optionalTicketItems

  const flightPlan = flightPlans[0]
  const flight = flightPlan.cabins[0]
  const [hotelSelection, setHotelSelection] = useState(defaultHotelSelection)
  const [expandedCities, setExpandedCities] = useState<
    Partial<Record<HotelCityGroup['cityId'], boolean>>
  >({})

  const transportSum = transportItems.reduce((s, i) => s + i.price, 0)
  const ticketSum = ticketItems.reduce((s, i) => s + i.price, 0)
  const hotelPerPerson = useMemo(
    () => hotelPerPersonFromSelection(hotelSelection, hotelCities),
    [hotelSelection, hotelCities],
  )
  const total = flight.price + hotelPerPerson + transportSum + ticketSum

  const selectHotel = (cityId: HotelCityGroup['cityId'], optionId: string) => {
    setHotelSelection((prev) => ({ ...prev, [cityId]: optionId }))
    setExpandedCities((prev) => ({ ...prev, [cityId]: false }))
  }

  const toggleCity = (cityId: HotelCityGroup['cityId']) => {
    setExpandedCities((prev) => ({ ...prev, [cityId]: !prev[cityId] }))
  }

  return (
    <div className="page budget-page">
      <header className="page-head">
        <p className="eyebrow">Budget / person</p>
        <h1>預算總覽</h1>
        <p className="hero-sub">
          以每人計算；飯店為雙人房總價除以 2。
        </p>
      </header>

      <div className="total-card">
        <span>預估每人</span>
        <strong>{formatTwd(total)}</strong>
        <p>
          機票 {formatTwd(flight.price)}　住宿 {formatTwd(hotelPerPerson)}　交通{' '}
          {formatTwd(transportSum)}　門票 {formatTwd(ticketSum)}
        </p>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>機票</h2>
        </div>
        <FlightSummary />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>住宿</h2>
          <span className="muted">每人 {formatTwd(hotelPerPerson)}</span>
        </div>
        <div className="hotel-city-stack">
          {hotelCities.map((city) => {
            const selectedId = hotelSelection[city.cityId]
            const selected =
              city.options.find((o) => o.id === selectedId) ??
              city.options.find((o) => o.id === city.defaultOptionId) ??
              city.options[0]
            const expanded = Boolean(expandedCities[city.cityId])
            const others = city.options.filter((o) => o.id !== selected.id)
            const visibleOptions = expanded ? [selected, ...others] : [selected]

            return (
              <div key={city.cityId} className="hotel-city">
                <div className="hotel-city-head">
                  <p className="hotel-city-label">
                    {city.city}
                    <span>
                      {city.nights} · {city.dates}
                    </span>
                  </p>
                  {others.length > 0 ? (
                    <button
                      type="button"
                      className={expanded ? 'hotel-toggle open' : 'hotel-toggle'}
                      aria-expanded={expanded}
                      aria-label={expanded ? `收合${city.city}其他飯店` : `展開${city.city}其他飯店`}
                      onClick={() => toggleCity(city.cityId)}
                    >
                      <span>{expanded ? '收合' : `其他 ${others.length} 間`}</span>
                      <em aria-hidden="true">⌄</em>
                    </button>
                  ) : null}
                </div>
                <div className="hotel-option-stack">
                  {visibleOptions.map((opt) => {
                    const active = opt.id === selected.id
                    const imgId = opt.imageId ?? opt.placeId
                    return (
                      <div
                        key={opt.id}
                        className={active ? 'hotel-option active' : 'hotel-option'}
                      >
                        <button
                          type="button"
                          className="hotel-option-main"
                          onClick={() => selectHotel(city.cityId, opt.id)}
                        >
                          <FadeImage src={placeImage(imgId)} alt="" />
                          <div className="hotel-option-body">
                            <strong>{opt.name}</strong>
                            <span>{hotelMeta(opt)}</span>
                            {expanded ? <p>{opt.summary}</p> : null}
                          </div>
                          <em className="hotel-price">{formatTwd(opt.price)}</em>
                        </button>
                        <button
                          type="button"
                          className="hotel-option-link"
                          onClick={() => onOpenPlace(opt.placeId)}
                        >
                          看介紹
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>交通</h2>
          <span className="muted">{formatTwd(transportSum)}</span>
        </div>
        <BudgetCards items={transportItems} onOpenPlace={onOpenPlace} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>景點門票</h2>
          <span className="muted">{formatTwd(ticketSum)}</span>
        </div>
        <BudgetCards items={ticketItems} onOpenPlace={onOpenPlace} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>選擇性門票</h2>
          <span className="muted">未列入總額</span>
        </div>
        <BudgetCards items={optionalTicketItems} onOpenPlace={onOpenPlace} />
      </section>
    </div>
  )
}
