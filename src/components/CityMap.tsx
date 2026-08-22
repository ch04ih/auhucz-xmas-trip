import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { selectedHotelPlaceIdForCity } from '../data/stayPlans'
import { cityLabels } from '../data/places'
import { useStayPlan } from '../lib/StayPlanContext'
import {
  CARTO_ATTRIBUTION,
  CARTO_TILE_URL,
  cityMapConfigs,
  defaultMapCategoryFilters,
  isCityMapId,
  mapCategoryFilters,
  mapFeaturedAttractions,
  mapFeaturedKind,
  pinForPlace,
  type CityMapId,
  type MapCategoryFilter,
} from '../data/cityMapPins'
import type { CityId, Place } from '../data/types'

interface PinItem {
  place: Place
  pin: { lat: number; lng: number }
}

type SymbolKind = 'sight' | 'hotel'

interface Props {
  city: CityMapId
  places: Place[]
  onOpenPlace: (id: string) => void
}

function symbolIcon(kind: SymbolKind): L.DivIcon {
  const size = kind === 'hotel' ? 32 : 26
  const half = size / 2
  return L.divIcon({
    className: 'map-symbol-wrap',
    html: `<span class="map-symbol map-symbol-${kind}"></span>`,
    iconSize: [size, size],
    iconAnchor: [half, half],
  })
}

function addPlaceMarker(
  item: PinItem,
  kind: SymbolKind,
  layer: L.LayerGroup,
  onOpen: (id: string) => void,
): L.Marker {
  const marker = L.marker([item.pin.lat, item.pin.lng], { icon: symbolIcon(kind) })
  marker.bindTooltip(item.place.name, {
    direction: 'top',
    offset: [0, -10],
    opacity: 0.95,
  })
  marker.on('click', () => onOpen(item.place.id))
  marker.addTo(layer)
  return marker
}

export function CityMap({ city, places, onOpenPlace }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const onOpenPlaceRef = useRef(onOpenPlace)
  onOpenPlaceRef.current = onOpenPlace
  const { plan, hotelSelection } = useStayPlan()

  const [filters, setFilters] = useState<MapCategoryFilter[]>(defaultMapCategoryFilters)
  const config = cityMapConfigs[city]
  const selectedHotelPlaceId = useMemo(() => {
    if (city !== 'budapest' && city !== 'vienna' && city !== 'prague') return undefined
    return selectedHotelPlaceIdForCity(city, hotelSelection, plan.hotelCities)
  }, [city, hotelSelection, plan.hotelCities])

  const filteredPins = useMemo(() => {
    const items: { item: PinItem; kind: SymbolKind }[] = []
    for (const place of places) {
      const pin = pinForPlace(place.id)
      if (!pin) continue
      const featured = mapFeaturedKind(city, place.id, selectedHotelPlaceId)
      if (!featured || !filters.includes(featured)) continue
      items.push({
        item: { place, pin },
        kind: featured === 'hotel' ? 'hotel' : 'sight',
      })
    }
    return items
  }, [places, city, filters, selectedHotelPlaceId])

  const mapStateKey = useMemo(
    () =>
      [city, filters.slice().sort().join(','), filteredPins.map(({ item }) => item.place.id).join(',')].join(
        '|',
      ),
    [city, filters, filteredPins],
  )

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let map: L.Map | null = null
    const timer = window.setTimeout(() => {
      map = L.map(el, {
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

      const sightLayer = L.layerGroup().addTo(map)
      const hotelLayer = L.layerGroup().addTo(map)
      const markers: L.Marker[] = []
      const open = (id: string) => onOpenPlaceRef.current(id)

      for (const { item, kind } of filteredPins) {
        if (kind !== 'sight') continue
        markers.push(addPlaceMarker(item, kind, sightLayer, open))
      }
      for (const { item, kind } of filteredPins) {
        if (kind !== 'hotel') continue
        const marker = addPlaceMarker(item, kind, hotelLayer, open)
        marker.setZIndexOffset(1000)
        markers.push(marker)
      }

      map.invalidateSize(true)
      if (markers.length > 1) {
        map.fitBounds(L.featureGroup(markers).getBounds().pad(0.14))
      } else if (markers.length === 1) {
        const ll = markers[0].getLatLng()
        map.setView([ll.lat, ll.lng], config.zoom)
      }
    }, 50)

    return () => {
      window.clearTimeout(timer)
      map?.remove()
    }
  }, [mapStateKey, city, config.center, config.zoom, filteredPins])

  const toggleFilter = (id: MapCategoryFilter) => {
    setFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const hasFeatured = useMemo(() => {
    const hasAttractions = mapFeaturedAttractions[city].some((id) =>
      places.some((p) => p.id === id),
    )
    const hasHotel = Boolean(selectedHotelPlaceId && pinForPlace(selectedHotelPlaceId))
    return hasAttractions || hasHotel
  }, [city, places, selectedHotelPlaceId])

  if (!hasFeatured) return null

  return (
    <section className="city-map" aria-label={`${cityLabels[city]}地圖`}>
      <div className="city-map-head">
        <h2>{cityLabels[city]} · 地圖</h2>
        <p>{config.hint}</p>
      </div>

      <div className="city-map-controls">
        <div className="city-map-filters" role="group" aria-label="顯示類型">
          {mapCategoryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={filters.includes(f.id) ? 'filter active' : 'filter'}
              aria-pressed={filters.includes(f.id)}
              onClick={() => toggleFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="city-map-frame">
        <div ref={mountRef} className="city-map-mount" />
        {filteredPins.length === 0 ? (
          <p className="city-map-empty">請至少勾選一種類型</p>
        ) : null}
      </div>

      <div className="city-map-legend" aria-hidden="true">
        <span>
          <i className="map-symbol-legend map-symbol-sight" />
          主要景點
        </span>
        <span>
          <i className="map-symbol-legend map-symbol-hotel" />
          飯店
        </span>
      </div>

      <p className="city-map-foot">點標記開啟介紹 · 顯示 {filteredPins.length} 處</p>
    </section>
  )
}

export function CityMapSection({
  city,
  places,
  onOpenPlace,
}: {
  city: CityId | 'all'
  places: Place[]
  onOpenPlace: (id: string) => void
}) {
  if (city === 'all' || !isCityMapId(city)) return null
  return <CityMap city={city} places={places} onOpenPlace={onOpenPlace} />
}
