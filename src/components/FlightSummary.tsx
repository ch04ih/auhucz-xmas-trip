import { flightLegs, flightPlans, formatTwd, trainLegs } from '../data/trip'
import type { FlightLeg } from '../data/types'

const flightPrice = flightPlans[0].cabins[0].price

/** 出發日期抽出來放左欄當唯一重點，其餘時間、班次放右邊小字 */
function LegRow({ leg }: { leg: FlightLeg }) {
  const match = leg.detail.match(/^(\d{1,2}\/\d{1,2}(?:（.）)?)\s*(.*)$/)
  const date = match?.[1] ?? ''
  const rest = match ? match[2] : leg.detail
  return (
    <div className="flight-leg-row">
      <span className="leg-date">{date}</span>
      <span className="leg-main">
        <span className="flight-leg-route">{leg.route}</span>
        <span className="flight-leg-detail">{rest}</span>
      </span>
    </div>
  )
}

export function FlightSummary({ showPrice = true }: { showPrice?: boolean }) {
  return (
    <div className="list-card flight-summary">
      <div className="flight-summary-head">
        <strong className="flight-summary-title">華航 · 豪經艙</strong>
        {showPrice && <em className="flight-summary-price">{formatTwd(flightPrice)}／人</em>}
      </div>
      <div className="flight-summary-legs">
        {flightLegs.map((leg) => (
          <LegRow key={leg.route} leg={leg} />
        ))}
      </div>
    </div>
  )
}

export function TrainSummary() {
  return (
    <div className="list-card flight-summary">
      <div className="flight-summary-head">
        <strong className="flight-summary-title">ÖBB 火車 · 頭等艙</strong>
      </div>
      <div className="flight-summary-legs">
        {trainLegs.map((leg) => (
          <LegRow key={leg.route} leg={leg} />
        ))}
      </div>
    </div>
  )
}
