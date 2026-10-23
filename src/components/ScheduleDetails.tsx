import { useState } from 'react'
import { FadeImage } from './FadeImage'
import { PlaceBody, PlaceSection, Points } from './PlaceBody'
import { TabStrip } from './TabStrip'
import { getPlace, placeImage } from '../data/places'
import type { Place, ShopPick } from '../data/types'
import { splitPoints } from '../lib/bullets'

interface Props {
  note?: string
  placeIds: string[]
  shops?: ShopPick[]
}

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function InlinePlace({ place }: { place: Place }) {
  return (
    <div className="tl-place">
      <div className="tl-place-image-wrap">
        <FadeImage
          className="tl-place-image"
          src={placeImage(place)}
          alt={place.name}
          style={place.imagePosition ? { objectPosition: place.imagePosition } : undefined}
          onError={(e) => {
            const wrap = e.currentTarget.parentElement
            if (wrap) wrap.style.display = 'none'
          }}
        />
      </div>
      <div className="tl-place-head">
        <h3 className="tl-place-title">
          {place.name}
          {place.nameEn && place.nameEn !== place.name && <span>{place.nameEn}</span>}
        </h3>
        {place.mapsQuery && (
          <a
            className="tl-place-maps"
            href={mapsUrl(place.mapsQuery)}
            target="_blank"
            rel="noreferrer"
          >
            地圖 ↗
          </a>
        )}
      </div>
      <PlaceBody place={place} />
    </div>
  )
}

/** 一次只展開一個；收起上方的項目時把剛點開的這個留在原位，畫面不跳 */
function closeOthers(current: HTMLDetailsElement) {
  const others = [...document.querySelectorAll<HTMLDetailsElement>('details.tl-details[open]')].filter(
    (d) => d !== current,
  )
  if (!others.length) return
  const before = current.getBoundingClientRect().top
  for (const d of others) d.open = false
  const shift = current.getBoundingClientRect().top - before
  if (shift) window.scrollBy(0, shift)
}

function ShopList({ shops }: { shops: ShopPick[] }) {
  return (
    <ul className="tl-shops">
      {shops.map((s) => (
        <li key={s.name}>
          <a href={mapsUrl(s.mapsQuery)} target="_blank" rel="noreferrer">
            {s.name} ↗
          </a>
          <p>{s.feature}</p>
          <span>{s.price}</span>
        </li>
      ))}
    </ul>
  )
}

export function ScheduleDetails({ note, placeIds, shops }: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const places = placeIds.map(getPlace).filter((p): p is Place => Boolean(p))
  const current = places[Math.min(active, places.length - 1)]

  return (
    <details
      className="tl-details"
      onToggle={(e) => {
        const el = e.currentTarget
        setOpen(el.open)
        if (el.open) closeOthers(el)
      }}
    >
      <summary>詳細介紹</summary>
      {open && (
        <div className="tl-details-body">
          {places.length > 1 && (
            <TabStrip>
              {places.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={p === current}
                  className={p === current ? 'tl-tab active' : 'tl-tab'}
                  onClick={() => setActive(i)}
                >
                  {p.name}
                </button>
              ))}
            </TabStrip>
          )}
          {current && <InlinePlace key={current.id} place={current} />}
          {shops?.length ? (
            <div className="tl-note">
              <PlaceSection label="推薦店家">
                <ShopList shops={shops} />
              </PlaceSection>
            </div>
          ) : null}
          {note && (
            <div className="tl-note">
              <PlaceSection label="行程備註">
                <Points items={splitPoints(note)} />
              </PlaceSection>
            </div>
          )}
        </div>
      )}
    </details>
  )
}
