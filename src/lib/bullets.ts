const OPEN = new Set(['（', '(', '「', '《'])
const CLOSE = new Set(['）', ')', '」', '》'])

/** 依句號／分號切成條列；括號與引號裡的標點不切 */
export function splitPoints(text: string, separators = '。；'): string[] {
  const points: string[] = []
  let depth = 0
  let buf = ''
  for (const ch of text) {
    if (OPEN.has(ch)) depth++
    else if (CLOSE.has(ch)) depth = Math.max(0, depth - 1)
    if (depth === 0 && separators.includes(ch)) {
      if (buf.trim()) points.push(buf.trim())
      buf = ''
      continue
    }
    buf += ch
  }
  if (buf.trim()) points.push(buf.trim())
  return points
}
