import { placeImage, places } from '../data/places'
import type { DayPlan } from '../data/types'

const warmed = new Set<string>()

export function warmImage(src: string) {
  if (!src || warmed.has(src)) return
  warmed.add(src)
  const img = new Image()
  img.decoding = 'async'
  img.src = src
}

export function warmPlaceImage(place: { id: string } | string) {
  warmImage(placeImage(typeof place === 'string' ? place : place.id))
}

export function warmDayCovers(days: DayPlan[], aroundDay?: number) {
  const targets =
    aroundDay == null
      ? days
      : days.filter((d) => Math.abs(d.day - aroundDay) <= 2)
  for (const d of targets) {
    if (d.coverPlaceId) warmPlaceImage(d.coverPlaceId)
  }
}

/** Warm place photos in the background after first paint. */
export function scheduleWarmAllPlaceImages() {
  const run = () => {
    for (const p of places) warmPlaceImage(p)
  }
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 4000 })
  } else {
    window.setTimeout(run, 900)
  }
}
