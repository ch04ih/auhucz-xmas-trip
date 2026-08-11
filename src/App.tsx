import { useEffect, useState } from 'react'
import { PlaceModal } from './components/PlaceModal'
import { StayPlanProvider, useStayPlan } from './lib/StayPlanContext'
import { parseHash, toHash, type AppRoute } from './lib/route'
import { scheduleWarmAllPlaceImages, warmDayCovers } from './lib/preloadImages'
import { BudgetView } from './views/BudgetView'
import { HomeView } from './views/HomeView'
import { ItineraryView } from './views/ItineraryView'
import { InfoView } from './views/InfoView'
import { PlacesView } from './views/PlacesView'
import type { Tab } from './data/types'

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: '總覽' },
  { id: 'itinerary', label: '行程' },
  { id: 'places', label: '景點' },
  { id: 'budget', label: '預算' },
  { id: 'info', label: '資訊' },
]

function AppShell() {
  const { plan } = useStayPlan()
  const [route, setRoute] = useState<AppRoute>(() => parseHash())
  const [placeId, setPlaceId] = useState<string | null>(() => parseHash().placeId ?? null)
  const [lastDay, setLastDay] = useState(() => parseHash().day ?? 1)

  useEffect(() => {
    const sync = () => {
      const next = parseHash()
      setRoute((prev) => {
        if (prev.tab !== next.tab) window.scrollTo(0, 0)
        return next
      })
      setPlaceId(next.placeId ?? null)
      if (next.tab === 'itinerary' && next.day) setLastDay(next.day)
    }
    window.addEventListener('hashchange', sync)
    if (!window.location.hash) {
      window.location.replace('#/')
    }
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    warmDayCovers(plan.days, lastDay)
    scheduleWarmAllPlaceImages()
  }, [plan.id, plan.days, lastDay])

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

  const itineraryDay = route.tab === 'itinerary' ? (route.day ?? lastDay) : lastDay

  return (
    <div className="app">
      <main className="main">
        <div
          className="tab-panel"
          hidden={route.tab !== 'home'}
          aria-hidden={route.tab !== 'home'}
        >
          <HomeView
            onOpenDay={(day) => go({ tab: 'itinerary', day })}
            onOpenBudget={() => go({ tab: 'budget' })}
            onOpenPlaces={() => go({ tab: 'places' })}
          />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'itinerary'}
          aria-hidden={route.tab !== 'itinerary'}
        >
          <ItineraryView
            dayNumber={itineraryDay}
            onSelectDay={(day) => go({ tab: 'itinerary', day })}
            onOpenPlace={openPlace}
          />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'budget'}
          aria-hidden={route.tab !== 'budget'}
        >
          <BudgetView onOpenPlace={openPlace} />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'places'}
          aria-hidden={route.tab !== 'places'}
        >
          <PlacesView onOpenPlace={openPlace} />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'info'}
          aria-hidden={route.tab !== 'info'}
        >
          <InfoView />
        </div>
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
                  ? { tab: 'itinerary', day: lastDay }
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

export default function App() {
  return (
    <StayPlanProvider>
      <AppShell />
    </StayPlanProvider>
  )
}
