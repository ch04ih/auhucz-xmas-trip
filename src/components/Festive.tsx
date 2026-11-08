import type { CSSProperties } from 'react'

/** 固定的「亂數」，每次渲染位置都一樣，不會閃動 */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const flakes = Array.from({ length: 30 }, (_, i) => ({
  left: seeded(i, 1) * 100,
  size: 11 + seeded(i, 2) * 12,
  duration: 14 + seeded(i, 3) * 14,
  delay: -seeded(i, 4) * 28,
  drift: (seeded(i, 5) - 0.5) * 60,
  opacity: 0.75 + seeded(i, 6) * 0.25,
}))

/** iOS 會把 ❄ 字元畫成彩色 emoji、不吃 CSS 顏色，所以改用 SVG */
function SnowflakeIcon() {
  return (
    <svg viewBox="-12 -12 24 24" width="1em" height="1em">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
        {[0, 60, 120].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path d="M0 -10.5V10.5" />
            <path d="M-3 -8.5L0 -5.5L3 -8.5M-3 8.5L0 5.5L3 8.5" />
          </g>
        ))}
      </g>
    </svg>
  )
}

export function Snowfall() {
  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          style={
            {
              left: `${f.left}%`,
              fontSize: `${f.size}px`,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              '--drift': `${f.drift}px`,
            } as CSSProperties
          }
        >
          <SnowflakeIcon />
        </span>
      ))}
    </div>
  )
}

const bulbColors = ['var(--accent)', 'var(--gold)', 'var(--forest)']

/** 燈串的電線是一條下垂的弧線（高 14px），燈泡沿著弧線掛 */
export function LightString({ count = 13 }: { count?: number }) {
  return (
    <div className="light-string" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const t = (i + 0.5) / count
        return (
          <span
            key={i}
            className="bulb"
            style={
              {
                '--bulb': bulbColors[i % bulbColors.length],
                left: `${t * 100}%`,
                top: `${14 * Math.sqrt(1 - (2 * t - 1) ** 2)}px`,
                animationDelay: `${(i % 4) * 0.45}s`,
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

/** 冬青葉＋紅果，放在卡片角落 */
const LEAF_UPPER =
  'M0 0 Q2 -4 7 -7 Q11 -3.4 15 -8.4 Q19 -3.6 23 -6.6 Q26.5 -2.6 31 0 Z'
const LEAF_LOWER =
  'M0 0 Q2 4 7 7 Q11 3.4 15 8.4 Q19 3.6 23 6.6 Q26.5 2.6 31 0 Z'

function HollyLeaf({ transform, light, dark }: { transform: string; light: string; dark: string }) {
  return (
    <g transform={transform}>
      <path d={LEAF_UPPER} fill={light} />
      <path d={LEAF_LOWER} fill={dark} />
      <path
        d="M1 0 Q15 -0.6 30 0 M8 -0.3 L10.5 -3.2 M16 -0.4 L18.5 -3.6 M8 0.3 L10.5 3.2 M16 0.4 L18.5 3.6"
        fill="none"
        stroke="#a9cdb1"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.75"
      />
    </g>
  )
}

function HollyBerry({ cx, cy, fill }: { cx: number; cy: number; fill: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="3.3" fill={fill} stroke="rgba(60,10,20,0.35)" strokeWidth="0.5" />
      <circle cx={cx - 1.1} cy={cy - 1.2} r="1" fill="#fff" opacity="0.75" />
      <circle cx={cx + 1.3} cy={cy + 1.5} r="0.45" fill="#3a1218" opacity="0.6" />
    </g>
  )
}

export function Holly({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden="true">
      <HollyLeaf transform="translate(24 18) rotate(-98) scale(0.55)" light="#3f6650" dark="#2a4a39" />
      <HollyLeaf transform="translate(23 19) rotate(-158) scale(0.74 -0.74)" light="#5a8a6a" dark="#335c46" />
      <HollyLeaf transform="translate(25 19) rotate(-22) scale(0.74)" light="#5a8a6a" dark="#335c46" />
      <HollyBerry cx={21} cy={19.5} fill="#b3263a" />
      <HollyBerry cx={27.2} cy={19.5} fill="#9e1f33" />
      <HollyBerry cx={24} cy={24.4} fill="#c22f43" />
    </svg>
  )
}
