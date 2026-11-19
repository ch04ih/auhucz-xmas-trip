import { useMemo, useState } from 'react'
import { FadeImage } from '../components/FadeImage'
import {
  foodImageId,
  foodListCities,
  type FoodListCityId,
  type FoodListItem,
} from '../data/foodLists'
import { getPlace, placeImage } from '../data/places'

function initialLetter(name: string) {
  return name.replace(/^[^\p{L}\p{N}]+/u, '').charAt(0).toUpperCase() || '🍴'
}

interface Props {
  onOpenPlace: (id: string) => void
}

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function formatReviews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : String(n)
}

function RatingLine({ rating, reviews }: { rating?: number; reviews?: number }) {
  if (rating == null) return null
  return (
    <span className="food-rating">
      <span className="food-rating-star" aria-hidden="true">
        ★
      </span>
      <strong>{rating.toFixed(1)}</strong>
      {reviews != null ? <span className="food-rating-count">({formatReviews(reviews)})</span> : null}
    </span>
  )
}

function FoodCard({
  item,
  onOpenPlace,
}: {
  item: FoodListItem
  onOpenPlace: (id: string) => void
}) {
  const place = item.placeId ? getPlace(item.placeId) : undefined
  const intro = item.intro || place?.intro || ''
  const meta = [item.kind, item.price, item.status].filter(Boolean).join(' · ')
  const googleHref = mapsUrl(item.mapsQuery)
  const imageId = foodImageId(item)
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <article className="food-card">
      <div className="food-card-media">
        {imageId && !imgFailed ? (
          <FadeImage
            className="food-thumb"
            src={placeImage(imageId)}
            alt=""
            loading="lazy"
            style={{
              ...(item.imagePosition ? { objectPosition: item.imagePosition } : null),
              ...(item.imageScale && item.imageScale !== 1
                ? { transform: `scale(${item.imageScale})` }
                : null),
            }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="food-thumb food-thumb-fallback" aria-hidden="true">
            {initialLetter(item.name)}
          </span>
        )}
      </div>
      <div className="food-card-body">
        <div className="food-card-main">
          <strong>{place?.name ?? item.name}</strong>
          {place?.nameEn && place.name !== item.name ? (
            <span className="food-card-en">{item.name}</span>
          ) : null}
          <RatingLine rating={item.rating} reviews={item.reviews} />
          {meta ? <span className="food-card-meta">{meta}</span> : null}
        </div>
        {item.note || intro ? (
          <p className="food-card-intro">
            {item.note ? <strong className="food-card-note">{item.note}</strong> : null}
            {item.note && intro ? ' ' : null}
            {intro || null}
          </p>
        ) : null}
        <div className="food-card-actions">
          {item.placeId ? (
            <button type="button" className="food-action" onClick={() => onOpenPlace(item.placeId!)}>
              詳細介紹
            </button>
          ) : null}
          <a
            className="food-action food-action-maps"
            href={googleHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export function RestaurantsView({ onOpenPlace }: Props) {
  const [city, setCity] = useState<FoodListCityId | 'all'>('budapest')

  const sections = useMemo(
    () => (city === 'all' ? foodListCities : foodListCities.filter((c) => c.id === city)),
    [city],
  )

  return (
    <div className="page restaurants-page">
      <header className="page-head">
        <p className="eyebrow">Food lists</p>
        <h1>餐廳清單</h1>
        <p className="hero-sub">
          依城市整理你的 Google 美食清單；含星等、簡介與照片，可直接開地圖看最新評價。
        </p>
      </header>

      <div className="filter-row">
        {[
          { id: 'budapest' as const, label: '布達佩斯' },
          { id: 'vienna' as const, label: '維也納' },
          { id: 'prague' as const, label: '布拉格' },
          { id: 'all' as const, label: '全部' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            className={city === f.id ? 'filter active' : 'filter'}
            onClick={() => setCity(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {sections.map((section) => (
        <section key={section.id} className="section">
          <div className="section-head">
            <h2>
              {section.label}
              <small className="food-count">{section.items.length} 家</small>
            </h2>
            <a
              className="food-list-link"
              href={section.listUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">🍴</span>
              Google 清單
              <span className="food-list-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <div className="food-list">
            {section.items.map((item) => (
              <FoodCard key={`${section.id}-${item.name}`} item={item} onOpenPlace={onOpenPlace} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
