import { useEffect, useState } from 'react'
import { PlaceModal } from './components/PlaceModal'
import { parseHash, toHash, type AppRoute } from './lib/route'
import { BudgetView } from './views/BudgetView'
import { HomeView } from './views/HomeView'
import { ItineraryView } from './views/ItineraryView'
import { InfoView } from './views/InfoView'
import { PlacesView } from './views/PlacesView'
import type { Tab } from './data/types'

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: '總覽' },
  { id: 'itinerary', label: '行程' },
  { id: 'budget', label: '預算' },
  { id: 'places', label: '景點' },
  { id: 'info', label: '資訊' },
]

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseHash())
  const [placeId, setPlaceId] = useState<string | null>(() => parseHash().placeId ?? null)

  useEffect(() => {
    const sync = () => {
      const next = parseHash()
      setRoute((prev) => {
        if (prev.tab !== next.tab) window.scrollTo(0, 0)
        return next
      })
      setPlaceId(next.placeId ?? null)
    }
    window.addEventListener('hashchange', sync)
    if (!window.location.hash) {
      window.location.replace('#/')
    }
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const go = (next: AppRoute) => {
    window.location.hash = toHash(next)
  }

  const openPlace = (id: string) => {
    setPlaceId(id)
    if (route.tab === 'places') {
      window.location.hash = toHash({ tab: 'places', placeId: id })
    }
  }

  const closePlace = () => {
    setPlaceId(null)
    if (route.tab === 'places') {
      window.location.hash = '#/places'
    }
  }

  return (
    <div className="app">
      <main className="main">
        {route.tab === 'home' && (
          <HomeView
            onOpenDay={(day) => go({ tab: 'itinerary', day })}
            onOpenBudget={() => go({ tab: 'budget' })}
            onOpenPlaces={() => go({ tab: 'places' })}
          />
        )}
        {route.tab === 'itinerary' && (
          <ItineraryView
            dayNumber={route.day ?? 1}
            onSelectDay={(day) => go({ tab: 'itinerary', day })}
            onOpenPlace={openPlace}
          />
        )}
        {route.tab === 'budget' && <BudgetView onOpenPlace={openPlace} />}
        {route.tab === 'places' && <PlacesView onOpenPlace={openPlace} />}
        {route.tab === 'info' && <InfoView />}
      </main>

      <nav className="tabbar" aria-label="主要選單">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={route.tab === tab.id ? 'tab active' : 'tab'}
            onClick={() =>
              go(
                tab.id === 'itinerary'
                  ? { tab: 'itinerary', day: route.day ?? 1 }
                  : { tab: tab.id },
              )
            }
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <PlaceModal
        placeId={placeId}
        onClose={closePlace}
        onOpenDay={(day) => {
          closePlace()
          go({ tab: 'itinerary', day })
        }}
      />
    </div>
  )
}
