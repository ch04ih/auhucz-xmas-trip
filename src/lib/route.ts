import { isGuideCityId, type GuideCityId } from '../data/cityGuides'
import type { Tab } from '../data/types'

export interface AppRoute {
  tab: Tab
  day?: number
  placeId?: string
  cityId?: GuideCityId
}

export function parseHash(hash = window.location.hash): AppRoute {
  const raw = hash.replace(/^#/, '').replace(/^\//, '')
  const parts = raw.split('/').filter(Boolean)

  if (parts[0] === 'itinerary') {
    const day = parts[1] ? Number(parts[1]) : undefined
    return {
      tab: 'itinerary',
      day: day && day >= 1 && day <= 14 ? day : undefined,
    }
  }
  if (parts[0] === 'budget') return { tab: 'budget' }
  if (parts[0] === 'info') return { tab: 'info' }
  if (parts[0] === 'tools') return { tab: 'tools' }
  if (parts[0] === 'bookings') return { tab: 'bookings' }
  if (parts[0] === 'restaurants') return { tab: 'restaurants' }
  if (parts[0] === 'places') {
    return { tab: 'places', placeId: parts[1] }
  }
  if (parts[0] === 'city') {
    const cityId = parts[1] && isGuideCityId(parts[1]) ? parts[1] : 'budapest'
    return { tab: 'city', cityId }
  }
  return { tab: 'home' }
}

export function toHash(route: AppRoute): string {
  if (route.tab === 'itinerary') {
    return route.day ? `#/itinerary/${route.day}` : '#/itinerary'
  }
  if (route.tab === 'budget') return '#/budget'
  if (route.tab === 'info') return '#/info'
  if (route.tab === 'tools') return '#/tools'
  if (route.tab === 'bookings') return '#/bookings'
  if (route.tab === 'restaurants') return '#/restaurants'
  if (route.tab === 'places') {
    return route.placeId ? `#/places/${route.placeId}` : '#/places'
  }
  if (route.tab === 'city') {
    return `#/city/${route.cityId ?? 'budapest'}`
  }
  return '#/'
}

export function navigate(route: AppRoute) {
  const next = toHash(route)
  if (window.location.hash !== next) {
    window.location.hash = next
  }
}
