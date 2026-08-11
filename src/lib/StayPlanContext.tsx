import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultStayPlanId,
  getStayPlan,
  stayPlans,
  type StayPlan,
  type StayPlanId,
} from '../data/stayPlans'

const STORAGE_KEY = 'auhucz-stay-plan'

interface StayPlanContextValue {
  planId: StayPlanId
  plan: StayPlan
  setPlanId: (id: StayPlanId) => void
}

const StayPlanContext = createContext<StayPlanContextValue | null>(null)

function readStoredPlanId(): StayPlanId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw && stayPlans.some((p) => p.id === raw)) return raw as StayPlanId
  } catch {
    /* ignore */
  }
  return defaultStayPlanId
}

export function StayPlanProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanIdState] = useState<StayPlanId>(() =>
    typeof window === 'undefined' ? defaultStayPlanId : readStoredPlanId(),
  )

  const setPlanId = useCallback((id: StayPlanId) => {
    setPlanIdState(id)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, planId)
    } catch {
      /* ignore */
    }
  }, [planId])

  const value = useMemo(
    () => ({
      planId,
      plan: getStayPlan(planId),
      setPlanId,
    }),
    [planId, setPlanId],
  )

  return <StayPlanContext.Provider value={value}>{children}</StayPlanContext.Provider>
}

export function useStayPlan(): StayPlanContextValue {
  const ctx = useContext(StayPlanContext)
  if (!ctx) throw new Error('useStayPlan must be used within StayPlanProvider')
  return ctx
}
