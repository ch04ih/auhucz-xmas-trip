import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyHotelSelectionToDays,
  defaultHotelSelection,
  defaultStayPlanId,
  getStayPlan,
  type StayPlan,
  type StayPlanId,
} from '../data/stayPlans'
import type { DayPlan, HotelCityGroup } from '../data/types'

interface StayPlanContextValue {
  planId: StayPlanId
  plan: StayPlan
  /** 依預算飯店選擇解析後的行程（住宿文案與 placeId 已同步） */
  resolvedDays: DayPlan[]
  /** 4/4/4 已定案；保留 API 供日後切回 3/4/5 */
  setPlanId: (id: StayPlanId) => void
  hotelSelection: Record<HotelCityGroup['cityId'], string>
  setHotelSelection: React.Dispatch<
    React.SetStateAction<Record<HotelCityGroup['cityId'], string>>
  >
  selectHotel: (cityId: HotelCityGroup['cityId'], optionId: string) => void
}

const StayPlanContext = createContext<StayPlanContextValue | null>(null)

export function StayPlanProvider({ children }: { children: ReactNode }) {
  const planId: StayPlanId = defaultStayPlanId
  const [hotelSelection, setHotelSelection] = useState(defaultHotelSelection)

  const setPlanId = useCallback((_id: StayPlanId) => {
    /* 3/4/5 仍保留在 stayPlans，目前固定 4/4/4 */
  }, [])

  const selectHotel = useCallback((cityId: HotelCityGroup['cityId'], optionId: string) => {
    setHotelSelection((prev) => ({ ...prev, [cityId]: optionId }))
  }, [])

  const plan = useMemo(() => getStayPlan(planId), [planId])

  const resolvedDays = useMemo(
    () => applyHotelSelectionToDays(plan.days, hotelSelection, plan.hotelCities),
    [plan.days, plan.hotelCities, hotelSelection],
  )

  const value = useMemo(
    () => ({
      planId,
      plan,
      resolvedDays,
      setPlanId,
      hotelSelection,
      setHotelSelection,
      selectHotel,
    }),
    [plan, resolvedDays, hotelSelection, selectHotel, setPlanId],
  )

  return <StayPlanContext.Provider value={value}>{children}</StayPlanContext.Provider>
}

export function useStayPlan(): StayPlanContextValue {
  const ctx = useContext(StayPlanContext)
  if (!ctx) throw new Error('useStayPlan must be used within StayPlanProvider')
  return ctx
}
