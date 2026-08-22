import { useMemo, useState } from 'react'
import { CityMapSection } from '../components/CityMap'
import { FadeImage } from '../components/FadeImage'
import { categoryLabels, cityLabels, placeImage, places } from '../data/places'
import type { CityId } from '../data/types'

interface Props {
  onOpenPlace: (id: string) => void
  active?: boolean
}

const filters: { id: CityId | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'budapest', label: '布達佩斯' },
  { id: 'vienna', label: '維也納' },
  { id: 'salzburg', label: '薩爾斯堡' },
  { id: 'hallstatt', label: '哈修塔特' },
  { id: 'prague', label: '布拉格' },
]

export function PlacesView({ onOpenPlace, active = true }: Props) {
  const [city, setCity] = useState<CityId | 'all'>('budapest')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    return places.filter((p) => {
      if (city !== 'all' && p.city !== city) return false
      if (!query) return true
      return (
        p.name.toLowerCase().includes(query) ||
        (p.nameEn?.toLowerCase().includes(query) ?? false) ||
        p.intro.toLowerCase().includes(query)
      )
    })
  }, [city, q])

  const mapPlaces = useMemo(() => {
    if (city === 'all') return []
    return places.filter((p) => p.city === city)
  }, [city])

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Places</p>
        <h1>景點與餐廳</h1>
        <p className="hero-sub">切換城市可看簡圖地圖，點標記或列表即可查看簡介。</p>
      </header>

      <label className="search">
        <span className="sr-only">搜尋</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋景點、餐廳、飯店…"
        />
      </label>

      <div className="filter-row">
        {filters.map((f) => (
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

      <CityMapSection
        city={city}
        places={mapPlaces}
        onOpenPlace={onOpenPlace}
        active={active}
      />

      {city === 'all' ? (
        <p className="city-map-hint">選擇上方城市標籤以顯示互動地圖</p>
      ) : null}

      <div className="place-list">
        {list.map((p) => (
          <button
            key={p.id}
            type="button"
            className="place-row"
            onClick={() => onOpenPlace(p.id)}
          >
            <FadeImage
              className="place-thumb"
              src={placeImage(p)}
              alt=""
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.visibility = 'hidden'
              }}
            />
            <span className="place-cat">{categoryLabels[p.category]}</span>
            <span className="place-main">
              <strong>{p.name}</strong>
              <span>
                {cityLabels[p.city]}
                {p.nameEn ? ` · ${p.nameEn}` : ''}
              </span>
            </span>
            <span className="chevron">›</span>
          </button>
        ))}
        {list.length === 0 && <p className="empty">沒有符合的結果</p>}
      </div>
    </div>
  )
}
