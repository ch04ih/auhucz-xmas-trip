import { useMemo, useState } from 'react'
import { placeImage } from '../data/places'
import {
  defaultHotelSelection,
  flightLegs,
  flightOptions,
  formatTwd,
  hotelCities,
  hotelPerPersonFromSelection,
  optionalTicketItems,
  ticketItems,
  transportItems,
} from '../data/trip'
import type { HotelCityGroup } from '../data/types'

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

export function BudgetView({ onOpenPlace }: Props) {
  const [cabin, setCabin] = useState(0)
  const [hotelSelection, setHotelSelection] = useState(defaultHotelSelection)
  const flight = flightOptions[cabin]
  const transportSum = transportItems.reduce((s, i) => s + i.price, 0)
  const ticketSum = ticketItems.reduce((s, i) => s + i.price, 0)
  const hotelPerPerson = useMemo(
    () => hotelPerPersonFromSelection(hotelSelection),
    [hotelSelection],
  )
  const total = flight.price + hotelPerPerson + transportSum + ticketSum

  const selectHotel = (cityId: HotelCityGroup['cityId'], optionId: string) => {
    setHotelSelection((prev) => ({ ...prev, [cityId]: optionId }))
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Budget / person</p>
        <h1>預算總覽</h1>
        <p className="hero-sub">以每人計算。住宿可點選比較，價格為雙床房總價。</p>
      </header>

      <div className="total-card">
        <span>預估每人（含{flight.cabin}）</span>
        <strong>{formatTwd(total)}</strong>
        <p>
          機票 {formatTwd(flight.price)} ＋ 住宿 {formatTwd(hotelPerPerson)} ＋ 交通{' '}
          {formatTwd(transportSum)} ＋ 門票 {formatTwd(ticketSum)}
        </p>
      </div>

      <section className="section">
        <h2>機票</h2>
        <div className="segment">
          {flightOptions.map((opt, i) => (
            <button
              key={opt.cabin}
              type="button"
              className={i === cabin ? 'active' : ''}
              onClick={() => setCabin(i)}
            >
              {opt.cabin}
              <em>{formatTwd(opt.price)}</em>
            </button>
          ))}
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
          <h2>住宿</h2>
          <span className="muted">每人 {formatTwd(hotelPerPerson)}</span>
        </div>
        <p className="hero-sub pending-lead">每個城市選一間；預設已選推薦組合，可再比較調整。</p>
        <div className="hotel-city-stack">
          {hotelCities.map((city) => {
            const selectedId = hotelSelection[city.cityId]
            return (
              <div key={city.cityId} className="hotel-city">
                <div className="hotel-city-head">
                  <div>
                    <strong>
                      {city.city}　{city.nights}
                    </strong>
                    <span>{city.dates}</span>
                  </div>
                </div>
                <div className="hotel-option-stack">
                  {city.options.map((opt) => {
                    const active = opt.id === selectedId
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
                          <img src={placeImage(imgId)} alt={opt.name} />
                          <div className="hotel-option-body">
                            <div className="hotel-option-title">
                              <strong>{opt.name}</strong>
                              {active ? <em className="hotel-pick">已選</em> : null}
                            </div>
                            <span>
                              {'★'.repeat(opt.stars)}
                              {opt.note ? ` · ${opt.note}` : ''}
                            </span>
                            <span>{opt.room}</span>
                            <p>{opt.summary}</p>
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
        <p className="hero-sub pending-lead">時間夠再買；外觀與市集本身免費。</p>
        <BudgetCards items={optionalTicketItems} onOpenPlace={onOpenPlace} />
      </section>
    </div>
  )
}
