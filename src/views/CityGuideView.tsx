import { useEffect, useMemo, useState } from 'react'
import { FadeImage } from '../components/FadeImage'
import { Holly } from '../components/Festive'
import {
  cityGuides,
  getCityGuide,
  guideSectionLabels,
  guideSectionOrder,
  isGuideItemPlanned,
  type GuideCityId,
  type GuideSectionId,
  type CityGuideItem,
} from '../data/cityGuides'
import { placeImage } from '../data/places'
import { useStayPlan } from '../lib/StayPlanContext'

interface Props {
  cityId: GuideCityId
  initialSection?: GuideSectionId
  onSelectCity: (id: GuideCityId) => void
  onBack: () => void
  onOpenPlace: (id: string) => void
}

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function initialLetter(name: string) {
  return name.replace(/^[^\p{L}\p{N}]+/u, '').charAt(0).toUpperCase() || '·'
}

function GuideCard({
  item,
  planned,
  onOpenPlace,
}: {
  item: CityGuideItem
  /** null = 不區分已排／未排（實用區） */
  planned: boolean | null
  onOpenPlace: (id: string) => void
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const imageKey = item.imageId || item.placeId
  const openable = Boolean(item.placeId || item.mapsQuery)
  const showImage = Boolean(imageKey) && !imgFailed

  const activate = () => {
    if (item.placeId) onOpenPlace(item.placeId)
    else if (item.mapsQuery) window.open(mapsUrl(item.mapsQuery), '_blank', 'noopener,noreferrer')
  }

  const className = [
    'food-card',
    'guide-card',
    planned === true ? 'guide-card-planned' : planned === false ? 'guide-card-extra' : '',
    openable ? '' : 'static',
  ]
    .filter(Boolean)
    .join(' ')

  const body = (
    <>
      <div className="food-card-media">
        {showImage ? (
          <FadeImage
            className="food-thumb"
            src={placeImage(imageKey!)}
            alt=""
            loading="lazy"
            style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="food-thumb food-thumb-fallback" aria-hidden="true">
            {initialLetter(item.title)}
          </span>
        )}
      </div>
      <div className="food-card-body guide-card-body">
        <strong>{item.title}</strong>
        {item.note ? <p className="guide-card-note">{item.note}</p> : null}
      </div>
    </>
  )

  if (openable) {
    return (
      <button type="button" className={className} onClick={activate}>
        {body}
      </button>
    )
  }

  return <article className={className}>{body}</article>
}

export function CityGuideView({
  cityId,
  initialSection = 'eat',
  onSelectCity,
  onBack,
  onOpenPlace,
}: Props) {
  const { plan } = useStayPlan()
  const [section, setSection] = useState<GuideSectionId>(initialSection)
  const guide = getCityGuide(cityId) ?? cityGuides[0]
  const stay = plan.cities.find((c) => c.id === guide.id)
  const plannedPlaceIds = useMemo(() => {
    const ids = new Set<string>()
    for (const day of plan.days) {
      for (const stop of day.schedule) {
        for (const id of stop.placeIds ?? []) ids.add(id)
      }
      for (const meal of Object.values(day.meals)) {
        for (const id of meal?.placeIds ?? []) ids.add(id)
      }
      if (day.lodgingPlaceId) ids.add(day.lodgingPlaceId)
      if (day.coverPlaceId) ids.add(day.coverPlaceId)
    }
    return ids
  }, [plan.days])

  const items = useMemo(() => {
    const list = guide[section]
    if (section === 'tips') return list
    return [...list].sort((a, b) => {
      const ap = isGuideItemPlanned(a, plannedPlaceIds) ? 0 : 1
      const bp = isGuideItemPlanned(b, plannedPlaceIds) ? 0 : 1
      return ap - bp
    })
  }, [guide, section, plannedPlaceIds])

  useEffect(() => {
    setSection(initialSection)
  }, [cityId, initialSection])

  return (
    <div className="page city-guide-page">
      <header className="page-head guide-page-head">
        <button type="button" className="text-btn guide-back" onClick={onBack}>
          ← 總覽
        </button>
      </header>

      <div className="chips guide-city-chips" role="tablist" aria-label="選擇城市">
        {cityGuides.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === guide.id}
            className={c.id === guide.id ? 'chip active' : 'chip'}
            onClick={() => onSelectCity(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="guide-city-panel">
        <h1>{guide.name}</h1>
        {stay ? (
          <p className="hero-sub">
            {stay.nights}　·　{stay.dates}
          </p>
        ) : null}
        <FadeImage
          className="guide-city-map"
          src={placeImage(guide.coverImageId)}
          alt={`${guide.name}景點相對位置圖`}
          loading="lazy"
        />
        <p className="guide-intro">{guide.intro}</p>
      </div>

      <div className="segment guide-sections" role="tablist" aria-label="指南分類">
        {guideSectionOrder.map((id) => {
          const active = section === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              className={active ? 'active' : undefined}
              onClick={() => setSection(id)}
            >
              {guideSectionLabels[id]}
              {active ? <Holly className="holly holly-card" /> : null}
            </button>
          )
        })}
      </div>

      <section className="section guide-section">
        <div className="food-list guide-card-grid">
          {items.map((item) => {
            const planned =
              section === 'tips' ? null : isGuideItemPlanned(item, plannedPlaceIds)
            return (
              <GuideCard
                key={item.title}
                item={item}
                planned={planned}
                onOpenPlace={onOpenPlace}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
