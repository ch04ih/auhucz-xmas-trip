import { days345 } from './days-345'
import { days444 } from './days-444'
import type { DayPlan, HotelCityGroup } from './types'

export type StayPlanId = '3-4-5' | '4-4-4'

export interface StayCitySummary {
  name: string
  nights: string
  dates: string
}

export interface BudgetLine {
  label: string
  detail: string
  price: number
  placeId?: string
}

export interface StayPlan {
  id: StayPlanId
  label: string
  blurb: string
  cities: StayCitySummary[]
  hotelCities: HotelCityGroup[]
  days: DayPlan[]
  ticketItems: BudgetLine[]
  optionalTicketItems: BudgetLine[]
}

const hotelCities345: HotelCityGroup[] = [
  {
    cityId: 'budapest',
    city: '布達佩斯',
    nights: '3 晚',
    dates: '12/11 – 12/14',
    defaultOptionId: 'basiliq-suite',
    options: [
      {
        id: 'hotel-vision',
        placeId: 'hotel-vision',
        name: '美景飯店－大陸集團',
        room: '雙床房',
        price: 16314,
        stars: 4,
        note: '2020 開幕',
        summary: '市區方便、性價比高；房間較普通，適合想省預算。',
      },
      {
        id: 'basiliq-exec',
        placeId: 'basiliq',
        name: 'BasiliQ Hotel',
        room: '行政房',
        price: 19961,
        stars: 4,
        note: '不可退 · 2025 開幕',
        summary: '全新四星，走路就到聖殿大教堂市集；行政房新淨實用。',
        imageId: 'basiliq-room',
      },
      {
        id: 'basiliq-suite',
        placeId: 'basiliq',
        name: 'BasiliQ Hotel',
        room: '招牌套房（聖殿大教堂景觀）',
        price: 22787,
        stars: 4,
        note: '不可退 · 含四客早餐 · 2025 開幕',
        summary: '窗景正對大教堂，市集夜景超加分；空間比行政房寬，推薦首選。',
      },
      {
        id: 'kempinski',
        placeId: 'kempinski',
        name: 'Kempinski Hotel Corvinus',
        room: '高級雙床房',
        price: 25248,
        stars: 5,
        note: '不可退 · 2025 翻新',
        summary: '五星旗艦、服務與隔音最好；價格最高，住得最穩。',
      },
    ],
  },
  {
    cityId: 'vienna',
    city: '維也納',
    nights: '4 晚',
    dates: '12/14 – 12/18',
    defaultOptionId: 'jaz-vienna',
    options: [
      {
        id: 'ibis-wien',
        placeId: 'ibis-wien',
        name: '宜必思維也納中央火車站飯店',
        room: '雙床房',
        price: 24899,
        stars: 3,
        note: '不可退 · 2017 開幕',
        summary: '貼著中央車站，轉車最省事；房間基本，去老城要搭地鐵。',
      },
      {
        id: 'spark-hilton',
        placeId: 'spark-hilton',
        name: '希爾頓維也納多瑙城區 Spark 飯店',
        room: '雙床房',
        price: 22364,
        stars: 4,
        note: '2022 開幕',
        summary: '新、乾淨、價位友善；在多瑙城區，每天進老城通勤稍遠。',
      },
      {
        id: 'jaz-vienna',
        placeId: 'jaz-vienna',
        name: '維也納城市爵士飯店',
        room: '悠音房',
        price: 27042,
        stars: 4,
        note: '不可退 · 2021 開幕',
        summary: '設計感強、地鐵方便；氣氛好，比車站飯店更有度假感。',
      },
      {
        id: 'hilton-vienna-park',
        placeId: 'hilton-vienna-park',
        name: '希爾頓維也納公園飯店',
        room: '雙床房',
        price: 43636,
        stars: 5,
        note: '不可退 · 2020 翻新',
        summary: '五星、靠市政廳公園與市集；位置與舒適度最好，也最貴。',
      },
    ],
  },
  {
    cityId: 'prague',
    city: '布拉格',
    nights: '5 晚',
    dates: '12/18 – 12/23',
    defaultOptionId: 'hilton-prague',
    options: [
      {
        id: 'botanique',
        placeId: 'botanique',
        name: '布拉格植物園飯店',
        room: '雙床房',
        price: 32814,
        stars: 4,
        note: '不可退 · 2024 翻新',
        summary: '四星舒適、相對省錢；離老城稍遠，進出多半要叫車或搭電車。',
      },
      {
        id: 'hilton-prague',
        placeId: 'hilton-prague',
        name: '布拉格古城希爾頓飯店',
        room: '希爾頓雙床房',
        price: 38022,
        stars: 5,
        note: '不可退 · 2016 翻新',
        summary:
          '過馬路即進入老城徒步區，步行至老城廣場約10分鐘、查理大橋20分鐘，治安極佳，鄰近大型購物中心，但觀光人潮較多。',
      },
    ],
  },
]

