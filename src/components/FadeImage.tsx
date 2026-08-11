import { useEffect, useState, type ImgHTMLAttributes } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  className?: string
}

/** Shows a short fade-in once the image is ready (helps mask mobile decode delay). */
export function FadeImage({ className = '', src, onLoad, onError, ...rest }: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)
  }, [src])

  return (
    <img
      {...rest}
      src={src}
      className={`${className}${ready ? ' img-ready' : ''}`.trim()}
      decoding="async"
      onLoad={(e) => {
        setReady(true)
        onLoad?.(e)
      }}
      onError={(e) => {
        setReady(true)
        onError?.(e)
      }}
      ref={(node) => {
        if (node && node.complete && node.naturalWidth > 0) {
          // Already cached — show immediately without waiting for another load event.
          queueMicrotask(() => setReady(true))
        }
      }}
    />
  )
}
