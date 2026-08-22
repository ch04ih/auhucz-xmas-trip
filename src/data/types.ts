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
  /** 簡短趣事／傳說，獨立色塊顯示 */
  story?: string
  tip?: string
  mapsQuery?: string
  image?: string
}

export interface Meal {
  label: string
  time?: string
  placeIds?: string[]
}

export interface ScheduleItem {
  time: string
  title: string
  note?: string
  /** 從前一個行程到這裡的交通，例：「Bolt 約 10 分」 */
  transit?: string
  placeIds?: string[]
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