const hotelCities444: HotelCityGroup[] = [
  {
    cityId: 'budapest',
    city: '布達佩斯',
    nights: '4 晚',
    dates: '12/11 – 12/15',
    defaultOptionId: 'basiliq-exec',
    options: [
      {
        id: 'basiliq-exec',
        placeId: 'basiliq',
        name: 'BasiliQ Hotel',
        room: '高級房',
        price: 25794,
        stars: 4,
        note: '含 2 客早餐 · 12/8 23:59 前可免費取消 · 2025 開幕',
        summary:
          '全新四星，走路就到聖殿大教堂市集；高級房新淨實用，含兩客早餐，取消期限前可免費退改。',
        imageId: 'basiliq-room',
      },
    ],
  },
  {
    cityId: 'vienna',
    city: '維也納',
    nights: '4 晚',
    dates: '12/15 – 12/19',
    defaultOptionId: 'miiro-spittelberg',
    options: [
      {
        id: 'miiro-spittelberg',
        placeId: 'miiro-spittelberg',
        name: 'Miiro Spittelberg',
        room: '典雅特大床間',
        price: 31503,
        stars: 4,
        note: '不可退款 · 2025 翻新',
        summary:
          '鄰近老城區，位於Spittelberg文青巷、博物館區正後方。穿過博物館即達霍夫堡，維也納老城區能靠雙腳逛完。',
      },
      {
        id: 'jaz-vienna',
        placeId: 'jaz-vienna',
        name: '維也納城市爵士飯店',
        room: '悠音房',
        price: 22991,
        stars: 4,
        note: '2021 開幕',
        summary: '設計感強、地鐵方便；氣氛好，比車站飯店更有度假感。',
      },
    ],
  },
  {
    cityId: 'prague',
    city: '布拉格',
    nights: '4 晚',
    dates: '12/19 – 12/23',
    defaultOptionId: 'hotel-cube',
    options: [
      {
        id: 'hilton-prague',
        placeId: 'hilton-prague',
        name: '布拉格古城希爾頓飯店',
        room: '希爾頓雙床房',
        price: 31100,
        stars: 5,
        note: '2016 翻新',
        summary:
          '過馬路即進入老城徒步區，步行至老城廣場約10分鐘、查理大橋20分鐘，治安極佳，鄰近大型購物中心，但觀光人潮較多。',
      },
      {
        id: 'hotel-cube',
        placeId: 'hotel-cube',
        name: 'Hotel Cube',
        room: '高級房',
        price: 26207,
        stars: 4,
        note: '不可退款 · 含 2 客早餐 · 2022 開幕',
        summary:
          '精選四星飯店第2名，位於新城區河畔，鄰近國家歌劇院。交通方便，步行至查理大橋 12 分鍾、電車至老城廣場 5 分鍾。治安極佳，周邊屬於高級文教住宅區。',
      },
    ],
  },
]

