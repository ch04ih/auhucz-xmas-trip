import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import {
  defaultStayPlanId,
  getStayPlan,
  type StayPlan,
  type StayPlanId,
} from '../data/stayPlans'

interface StayPlanContextValue {
  planId: StayPlanId
  plan: StayPlan
  /** 4/4/4 已定案；保留 API 供日後切回 3/4/5 */
  setPlanId: (id: StayPlanId) => void
}

const StayPlanContext = createContext<StayPlanContextValue | null>(null)

export function StayPlanProvider({ children }: { children: ReactNode }) {
  const planId: StayPlanId = defaultStayPlanId

  const setPlanId = useCallback((_id: StayPlanId) => {
    /* 3/4/5 仍保留在 stayPlans，目前固定 4/4/4 */
  }, [])

  const value = useMemo(
    () => ({
      planId,
      plan: getStayPlan(planId),
      setPlanId,
    }),
    [setPlanId],
  )

  return <StayPlanContext.Provider value={value}>{children}</StayPlanContext.Provider>
}

export function useStayPlan(): StayPlanContextValue {
  const ctx = useContext(StayPlanContext)
  if (!ctx) throw new Error('useStayPlan must be used within StayPlanProvider')
  return ctx
}
