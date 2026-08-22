import type { CityId, PlaceCategory } from './types'

/** WGS84 座標 */
export type MapPin = { lat: number; lng: number }

export type CityMapId = Extract<
  CityId,
  'budapest' | 'vienna' | 'prague' | 'salzburg' | 'hallstatt'
>

export interface CityMapConfig {
  center: [number, number]
  zoom: number
  hint: string
}

export const cityMapConfigs: Record<CityMapId, CityMapConfig> = {
  budapest: {
    center: [47.502, 19.045],
    zoom: 13,
    hint: 'CartoDB 輕量底圖 · 左岸布達、右岸佩斯',
  },
  vienna: {
    center: [48.206, 16.37],
    zoom: 13,
    hint: 'CartoDB 輕量底圖 · 一區老城與環城大道',
  },
  prague: {
    center: [50.087, 14.42],
    zoom: 14,
    hint: 'CartoDB 輕量底圖 · 城堡區、舊城與新城',
  },
  salzburg: {
    center: [47.803, 13.043],
    zoom: 14,
    hint: 'CartoDB 輕量底圖 · 舊城與要塞山',
  },
  hallstatt: {
    center: [47.562, 13.649],
    zoom: 15,
    hint: 'CartoDB 輕量底圖 · 哈爾施塔特湖邊',
  },
}

/** 行程與主要景點／餐廳／飯店定位（lat, lng） */
export const placeMapPins: Partial<Record<string, MapPin>> = {
  // Budapest
  'st-stephen-basilica': { lat: 47.5008, lng: 19.0537 },
  'st-stephen-market': { lat: 47.501, lng: 19.0535 },
  basiliq: { lat: 47.5014, lng: 19.0541 },
  'vaci-utca': { lat: 47.4965, lng: 19.055 },
  parliament: { lat: 47.5075, lng: 19.0458 },
  'fishermans-bastion': { lat: 47.5029, lng: 19.0344 },
  'buda-castle': { lat: 47.496, lng: 19.0398 },
  funicular: { lat: 47.4979, lng: 19.0394 },
  'new-york-cafe': { lat: 47.4977, lng: 19.0515 },
  kiskakukk: { lat: 47.503, lng: 19.0465 },
  'great-market-hall': { lat: 47.4869, lng: 19.0585 },
  langos: { lat: 47.4869, lng: 19.0585 },
  szechenyi: { lat: 47.5189, lng: 19.0822 },
  'vajdahunyad-market': { lat: 47.5155, lng: 19.0835 },
  vajdahunyad: { lat: 47.5152, lng: 19.0828 },
  menza: { lat: 47.5105, lng: 19.0265 },
  andrassy: { lat: 47.503, lng: 19.058 },
  'heroes-square': { lat: 47.515, lng: 19.0777 },
  'metro-m1': { lat: 47.504, lng: 19.05 },
  'bors-gastrobar': { lat: 47.5012, lng: 19.049 },
  'danube-cruise': { lat: 47.507, lng: 19.042 },

  // Vienna
  stephansdom: { lat: 48.2085, lng: 16.3731 },
  'mozarthaus-vienna': { lat: 48.2069, lng: 16.374 },
  figlmuller: { lat: 48.2055, lng: 16.3735 },
  'rathaus-market': { lat: 48.2108, lng: 16.3577 },
  rathaus: { lat: 48.2108, lng: 16.3577 },
  hofburg: { lat: 48.2066, lng: 16.365 },
  'cafe-central': { lat: 48.2102, lng: 16.3653 },
  'miiro-spittelberg': { lat: 48.2028, lng: 16.3545 },
  graben: { lat: 48.2087, lng: 16.3688 },
  kohlmarkt: { lat: 48.2089, lng: 16.3678 },
  'ribs-of-vienna': { lat: 48.2015, lng: 16.3688 },
  lugeck: { lat: 48.2067, lng: 16.3699 },
  staatsoper: { lat: 48.2028, lng: 16.3691 },
  musikverein: { lat: 48.2008, lng: 16.3728 },
  naschmarkt: { lat: 48.1988, lng: 16.363 },
  neni: { lat: 48.1985, lng: 16.3635 },
  schonbrunn: { lat: 48.1858, lng: 16.3127 },
  'schonbrunn-market': { lat: 48.1855, lng: 16.312 },
  belvedere: { lat: 48.1916, lng: 16.3807 },
  'belvedere-market': { lat: 48.191, lng: 16.38 },
  'the-kiss': { lat: 48.1916, lng: 16.3807 },
  plachutta: { lat: 48.2014, lng: 16.3732 },
  'schwarzer-kameel': { lat: 48.2059, lng: 16.3686 },
  'wien-hbf': { lat: 48.185, lng: 16.3769 },

  // Prague
  'prague-castle': { lat: 50.09, lng: 14.4005 },
  'st-vitus': { lat: 50.0909, lng: 14.4004 },
  'old-royal-palace': { lat: 50.0895, lng: 14.3995 },
  'golden-lane': { lat: 50.0918, lng: 14.403 },
  'charles-bridge': { lat: 50.0865, lng: 14.4114 },
  'kampa-park': { lat: 50.0855, lng: 14.4085 },
  'old-town-square': { lat: 50.0875, lng: 14.4213 },
  'astronomical-clock': { lat: 50.087, lng: 14.4207 },
  'kafka-statue': { lat: 50.0817, lng: 14.4208 },
  'powder-tower': { lat: 50.0872, lng: 14.4278 },
  'prague-christmas-market': { lat: 50.0875, lng: 14.4213 },
  lokal: { lat: 50.0903, lng: 14.4256 },
  'u-fleku': { lat: 50.075, lng: 14.418 },
  'hotel-cube': { lat: 50.0797, lng: 14.4167 },
  'hilton-prague': { lat: 50.0885, lng: 14.4305 },
  'praha-hlavni': { lat: 50.083, lng: 14.436 },
  terasa: { lat: 50.0895, lng: 14.4 },
  mlynec: { lat: 50.0885, lng: 14.4085 },
  'cafe-imperial': { lat: 50.0878, lng: 14.4325 },
  botanicus: { lat: 50.087, lng: 14.431 },
  'cafe-louvre': { lat: 50.0815, lng: 14.4185 },
  bellevue: { lat: 50.0855, lng: 14.4105 },
  'old-town-shopping': { lat: 50.086, lng: 14.422 },

  // Day trips
  salzburg: { lat: 47.7994, lng: 13.0437 },
  'klook-daytrip': { lat: 47.8095, lng: 13.055 },
  hallstatt: { lat: 47.5622, lng: 13.6493 },
}