function ticketBundle(days: {
  belvedere: number
  opera: number
  schonbrunn: number
  pragueCastle: number
}): { ticketItems: BudgetLine[]; optionalTicketItems: BudgetLine[] } {
  return {
    ticketItems: [
      {
        label: '薩爾斯堡 & 哈修塔特一日遊',
        detail: 'Klook 團體日遊',
        price: 3733,
        placeId: 'klook-daytrip',
      },
      {
        label: '國會大廈內部導覽',
        detail: 'Day 3 · 非歐盟成人 14,000 HUF，含中文語音導覽',
        price: 1445,
        placeId: 'parliament',
      },
      {
        label: '塞切尼溫泉',
        detail: 'Day 4 週四 · 平日全日票含置物櫃 13,200 HUF',
        price: 1362,
        placeId: 'szechenyi',
      },
      {
        label: '多瑙河夜航',
        detail: 'Day 4 · 參考 Legenda 官網晚間航程約 €25，含中文語音',
        price: 934,
        placeId: 'danube-cruise',
      },
      {
        label: '美景宮上宮（克林姆特《吻》）',
        detail: `Day ${days.belvedere} · 官網上宮成人 €23`,
        price: 859,
        placeId: 'belvedere',
      },
    ],
    optionalTicketItems: [
      {
        label: '布達城堡纜車',
        detail: 'Day 3 · 官網單程 4,500 HUF（上山後走路下山；也可改搭巴士）',
        price: 464,
        placeId: 'funicular',
      },
      {
        label: '美泉宮宮殿（若進宮）',
        detail: `Day ${days.schonbrunn} · Palace Ticket 成人 €42，含語音導覽；冬季價可能微調`,
        price: 1569,
        placeId: 'schonbrunn',
      },
      {
        label: '布拉格城堡套票',
        detail: `Day ${days.pragueCastle} · 主迴路成人 450 CZK（聖維特、舊皇宮、黃金巷）`,
        price: 695,
        placeId: 'prague-castle',
      },
      {
        label: '維也納國家歌劇院',
        detail: `Day ${days.opera} · 官網站票 Parterre €18；座位視劇目另計`,
        price: 672,
        placeId: 'staatsoper',
      },
      {
        label: '金色大廳音樂會',
        detail: `Day ${days.opera} · 官網站票 Stehplatz €8 起；座位依節目 €30 起`,
        price: 299,
        placeId: 'musikverein',
      },
    ],
  }
}

const tickets345 = ticketBundle({
  belvedere: 6,
  opera: 8,
  schonbrunn: 6,
  pragueCastle: 11,
})

const tickets444 = ticketBundle({
  belvedere: 7,
  opera: 9,
  schonbrunn: 7,
  pragueCastle: 12,
})

export const stayPlans: StayPlan[] = [
  {
    id: '3-4-5',
    label: '3 / 4 / 5',
    blurb: '布達佩斯 3 晚、維也納 4 晚、布拉格 5 晚（含高堡日）',
    cities: [
      { name: '布達佩斯', nights: '3 晚', dates: '12/11–14' },
      { name: '維也納', nights: '4 晚', dates: '12/14–18' },
      { name: '布拉格', nights: '5 晚', dates: '12/18–23' },
    ],
    hotelCities: hotelCities345,
    days: days345,
    ...tickets345,
  },
  {
    id: '4-4-4',
    label: '4 / 4 / 4',
    blurb: '三城各 4 晚；布達多一天放鬆，布拉格拿掉高堡',
    cities: [
      { name: '布達佩斯', nights: '4 晚', dates: '12/11–15' },
      { name: '維也納', nights: '4 晚', dates: '12/15–19' },
      { name: '布拉格', nights: '4 晚', dates: '12/19–23' },
    ],
    hotelCities: hotelCities444,
    days: days444,
    ...tickets444,
  },
]

export const defaultStayPlanId: StayPlanId = '4-4-4'

export function getStayPlan(id: StayPlanId): StayPlan {
  return stayPlans.find((p) => p.id === id) ?? stayPlans[1]
}

export const defaultHotelSelection: Record<HotelCityGroup['cityId'], string> = {
  budapest: 'basiliq-exec',
  vienna: 'miiro-spittelberg',
  prague: 'hotel-cube',
}

export function hotelOptionById(
  id: string,
  cities: HotelCityGroup[],
): HotelCityGroup['options'][number] | undefined {
  for (const city of cities) {
    const found = city.options.find((opt) => opt.id === id)
    if (found) return found
  }
  return undefined
}

export function hotelPerPersonFromSelection(
  selection: Record<HotelCityGroup['cityId'], string>,
  cities: HotelCityGroup[],
): number {
  const total = cities.reduce((sum, city) => {
    const opt =
      city.options.find((o) => o.id === selection[city.cityId]) ??
      city.options.find((o) => o.id === city.defaultOptionId) ??
      city.options[0]
    return sum + opt.price
  }, 0)
  return Math.round(total / 2)
}
