export type Tab = 'home' | 'itinerary' | 'budget' | 'places' | 'info'

export type CityId =
  | 'taipei'
  | 'vienna'
  | 'budapest'
  | 'salzburg'
  | 'hallstatt'
  | 'prague'
  | 'inflight'

export type PlaceCategory =
  | 'attraction'
  | 'market'
  | 'restaurant'
  | 'cafe'
  | 'hotel'
  | 'transport'
  | 'shop'
  | 'experience'

export type PlacesListCategory = 'places' | 'dining'

export interface Place {
  id: string
  name: string
  nameEn?: string
  city: CityId
  category: PlaceCategory
  intro: string
  /** 導覽會講的典故；多條用 '\n' 分隔，「標題：內容」會加粗標題 */
  story?: string
  /** 門票或每人大約花費 */
  price?: string
  /** 行程當週適用的開放／營業時間 */
  hours?: string
  /** 建議停留多久 */
  duration?: string
  tip?: string
  mapsQuery?: string
  image?: string
  /** 大圖被裁切時保留的位置（CSS object-position），預設置中 */
  imagePosition?: string
}

export interface Meal {
  label: string
  time?: string
  placeIds?: string[]
}

export interface ShopPick {
  name: string
  feature: string
  price: string
  mapsQuery: string
}

export interface ScheduleItem {
  time: string
  title: string
  /** 一眼要看到的關鍵資訊（入場、關門、集合時間）；其餘放 note 收進「詳細介紹」 */
  brief?: string
  note?: string
  /** 從前一個行程到這裡的交通，例：「Bolt 約 10 分」 */
  transit?: string
  placeIds?: string[]
  /** 不另建景點的推薦店家，列在「詳細介紹」 */
  shops?: ShopPick[]
}

export interface DayPlan {
  day: number
  date: string
  weekday: string
  title: string
  subtitle?: string
  cityLabel: string
  cityIds: CityId[]
  coverPlaceId?: string
  note?: string
  schedule: ScheduleItem[]
  meals: {
    breakfast?: Meal
    lunch?: Meal
    dinner?: Meal
  }
  transport: string
  lodging: string
  lodgingPlaceId?: string
}

export interface HotelStay {
  city: string
  nights: string
  dates: string
  stars: number
  placeId: string
  room: string
  price: number
  note?: string
}

export interface HotelOption {
  id: string
  placeId: string
  name: string
  room: string
  price: number
  /** 到飯店現場另付的歐元（預付價 price 不含） */
  payAtHotelEur?: number
  stars: number
  note?: string
  summary: string
  imageId?: string
}

export interface HotelCityGroup {
  cityId: 'budapest' | 'vienna' | 'prague'
  city: string
  nights: string
  dates: string
  defaultOptionId: string
  options: HotelOption[]
}

export interface FlightCabin {
  cabin: string
  price: number
}

export interface FlightPlan {
  id: string
  label: string
  note?: string
  cabins: FlightCabin[]
  legs: FlightLeg[]
}

export interface FlightOption {
  cabin: string
  price: number
}

export interface FlightLeg {
  route: string
  detail: string
}
