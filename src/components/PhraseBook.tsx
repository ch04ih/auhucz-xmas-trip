import { Fragment, useEffect, useState } from 'react'

type LangCode = 'hu' | 'de' | 'cs'

const langs: { code: LangCode; label: string; city: string; speechLang: string }[] = [
  { code: 'hu', label: '匈牙利文', city: '布達佩斯', speechLang: 'hu-HU' },
  { code: 'de', label: '德文', city: '維也納', speechLang: 'de-AT' },
  { code: 'cs', label: '捷克文', city: '布拉格', speechLang: 'cs-CZ' },
]

const phrases: ({ zh: string } & Record<LangCode, string>)[] = [
  { zh: '你好', hu: 'Jó napot', de: 'Grüß Gott', cs: 'Dobrý den' },
  { zh: '謝謝', hu: 'Köszönöm', de: 'Danke', cs: 'Děkuji' },
  { zh: '不好意思', hu: 'Elnézést', de: 'Entschuldigung', cs: 'Promiňte' },
  { zh: '我要這個', hu: 'Ezt kérem', de: 'Das hier, bitte', cs: 'Tohle, prosím' },
  { zh: '一個', hu: 'Egyet kérek', de: 'Eins, bitte', cs: 'Jeden, prosím' },
  { zh: '兩個', hu: 'Kettőt kérek', de: 'Zwei, bitte', cs: 'Dvě, prosím' },
  { zh: '多少錢', hu: 'Mennyibe kerül?', de: 'Wie viel kostet das?', cs: 'Kolik to stojí?' },
  {
    zh: '可以刷卡嗎',
    hu: 'Fizethetek kártyával?',
    de: 'Kann ich mit Karte zahlen?',
    cs: 'Můžu platit kartou?',
  },
  { zh: '好吃！', hu: 'Finom!', de: 'Lecker!', cs: 'Výborné!' },
  { zh: '結帳', hu: 'A számlát kérem', de: 'Die Rechnung, bitte', cs: 'Zaplatím, prosím' },
  { zh: '廁所在哪', hu: 'Hol van a mosdó?', de: 'Wo ist die Toilette?', cs: 'Kde je toaleta?' },
]

function pickVoice(lang: string) {
  const voices = window.speechSynthesis.getVoices()
  const normalized = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase()
  const base = lang.slice(0, 2).toLowerCase()
  return (
    voices.find((v) => normalized(v) === lang.toLowerCase()) ??
    voices.find((v) => normalized(v).startsWith(base))
  )
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
      <path
        d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PhraseBook() {
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [selected, setSelected] = useState<{ zh: string; code: LangCode } | null>(null)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    if (!canSpeak) return
    window.speechSynthesis.getVoices()
    return () => window.speechSynthesis.cancel()
  }, [canSpeak])

  useEffect(() => {
    if (!selected) return
    const close = (event: PointerEvent) => {
      const target = event.target as Element | null
      if (target?.closest('.phrase-play, .phrase-written')) return
      setSelected(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [selected])

  const play = (zh: string, code: LangCode) => {
    setSelected({ zh, code })
    if (!canSpeak) return
    const text = phrases.find((p) => p.zh === zh)?.[code]
    const lang = langs.find((l) => l.code === code)?.speechLang
    if (!text || !lang) return
    const synth = window.speechSynthesis
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.85
    const voice = pickVoice(lang)
    if (voice) utterance.voice = voice
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    setSpeaking(true)
    synth.speak(utterance)
  }

  return (
    <>
      <h2>🗣️ 簡單當地用語</h2>
      <p className="hero-sub pending-lead">
        點喇叭聽發音，下面會顯示怎麼寫；說慢一點、帶微笑就好。
      </p>
      <div className="info-card phrase-table">
        <div className="phrase-grid">
          <span />
          {langs.map((lang) => (
            <span key={lang.code} className="phrase-lang">
              {lang.label}
              <small>{lang.city}</small>
            </span>
          ))}

          {phrases.map((phrase) => {
            const open = selected?.zh === phrase.zh
            const openLang = open ? langs.find((l) => l.code === selected.code) : undefined
            return (
              <Fragment key={phrase.zh}>
                <span className="phrase-zh">{phrase.zh}</span>
                {langs.map((lang) => {
                  const active = open && selected.code === lang.code
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      className={
                        active ? (speaking ? 'phrase-play active playing' : 'phrase-play active') : 'phrase-play'
                      }
                      aria-label={`${lang.label}：${phrase.zh}`}
                      onClick={() => play(phrase.zh, lang.code)}
                    >
                      <SpeakerIcon />
                    </button>
                  )
                })}
                {openLang && (
                  <button
                    type="button"
                    className="phrase-written"
                    onClick={() => play(phrase.zh, openLang.code)}
                  >
                    <small>{openLang.label}</small>
                    <b>{phrase[openLang.code]}</b>
                  </button>
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}
