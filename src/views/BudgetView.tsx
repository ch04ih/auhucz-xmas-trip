import { useState } from 'react'
import {
  flightLegs,
  flightOptions,
  formatTwd,
  hotelPerPerson,
  hotels,
  optionalTicketItems,
  ticketItems,
  transportItems,
} from '../data/trip'

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
  const flight = flightOptions[cabin]
  const transportSum = transportItems.reduce((s, i) => s + i.price, 0)
  const ticketSum = ticketItems.reduce((s, i) => s + i.price, 0)
  const total = flight.price + hotelPerPerson + transportSum + ticketSum

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Budget / person</p>
        <h1>預算總覽</h1>
        <p className="hero-sub">以每人計算。飯店房價另列出雙床房總價供對照。</p>
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
        <div className="stack">
          {hotels.map((h) => (
            <button
              key={h.placeId}
              type="button"
              className="budget-card"
              onClick={() => onOpenPlace(h.placeId)}
            >
              <div>
                <strong>
                  {h.city}　{h.nights}
                </strong>
                <span>
                  {h.dates}　{'★'.repeat(h.stars)}
                </span>
                <span>
                  {h.room}
                  {h.note ? ` · ${h.note}` : ''}
                </span>
              </div>
              <em>{formatTwd(h.price)}</em>
            </button>
          ))}
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
