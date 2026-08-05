import { getPlace } from '../data/places'

interface Props {
  ids?: string[]
  onOpen: (id: string) => void
}

export function PlaceChips({ ids, onOpen }: Props) {
  if (!ids?.length) return null

  return (
    <div className="chips">
      {ids.map((id) => {
        const place = getPlace(id)
        if (!place) return null
        return (
          <button
            key={id}
            type="button"
            className="chip"
            onClick={() => onOpen(id)}
          >
            {place.name}
          </button>
        )
      })}
    </div>
  )
}
