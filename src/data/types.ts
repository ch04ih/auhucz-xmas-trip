export type Tab = 'home' | 'itinerary' | 'budget' | 'places' | 'info'

export type CityId =
  | 'taipei'
  | 'vienna'
  | 'budapest'
  | 'salzburg'
  | 'hallstatt'
  | 'ck'
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

export interface Place {
  id: string
  name: string
  nameEn?: string
  city: CityId
  category: PlaceCategory
  intro: string
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

export interface FlightOption {
  cabin: string
  price: number
}

export interface FlightLeg {
  route: string
  detail: string
}
