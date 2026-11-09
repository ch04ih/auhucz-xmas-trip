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
  /** 華航 CI63 桃園起飛（台灣時間） */
  departure: '2026-12-10T23:35:00+08:00',
  departureLabel: '12/10（四）23:35 華航 CI63 起飛',
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
      { route: '台北 ➜ 維也納', detail: '12/10（四）23:35 – 12/11 06:50　華航 CI63' },
      { route: '布拉格 ➜ 台北', detail: '12/23（三）10:30 – 12/24 05:25　華航 CI68' },
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

/** 已訂 ÖBB 頭等艙，時間與每日行程一致 */
export const trainLegs: FlightLeg[] = [
  { route: '維也納 ➜ 布達佩斯', detail: '12/11（五）09:40 – 12:35' },
  { route: '布達佩斯 ➜ 維也納', detail: '12/15（二）11:30 – 14:20' },
  { route: '維也納 ➜ 布拉格', detail: '12/19（六）15:10 – 19:23' },
]

export const transportItems = [
  {
    label: '維也納機場 ➜ 中央車站',
    detail: 'Day 2 · €19.9',
    price: 743,
    placeId: 'wien-hbf',
  },
  {
    label: '維也納 ➜ 布達佩斯',
    detail: '已訂 · ÖBB 頭等艙 2 張共 $2,661',
    price: 1331,
    placeId: 'obb',
  },
  {
    label: '布達佩斯 ➜ 維也納',
    detail: '已訂 · ÖBB 頭等艙 2 張共 $2,703',
    price: 1352,
    placeId: 'obb',
  },
  {
    label: '維也納 ➜ 布拉格',
    detail: '已訂 · ÖBB 頭等艙 2 張共 $2,363',
    price: 1182,
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
