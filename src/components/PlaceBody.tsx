import type { ReactNode } from 'react'
import { PlaceStory } from './PlaceStory'
import type { Place } from '../data/types'
import { splitPoints } from '../lib/bullets'

export function Points({ items }: { items: string[] }) {
  if (items.length === 1) return <p>{items[0]}</p>
  return (
    <ul className="pb-points">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

export function PlaceSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="pb-section">
      <span className="pb-label">{label}</span>
      {children}
    </div>
  )
}

const dining = new Set(['restaurant', 'cafe'])

/** 景點內容：介紹 → 典故 → 價位 → 時間 → 停留 → 小提醒 */
export function PlaceBody({ place }: { place: Place }) {
  const isDining = dining.has(place.category)
  return (
    <div className="pb">
      <p className="pb-intro">{place.intro}</p>
      {place.story && <PlaceStory story={place.story} />}
      {place.price && (
        <PlaceSection label={isDining ? '價位' : '票價'}>
          <p>{place.price}</p>
        </PlaceSection>
      )}
      {place.hours && (
        <PlaceSection label={isDining || place.category === 'shop' ? '營業時間' : '開放時間'}>
          <p>{place.hours}</p>
        </PlaceSection>
      )}
      {place.duration && (
        <PlaceSection label="建議停留">
          <p>{place.duration}</p>
        </PlaceSection>
      )}
      {place.tip && (
        <PlaceSection label="小提醒">
          <Points items={splitPoints(place.tip)} />
        </PlaceSection>
      )}
    </div>
  )
}