export const CARTO_TILE_URL =
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

export const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

export function isCityMapId(city: CityId): city is CityMapId {
  return city in cityMapConfigs
}

export function pinForPlace(id: string): MapPin | undefined {
  return placeMapPins[id]
}

/** 地圖只標主要景點 */
export const mapFeaturedAttractions: Record<CityMapId, string[]> = {
  budapest: [
    'parliament',
    'buda-castle',
    'fishermans-bastion',
    'st-stephen-basilica',
    'great-market-hall',
    'szechenyi',
    'heroes-square',
  ],
  vienna: ['stephansdom', 'mozarthaus-vienna', 'hofburg', 'schonbrunn', 'belvedere', 'rathaus', 'staatsoper', 'musikverein'],
  prague: [
    'prague-castle',
    'st-vitus',
    'charles-bridge',
    'old-town-square',
    'astronomical-clock',
    'powder-tower',
    'kafka-statue',
  ],
  salzburg: ['salzburg'],
  hallstatt: ['hallstatt'],
}

/** 地圖上的住宿（有座標的候選；實際顯示依預算頁選取） */
export const mapFeaturedHotels: Record<CityMapId, string[]> = {
  budapest: ['basiliq'],
  vienna: ['miiro-spittelberg', 'jaz-vienna'],
  prague: ['hotel-cube', 'hilton-prague'],
  salzburg: [],
  hallstatt: [],
}

export type MapCategoryFilter = 'attraction' | 'hotel'

export function mapFeaturedKind(
  city: CityMapId,
  placeId: string,
  selectedHotelPlaceId?: string,
): MapCategoryFilter | undefined {
  if (selectedHotelPlaceId && placeId === selectedHotelPlaceId) return 'hotel'
  if (mapFeaturedAttractions[city].includes(placeId)) return 'attraction'
  return undefined
}

/** Leaflet 用實色（CSS 變數在 canvas 無效） */
export const mapPinColors: Record<PlaceCategory, string> = {
  attraction: '#7c2f38',
  market: '#a4844d',
  restaurant: '#8b5a3c',
  cafe: '#8b5a3c',
  hotel: '#f0c419',
  transport: '#8f867c',
  shop: '#a4844d',
  experience: '#7c2f38',
}
