import { flightLegs, flightPlans, formatTwd } from '../data/trip'

const flightPrice = flightPlans[0].cabins[0].price

export function FlightSummary() {
  return (
    <div className="list-card flight-summary">
      <div className="flight-summary-head">
        <strong className="flight-summary-title">華航 · 豪經艙</strong>
        <em className="flight-summary-price">{formatTwd(flightPrice)}／人</em>
      </div>
      <div className="flight-summary-legs">
        {flightLegs.map((leg) => (
          <div key={leg.route} className="flight-leg-row">
            <span className="flight-leg-route">{leg.route}</span>
            <span className="flight-leg-detail">{leg.detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
