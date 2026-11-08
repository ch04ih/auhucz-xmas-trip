import { useEffect, useState, type ReactNode } from 'react'
import { CurrencyCalculator, type MoneyCode } from '../components/CurrencyCalculator'
import { Holly } from '../components/Festive'
import { PhraseBook } from '../components/PhraseBook'
import {
  SectionLayoutEditor,
  SectionLayoutToggle,
  useSectionLayout,
} from '../components/SectionLayout'

const fallbackPerTwd: Record<Exclude<MoneyCode, 'TWD'>, number> = {
  EUR: 0.028,
  CZK: 0.69,
  HUF: 11.2,
}

function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('zh-TW', {
    timeZone,
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

type ToolsSectionId = 'clock' | 'currency' | 'phrases'

const toolsSectionTitles: Record<ToolsSectionId, string> = {
  clock: '🕰️ 現在時間',
  currency: '💱 貨幣換算',
  phrases: '🗣️ 簡單當地用語',
}

const defaultToolsOrder: ToolsSectionId[] = ['clock', 'currency', 'phrases']

export function ToolsView() {
  const layout = useSectionLayout('auhucz-tools', defaultToolsOrder)
  const [now, setNow] = useState(() => new Date())
  const [perTwd, setPerTwd] = useState(fallbackPerTwd)
  const [rateNote, setRateNote] = useState('使用備用匯率，連上網後會更新')

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch('https://open.er-api.com/v6/latest/TWD')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || data?.result !== 'success') return
        setPerTwd({
          EUR: Number(data.rates.EUR) || fallbackPerTwd.EUR,
          CZK: Number(data.rates.CZK) || fallbackPerTwd.CZK,
          HUF: Number(data.rates.HUF) || fallbackPerTwd.HUF,
        })
        setRateNote(`匯率更新：${String(data.time_last_update_utc || '').slice(0, 16)} UTC`)
      })
      .catch(() => {
        if (!cancelled) setRateNote('目前離線，使用備用匯率')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const sections: Record<ToolsSectionId, ReactNode> = {
    clock: (
      <>
        <h2>🕰️ 現在時間</h2>
        <p className="hero-sub pending-lead">12 月中歐是冬天時區，台灣比當地快 7 小時。</p>
        <div className="clock-grid">
          <div className="info-card corner-wrap">
            <Holly className="holly holly-card" />
            <span>台灣</span>
            <strong>{formatClock(now, 'Asia/Taipei')}</strong>
          </div>
          <div className="info-card">
            <span>當地（維也納／布達佩斯／布拉格）</span>
            <strong>{formatClock(now, 'Europe/Vienna')}</strong>
          </div>
        </div>
      </>
    ),
    currency: (
      <>
        <h2>💱 貨幣換算</h2>
        <p className="hero-sub pending-lead">
          奧地利用歐元，匈牙利用福林，捷克用克朗。聖誕市集常要現金。
        </p>
        <CurrencyCalculator perTwd={perTwd} rateNote={rateNote} />
      </>
    ),
    phrases: <PhraseBook />,
  }

  return (
    <div className="page info-page">
      <header className="page-head">
        <p className="eyebrow">Tools</p>
        <h1>小工具</h1>
        <p className="hero-sub">現在時間、貨幣換算與當地用語。</p>
        <SectionLayoutToggle layout={layout} />
      </header>

      <SectionLayoutEditor layout={layout} titles={toolsSectionTitles} />

      {layout.visible.map((id) => (
        <section key={id} className="section">
          {sections[id]}
        </section>
      ))}
    </div>
  )
}
