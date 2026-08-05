import type { Tab } from '../data/types'

export interface AppRoute {
  tab: Tab
  day?: number
  placeId?: string
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
  if (parts[0] === 'places') {
    return { tab: 'places', placeId: parts[1] }
  }
  return { tab: 'home' }
}

export function toHash(route: AppRoute): string {
  if (route.tab === 'itinerary') {
    return route.day ? `#/itinerary/${route.day}` : '#/itinerary'
  }
  if (route.tab === 'budget') return '#/budget'
  if (route.tab === 'places') {
    return route.placeId ? `#/places/${route.placeId}` : '#/places'
  }
  return '#/'
}

export function navigate(route: AppRoute) {
  const next = toHash(route)
  if (window.location.hash !== next) {
    window.location.hash = next
  }
}
