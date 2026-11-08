import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

function loadList<T extends string>(key: string, allowed: readonly T[]): T[] | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? 'null') as unknown
    if (!Array.isArray(parsed)) return null
    return [...new Set(parsed)].filter(
      (id): id is T => typeof id === 'string' && (allowed as readonly string[]).includes(id),
    )
  } catch {
    return null
  }
}

function saveList(key: string, list: readonly string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

export function useSectionLayout<T extends string>(storageKey: string, defaults: readonly T[]) {
  const orderKey = `${storageKey}-order`
  const hiddenKey = `${storageKey}-hidden`
  const [order, setOrder] = useState<T[]>(() => {
    const saved = loadList(orderKey, defaults) ?? []
    return [...saved, ...defaults.filter((id) => !saved.includes(id))]
  })
  const [hidden, setHidden] = useState<Set<T>>(() => new Set(loadList(hiddenKey, defaults) ?? []))
  const [editing, setEditing] = useState(false)

  useEffect(() => saveList(orderKey, order), [orderKey, order])
  useEffect(() => saveList(hiddenKey, [...hidden]), [hiddenKey, hidden])

  const toggleHidden = (id: T) => {
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const reset = () => {
    setOrder([...defaults])
    setHidden(new Set())
  }

  return {
    order,
    setOrder,
    hidden,
    toggleHidden,
    reset,
    editing,
    setEditing,
    visible: order.filter((id) => !hidden.has(id)),
  }
}

type SectionLayoutState<T extends string> = ReturnType<typeof useSectionLayout<T>>

export function SectionLayoutToggle<T extends string>({ layout }: { layout: SectionLayoutState<T> }) {
  return (
    <button
      type="button"
      className="text-btn info-order-toggle"
      onClick={() => layout.setEditing((open) => !open)}
    >
      {layout.editing ? '完成' : '↕ 調整順序'}
    </button>
  )
}

export function SectionLayoutEditor<T extends string>({
  layout,
  titles,
}: {
  layout: SectionLayoutState<T>
  titles: Record<T, string>
}) {
  const { order, setOrder, hidden, toggleHidden } = layout
  const listRef = useRef<HTMLOListElement>(null)
  const orderRef = useRef(order)
  orderRef.current = order
  const dragRef = useRef<{ id: T; startY: number } | null>(null)
  const [drag, setDrag] = useState<{ id: T; offset: number } | null>(null)

  if (!layout.editing) return null

  const rowHeight = (id: T) =>
    listRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`)?.offsetHeight ?? 0

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>, id: T) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { id, startY: event.clientY }
    setDrag({ id, offset: 0 })
  }

  const moveDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = dragRef.current
    if (!current) return
    let offset = event.clientY - current.startY
    const list = orderRef.current
    const index = list.indexOf(current.id)
    const nextId = list[index + 1]
    const prevId = list[index - 1]

    if (nextId && offset > rowHeight(nextId) / 2) {
      const height = rowHeight(nextId)
      const next = [...list]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      orderRef.current = next
      setOrder(next)
      current.startY += height
      offset -= height
    } else if (prevId && offset < -rowHeight(prevId) / 2) {
      const height = rowHeight(prevId)
      const next = [...list]
      ;[next[index], next[index - 1]] = [next[index - 1], next[index]]
      orderRef.current = next
      setOrder(next)
      current.startY -= height
      offset += height
    }

    setDrag({ id: current.id, offset })
  }

  const endDrag = () => {
    dragRef.current = null
    setDrag(null)
  }

  return (
    <div className="info-card info-order-editor">
      <span>勾選要顯示的區塊，按住右邊三條線拖曳排序，會記在這台裝置。</span>
      <ol ref={listRef}>
        {order.map((id) => (
          <li
            key={id}
            data-id={id}
            className={drag?.id === id ? 'dragging' : undefined}
            style={drag?.id === id ? { transform: `translateY(${drag.offset}px)` } : undefined}
          >
            <label className={hidden.has(id) ? 'info-order-check off' : 'info-order-check'}>
              <input type="checkbox" checked={!hidden.has(id)} onChange={() => toggleHidden(id)} />
              <strong>{titles[id]}</strong>
            </label>
            <button
              type="button"
              className="drag-handle"
              aria-label={`拖曳 ${titles[id]}`}
              onPointerDown={(event) => startDrag(event, id)}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <i />
              <i />
              <i />
            </button>
          </li>
        ))}
      </ol>
      <div className="info-order-actions">
        <button type="button" className="text-btn" onClick={layout.reset}>
          恢復預設
        </button>
        <button type="button" className="text-btn" onClick={() => layout.setEditing(false)}>
          完成
        </button>
      </div>
    </div>
  )
}
