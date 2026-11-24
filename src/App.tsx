import { useEffect, useState } from 'react'
import { Holly, LightString, Snowfall } from './components/Festive'
import { PlaceModal } from './components/PlaceModal'
import { StayPlanProvider, useStayPlan } from './lib/StayPlanContext'
import { parseHash, toHash, type AppRoute } from './lib/route'
import { scheduleWarmAllPlaceImages, warmDayCovers } from './lib/preloadImages'
import type { GuideCityId } from './data/cityGuides'
import { BookingView } from './views/BookingView'
import { BudgetView } from './views/BudgetView'
import { CityGuideView } from './views/CityGuideView'
import { HomeView } from './views/HomeView'
import { ItineraryView } from './views/ItineraryView'
import { InfoView } from './views/InfoView'
import { PlacesView } from './views/PlacesView'
import { RestaurantsView } from './views/RestaurantsView'
import { ToolsView } from './views/ToolsView'
import type { Tab } from './data/types'

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: '總覽' },
  { id: 'itinerary', label: '行程' },
  { id: 'restaurants', label: '餐廳' },
  { id: 'tools', label: '小工具' },
  { id: 'info', label: '資訊' },
]

const moreTabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'city', label: '城市介紹', icon: '🏙️' },
  { id: 'places', label: '景點', icon: '📍' },
  { id: 'budget', label: '預算', icon: '💰' },
  { id: 'bookings', label: '訂位清單', icon: '✅' },
]

function AppShell() {
  const { plan } = useStayPlan()
  const [route, setRoute] = useState<AppRoute>(() => parseHash())
  const [placeId, setPlaceId] = useState<string | null>(() => parseHash().placeId ?? null)
  const [lastDay, setLastDay] = useState(() => parseHash().day ?? 1)
  const [lastCityId, setLastCityId] = useState<GuideCityId>(
    () => parseHash().cityId ?? 'budapest',
  )
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const sync = () => {
      const next = parseHash()
      setRoute((prev) => {
        if (prev.tab !== next.tab) window.scrollTo(0, 0)
        return next
      })
      setPlaceId(next.placeId ?? null)
      setMoreOpen(false)
      if (next.tab === 'itinerary' && next.day) setLastDay(next.day)
      if (next.tab === 'city' && next.cityId) setLastCityId(next.cityId)
    }
    window.addEventListener('hashchange', sync)
    if (!window.location.hash) {
      window.location.replace('#/')
    }
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    document.body.dataset.tab = route.tab
  }, [route.tab])

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
      <Snowfall />
      <main className="main">
        <LightString />
        <div
          className="tab-panel"
          hidden={route.tab !== 'home'}
          aria-hidden={route.tab !== 'home'}
        >
          <HomeView
            onOpenDay={(day) => go({ tab: 'itinerary', day })}
            onOpenPlaces={() => go({ tab: 'places' })}
            onOpenCity={(cityId, section) =>
              go({ tab: 'city', cityId, guideSection: section })
            }
          />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'city'}
          aria-hidden={route.tab !== 'city'}
        >
          <CityGuideView
            cityId={(route.cityId ?? 'budapest') as GuideCityId}
            initialSection={route.guideSection}
            onSelectCity={(cityId) => go({ tab: 'city', cityId })}
            onBack={() => go({ tab: 'home' })}
            onOpenPlace={openPlace}
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
          <PlacesView onOpenPlace={openPlace} active={route.tab === 'places'} />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'restaurants'}
          aria-hidden={route.tab !== 'restaurants'}
        >
          <RestaurantsView onOpenPlace={openPlace} />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'tools'}
          aria-hidden={route.tab !== 'tools'}
        >
          <ToolsView />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'info'}
          aria-hidden={route.tab !== 'info'}
        >
          <InfoView />
        </div>
        <div
          className="tab-panel"
          hidden={route.tab !== 'bookings'}
          aria-hidden={route.tab !== 'bookings'}
        >
          <BookingView />
        </div>
      </main>

      <nav className="tabbar" aria-label="主要選單">
        {tabs.map((tab) => {
          const active = route.tab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              className={active ? 'tab active' : 'tab'}
              onClick={() =>
                go(
                  tab.id === 'itinerary'
                    ? { tab: 'itinerary', day: lastDay }
                    : { tab: tab.id },
                )
              }
            >
              {tab.label}
              {active ? <Holly className="holly holly-card" /> : null}
            </button>
          )
        })}
        <button
          type="button"
          className={
            moreTabs.some((tab) => tab.id === route.tab) ? 'tab tab-more active' : 'tab tab-more'
          }
          aria-label="更多"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen((open) => !open)}
        >
          <span className="tab-more-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </nav>

      {moreOpen && (
        <>
          <div className="more-backdrop" onClick={() => setMoreOpen(false)} />
          <div className="more-menu" role="menu">
            {moreTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="menuitem"
                className={route.tab === tab.id ? 'more-item active' : 'more-item'}
                onClick={() => {
                  setMoreOpen(false)
                  go(
                    tab.id === 'city'
                      ? { tab: 'city', cityId: lastCityId }
                      : { tab: tab.id },
                  )
                }}
              >
                <span aria-hidden="true">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </>
      )}

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
