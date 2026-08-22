import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef } from 'react'
import { cityLabels } from '../data/places'
import {
  CARTO_ATTRIBUTION,
  CARTO_TILE_URL,
  cityMapConfigs,
  isCityMapId,
  mapPinColors,
  pinForPlace,
  type CityMapId,
} from '../data/cityMapPins'
import type { CityId, Place } from '../data/types'

interface Props {
  city: CityMapId
  places: Place[]
  onOpenPlace: (id: string) => void
  active?: boolean
}

export function CityMap({ city, places, onOpenPlace, active = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const onOpenPlaceRef = useRef(onOpenPlace)
  onOpenPlaceRef.current = onOpenPlace

  const config = cityMapConfigs[city]

  const pins = useMemo(
    () =>
      places
        .map((place) => {
          const pin = pinForPlace(place.id)
          if (!pin) return null
          return { place, pin }
        })
        .filter((item): item is { place: Place; pin: { lat: number; lng: number } } => item !== null),
    [places],
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el || !pins.length) return

    const map = L.map(el, {
      center: config.center,
      zoom: config.zoom,
      scrollWheelZoom: false,
      attributionControl: true,
    })

    L.tileLayer(CARTO_TILE_URL, {
      attribution: CARTO_ATTRIBUTION,
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    const markers: L.CircleMarker[] = []
    for (const { place, pin } of pins) {
      const marker = L.circleMarker([pin.lat, pin.lng], {
        radius: 7,
        fillColor: mapPinColors[place.category],
        color: '#fffcf7',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.92,
      })
      marker.bindTooltip(place.name, {
        direction: 'top',
        offset: [0, -6],
        opacity: 0.95,
      })
      marker.on('click', () => onOpenPlaceRef.current(place.id))
      marker.addTo(map)
      markers.push(marker)
    }

    if (markers.length > 1) {
      map.fitBounds(L.featureGroup(markers).getBounds().pad(0.14))
    }

    mapRef.current = map
    if (active) {
      requestAnimationFrame(() => map.invalidateSize())
    }

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [active, city, config.center, config.zoom, pins])

  useEffect(() => {
    if (!active || !mapRef.current) return
    const id = requestAnimationFrame(() => mapRef.current?.invalidateSize())
    return () => cancelAnimationFrame(id)
  }, [active])

  if (!pins.length) return null

  return (
    <section className="city-map" aria-label={`${cityLabels[city]}地圖`}>
      <div className="city-map-head">
        <h2>{cityLabels[city]} · 地圖</h2>
        <p>{config.hint}</p>
      </div>

      <div className="city-map-frame" ref={containerRef} />

      <div className="city-map-legend" aria-hidden="true">
        <span>
          <i className="dot accent" />
          景點
        </span>
        <span>
          <i className="dot gold" />
          市集
        </span>
        <span>
          <i className="dot brown" />
          餐廳／咖啡
        </span>
        <span>
          <i className="dot forest" />
          飯店
        </span>
      </div>
      <p className="city-map-foot">點標記開啟介紹 · 共 {pins.length} 處</p>
    </section>
  )
}

export function CityMapSection({
  city,
  places,
  onOpenPlace,
  active = true,
}: {
  city: CityId | 'all'
  places: Place[]
  onOpenPlace: (id: string) => void
  active?: boolean
}) {
  if (city === 'all' || !isCityMapId(city)) return null
  return (
    <CityMap city={city} places={places} onOpenPlace={onOpenPlace} active={active} />
  )
}
