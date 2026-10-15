import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

/** 單排可橫滑的標籤列；還有被遮住的標籤時，該側邊緣會淡出提示 */
export function TabStrip({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ left: false, right: false })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const left = el.scrollLeft > 1
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
    setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }))
  }, [])

  useEffect(() => {
    update()
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const className = [
    'tl-tabs',
    edges.left && 'fade-left',
    edges.right && 'fade-right',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={ref}
      className={className}
      role="tablist"
      onScroll={update}
      onClick={(e) => {
        const el = ref.current
        const tab = (e.target as HTMLElement).closest<HTMLElement>('.tl-tab')
        if (!el || !tab) return
        const pad = 40
        const start = tab.offsetLeft
        const end = start + tab.offsetWidth
        if (start - pad < el.scrollLeft) {
          el.scrollTo({ left: Math.max(0, start - pad), behavior: 'smooth' })
        } else if (end + pad > el.scrollLeft + el.clientWidth) {
          el.scrollTo({ left: end + pad - el.clientWidth, behavior: 'smooth' })
        }
      }}
    >
      {children}
    </div>
  )
}
