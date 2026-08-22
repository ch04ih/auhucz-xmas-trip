import type { DayPlan, FlightLeg, FlightPlan } from './types'
import {
  defaultHotelSelection,
  defaultStayPlanId,
  getStayPlan,
  hotelPerPersonFromSelection,
} from './stayPlans'

export const tripMeta = {
  title: '🎄 奧匈捷 14 天聖誕市集',
  nights: '14 天 13 夜',
  start: '2026-12-10',
  end: '2026-12-24',
  dateRangeLabel: '12/10 – 12/24',
  year: 2026,
}

/** 已訂：華航豪經艙。星宇方案保留供日後比較。 */
export const flightPlans: FlightPlan[] = [
  {
    id: 'ci',
    label: '華航',
    cabins: [{ cabin: '豪經艙', price: 63375 }],
    legs: [
      { route: '台北 ➜ 維也納', detail: '12/10 23:35 – 12/11 06:50　華航 CI63' },
      { route: '布拉格 ➜ 台北', detail: '12/23 10:30 – 12/24 05:25　華航 CI68' },
    ],
  },
  {
    id: 'jx',
    label: '星宇',
    note: '直飛布拉格；回程可選 12/22–23 或 12/19–20',
    cabins: [
      { cabin: '經濟艙', price: 30674 },
      { cabin: '豪經艙', price: 60914 },
    ],
    legs: [
      { route: '台北 ➜ 布拉格', detail: '12/11 00:05 – 12/11 08:15　星宇 JX101' },
      {
        route: '布拉格 ➜ 台北',
        detail: '12/25 10:25 – 12/26 05:20　星宇 JX102（或改 12/22–23）',
      },
    ],
  },
]

export const defaultFlightPlanId = 'ci'

export const flightLegs: FlightLeg[] =
  flightPlans.find((p) => p.id === defaultFlightPlanId)?.legs ?? flightPlans[0].legs

export const flightOptions = flightPlans[0].cabins

export { defaultHotelSelection, defaultStayPlanId, getStayPlan, hotelPerPersonFromSelection }
export {
  stayPlans,
  type StayPlan,
  type StayPlanId,
} from './stayPlans'

export const hotelCities = getStayPlan(defaultStayPlanId).hotelCities
export const days = getStayPlan(defaultStayPlanId).days
export const ticketItems = getStayPlan(defaultStayPlanId).ticketItems
export const optionalTicketItems = getStayPlan(defaultStayPlanId).optionalTicketItems
export const hotelPerPerson = hotelPerPersonFromSelection(
  defaultHotelSelection,
  hotelCities,
)

export const transportItems = [
  {
    label: '維也納機場 ➜ 中央車站',
    detail: 'Day 2 · €19.9',
    price: 743,
    placeId: 'wien-hbf',
  },
  {
    label: '維也納 ➜ 布達佩斯',
    detail: 'ÖBB 火車頭等艙 €35.4',
    price: 1324,
    placeId: 'obb',
  },
  {
    label: '布達佩斯 ➜ 維也納',
    detail: 'ÖBB 火車頭等艙 €31.4',
    price: 1174,
    placeId: 'obb',
  },
  {
    label: '維也納 ➜ 布拉格',
    detail: 'ÖBB 火車頭等艙 €32　15:10–19:23',
    price: 1195,
    placeId: 'obb',
  },
  {
    label: '布拉格飯店 ➜ 機場專車',
    detail: 'Day 14 · 每人 $1,000',
    price: 1000,
    placeId: 'prg-airport',
  },
]

export function formatTwd(n: number): string {
  return `$${n.toLocaleString('zh-TW')}`
}

export function getDayByNumber(
  day: number,
  days = getStayPlan(defaultStayPlanId).days,
): DayPlan | undefined {
  return days.find((d) => d.day === day)
}

export function placesForDay(day: DayPlan): string[] {
  const ids = new Set<string>()
  for (const item of day.schedule) {
    item.placeIds?.forEach((id) => ids.add(id))
  }
  for (const meal of Object.values(day.meals)) {
    meal?.placeIds?.forEach((id) => ids.add(id))
  }
  if (day.lodgingPlaceId) ids.add(day.lodgingPlaceId)
  return [...ids]
}
