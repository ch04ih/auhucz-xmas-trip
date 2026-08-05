import { useMemo, useState } from 'react'
import { categoryLabels, cityLabels, placeImage, places } from '../data/places'
import type { CityId } from '../data/types'

interface Props {
  onOpenPlace: (id: string) => void
}

const filters: { id: CityId | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'budapest', label: '布達佩斯' },
  { id: 'vienna', label: '維也納' },
  { id: 'salzburg', label: '薩爾斯堡' },
  { id: 'hallstatt', label: '哈修塔特' },
  { id: 'ck', label: 'CK' },
  { id: 'prague', label: '布拉格' },
]

export function PlacesView({ onOpenPlace }: Props) {
  const [city, setCity] = useState<CityId | 'all'>('all')
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

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Places</p>
        <h1>景點與餐廳</h1>
        <p className="hero-sub">點選即可查看簡介。行程裡標成膠囊的名稱也能點。</p>
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

      <div className="place-list">
        {list.map((p) => (
          <button
            key={p.id}
            type="button"
            className="place-row"
            onClick={() => onOpenPlace(p.id)}
          >
            <img
              className="place-thumb"
              src={placeImage(p)}
              alt=""
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
