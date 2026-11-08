import { useMemo, useReducer, useState } from 'react'
import { Holly } from './Festive'

export type MoneyCode = 'TWD' | 'EUR' | 'CZK' | 'HUF'
type Op = '+' | '−' | '×' | '÷'

const moneyLabels: Record<MoneyCode, string> = {
  TWD: '台幣',
  EUR: '歐元',
  CZK: '克朗',
  HUF: '福林',
}

const codes = Object.keys(moneyLabels) as MoneyCode[]

interface Props {
  perTwd: Record<Exclude<MoneyCode, 'TWD'>, number>
  rateNote: string
}

function apply(a: number, b: number, op: Op) {
  if (op === '+') return a + b
  if (op === '−') return a - b
  if (op === '×') return a * b
  return b === 0 ? NaN : a / b
}

/** 去掉浮點誤差（0.1+0.2）並避免出現太長的小數 */
function tidy(n: number) {
  if (!Number.isFinite(n)) return 'Error'
  return String(Number.parseFloat(n.toPrecision(12)))
}

/** 整數部分加千分位，小數照使用者輸入保留（含結尾的 "."） */
function formatEntry(entry: string) {
  if (entry === 'Error') return entry
  const negative = entry.startsWith('-')
  const [int, dec] = (negative ? entry.slice(1) : entry).split('.')
  const grouped = new Intl.NumberFormat('en-US').format(Number(int || '0'))
  return `${negative ? '-' : ''}${grouped}${dec !== undefined ? `.${dec}` : ''}`
}

interface CalcState {
  entry: string
  acc: number | null
  op: Op | null
  /** 下一個數字要重新開始輸入（剛按完運算或等號） */
  fresh: boolean
}

type CalcAction =
  | { type: 'digit'; d: string }
  | { type: 'op'; op: Op }
  | { type: 'equals' }
  | { type: 'clear' }
  | { type: 'backspace' }
  | { type: 'percent' }

function calcReducer(s: CalcState, a: CalcAction): CalcState {
  const value = Number(s.entry)
  switch (a.type) {
    case 'digit': {
      if (s.fresh || s.entry === '0' || s.entry === 'Error') {
        return { ...s, entry: a.d === '.' ? '0.' : a.d, fresh: false }
      }
      if (a.d === '.' && s.entry.includes('.')) return s
      if (s.entry.replace(/[-.]/g, '').length >= 12) return s
      return { ...s, entry: s.entry + a.d }
    }
    case 'op': {
      if (s.acc !== null && s.op && !s.fresh) {
        const result = tidy(apply(s.acc, value, s.op))
        return { entry: result, acc: Number(result), op: a.op, fresh: true }
      }
      return { ...s, acc: value, op: a.op, fresh: true }
    }
    case 'equals':
      if (s.acc === null || !s.op) return s
      return { entry: tidy(apply(s.acc, value, s.op)), acc: null, op: null, fresh: true }
    case 'clear':
      return { entry: '0', acc: null, op: null, fresh: true }
    case 'backspace': {
      if (s.fresh || s.entry === 'Error') return s
      const next = s.entry.slice(0, -1)
      return { ...s, entry: next === '' || next === '-' ? '0' : next }
    }
    case 'percent':
      return { ...s, entry: tidy(value / 100), fresh: true }
  }
}

function CurrencySelect({ value, onChange }: { value: MoneyCode; onChange: (c: MoneyCode) => void }) {
  return (
    <label className="calc-currency">
      <select value={value} onChange={(e) => onChange(e.target.value as MoneyCode)}>
        {codes.map((code) => (
          <option key={code} value={code}>
            {moneyLabels[code]} {code}
          </option>
        ))}
      </select>
      <span>
        {moneyLabels[value]} <b>{value}</b> ▾
      </span>
    </label>
  )
}

export function CurrencyCalculator({ perTwd, rateNote }: Props) {
  const [from, setFrom] = useState<MoneyCode>('TWD')
  const [to, setTo] = useState<MoneyCode>('EUR')
  const [{ entry, acc, op, fresh }, dispatch] = useReducer(calcReducer, {
    entry: '100',
    acc: null,
    op: null,
    fresh: true,
  })

  const value = Number(entry)

  const converted = useMemo(() => {
    if (!Number.isFinite(value)) return '—'
    const toTwd = (code: MoneyCode, n: number) => (code === 'TWD' ? n : n / perTwd[code])
    const fromTwd = (code: MoneyCode, n: number) => (code === 'TWD' ? n : n * perTwd[code])
    const result = fromTwd(to, toTwd(from, value))
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: Math.abs(result) >= 100 ? 0 : 2,
    }).format(result)
  }, [value, from, to, perTwd])

  const pressDigit = (d: string) => dispatch({ type: 'digit', d })
  const pressOp = (next: Op) => dispatch({ type: 'op', op: next })
  const pressEquals = () => dispatch({ type: 'equals' })
  const clear = () => dispatch({ type: 'clear' })
  const backspace = () => dispatch({ type: 'backspace' })
  const percent = () => dispatch({ type: 'percent' })

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const keys: { label: string; kind: 'num' | 'fn' | 'op'; onPress: () => void; wide?: boolean; active?: boolean }[] = [
    { label: 'AC', kind: 'fn', onPress: clear },
    { label: '⌫', kind: 'fn', onPress: backspace },
    { label: '%', kind: 'fn', onPress: percent },
    { label: '÷', kind: 'op', onPress: () => pressOp('÷'), active: op === '÷' && fresh },
    ...['7', '8', '9'].map((d) => ({ label: d, kind: 'num' as const, onPress: () => pressDigit(d) })),
    { label: '×', kind: 'op', onPress: () => pressOp('×'), active: op === '×' && fresh },
    ...['4', '5', '6'].map((d) => ({ label: d, kind: 'num' as const, onPress: () => pressDigit(d) })),
    { label: '−', kind: 'op', onPress: () => pressOp('−'), active: op === '−' && fresh },
    ...['1', '2', '3'].map((d) => ({ label: d, kind: 'num' as const, onPress: () => pressDigit(d) })),
    { label: '+', kind: 'op', onPress: () => pressOp('+'), active: op === '+' && fresh },
    { label: '0', kind: 'num', onPress: () => pressDigit('0'), wide: true },
    { label: '.', kind: 'num', onPress: () => pressDigit('.') },
    { label: '=', kind: 'op', onPress: pressEquals },
  ]

  return (
    <div className="calc">
      <Holly className="holly holly-card" />
      <div className="calc-display">
        <div className="calc-row">
          <CurrencySelect value={from} onChange={setFrom} />
          <div className="calc-value">
            {acc !== null && op && (
              <em>
                {formatEntry(tidy(acc))} {op}
              </em>
            )}
            <strong>{formatEntry(entry)}</strong>
          </div>
        </div>
        <button type="button" className="calc-swap" onClick={swap} aria-label="交換幣別">
          ⇅
        </button>
        <div className="calc-row calc-row-result">
          <CurrencySelect value={to} onChange={setTo} />
          <div className="calc-value">
            <strong>{converted}</strong>
          </div>
        </div>
      </div>
      <div className="calc-keys">
        {keys.map((k) => (
          <button
            key={k.label}
            type="button"
            className={[
              'calc-key',
              `calc-key-${k.kind}`,
              k.wide ? 'calc-key-wide' : '',
              k.active ? 'active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={k.onPress}
          >
            {k.label}
          </button>
        ))}
      </div>
      <p className="calc-note">{rateNote}</p>
    </div>
  )
}
