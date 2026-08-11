import { useEffect } from 'react'
import { FadeImage } from './FadeImage'
import { categoryLabels, cityLabels, getPlace, placeImage } from '../data/places'
import { placesForDay } from '../data/trip'
import { useStayPlan } from '../lib/StayPlanContext'
import { warmPlaceImage } from '../lib/preloadImages'

interface Props {
  placeId: string | null
  onClose: () => void
  onOpenDay?: (day: number) => void
}

export function PlaceModal({ placeId, onClose, onOpenDay }: Props) {
  const { plan } = useStayPlan()
  const place = placeId ? getPlace(placeId) : undefined

  useEffect(() => {
    if (!placeId) return
    warmPlaceImage(placeId)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [placeId, onClose])

  if (!placeId || !place) return null

  const relatedDays = plan.days.filter((d) => placesForDay(d).includes(place.id))
  const mapsUrl = place.mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsQuery)}`
    : null

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="place-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-handle" />
        <div className="modal-image-wrap">
          <FadeImage
            className="modal-image"
            src={placeImage(place)}
            alt={place.name}
            onError={(e) => {
              const wrap = e.currentTarget.parentElement
              if (wrap) wrap.style.display = 'none'
            }}
          />
        </div>
        <div className="modal-top">
          <div className="modal-tags">
            <span className="tag">{categoryLabels[place.category]}</span>
            <span className="tag tag-muted">{cityLabels[place.city]}</span>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="關閉">
            ✕
          </button>
        </div>
        <h2 id="place-title" className="modal-title">
          {place.name}
        </h2>
        {place.nameEn && <p className="modal-en">{place.nameEn}</p>}
        <p className="modal-intro">{place.intro}</p>
        {place.story && (
          <div className="story">
            <strong>小趣事</strong>
            <p>{place.story}</p>
          </div>
        )}
        {place.tip && (
          <div className="tip">
            <strong>小提醒</strong>
            <p>{place.tip}</p>
          </div>
        )}
        {relatedDays.length > 0 && (
          <div className="related">
            <p className="related-label">出現在行程</p>
            <div className="chips">
              {relatedDays.map((d) => (
                <button
                  key={d.day}
                  type="button"
                  className="chip"
                  onClick={() => onOpenDay?.(d.day)}
                >
                  Day {d.day} · {d.date}
                </button>
              ))}
            </div>
          </div>
        )}
        {mapsUrl && (
          <a className="maps-link" href={mapsUrl} target="_blank" rel="noreferrer">
            在 Google 地圖開啟
          </a>
        )}
      </div>
    </div>
  )
}
