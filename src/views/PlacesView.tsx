import { useMemo, useState } from 'react'
import { CityMapSection } from '../components/CityMap'
import { FadeImage } from '../components/FadeImage'
import {
  categoryLabels,
  cityLabels,
  isPlaceOnPlacesList,
  matchesPlacesCategoryFilter,
  placeImage,
  places,
  placesListCategories,
  placesListCategoryLabels,
} from '../data/places'
import type { CityId, PlacesListCategory } from '../data/types'

interface Props {
  onOpenPlace: (id: string) => void
  active?: boolean
}

const cityFilters: { id: CityId | 'all'; label: string }[] = [
  { id: 'budapest', label: '布達佩斯' },
  { id: 'vienna', label: '維也納' },
  { id: 'prague', label: '布拉格' },
  { id: 'all', label: '全部' },
]

const categoryFilters: { id: PlacesListCategory | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  ...placesListCategories.map((id) => ({
    id,
    label: placesListCategoryLabels[id],
  })),
]

export function PlacesView({ onOpenPlace, active = true }: Props) {
  const [city, setCity] = useState<CityId | 'all'>('budapest')
  const [category, setCategory] = useState<PlacesListCategory | 'all'>('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    return places.filter((p) => {
      if (!isPlaceOnPlacesList(p)) return false
      if (city !== 'all' && p.city !== city) return false
      if (!matchesPlacesCategoryFilter(p, category)) return false
      if (!query) return true
      return (
        p.name.toLowerCase().includes(query) ||
        (p.nameEn?.toLowerCase().includes(query) ?? false) ||
        p.intro.toLowerCase().includes(query)
      )
    })
  }, [city, category, q])

  const mapPlaces = useMemo(() => {
    if (city === 'all') return []
    return places.filter((p) => p.city === city)
  }, [city])

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Places</p>
        <h1>景點與餐廳</h1>
        <p className="hero-sub">切換城市可看地圖；僅標主要景點與飯店，點標記查看簡介。</p>
      </header>

      <label className="search">
        <span className="sr-only">搜尋</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋景點、餐廳、市集…"
        />
      </label>

      <div className="filter-row">
        {cityFilters.map((f) => (
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

      {active ? (
        <CityMapSection city={city} places={mapPlaces} onOpenPlace={onOpenPlace} />
      ) : null}

      {city === 'all' ? (
        <p className="city-map-hint">選擇上方城市標籤以顯示互動地圖</p>
      ) : null}

      <div className="filter-row place-category-filters">
        {categoryFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={category === f.id ? 'filter active' : 'filter'}
            onClick={() => setCategory(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

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
