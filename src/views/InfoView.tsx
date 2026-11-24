import { Fragment, type ReactNode } from 'react'
import { Holly } from '../components/Festive'
import {
  SectionLayoutEditor,
  SectionLayoutToggle,
  useSectionLayout,
} from '../components/SectionLayout'

const weather = [
  {
    city: '布達佩斯',
    high: '3–5°C',
    low: '-2–0°C',
    note: '河邊風稍大，著重頭頸防風保暖；隨處有暖氣與熱飲。',
  },
  {
    city: '維也納',
    high: '3–4°C',
    low: '-1–1°C',
    note: '市集廣場無遮蔽，外層建議穿防風羽絨外套。',
  },
  {
    city: '薩爾斯堡／哈修塔特',
    high: '0–3°C',
    low: '-5–-1°C',
    note: '山區湖區較冷，搭乘厚羊毛襪與發熱褲，注意保暖。',
  },
  {
    city: '布拉格',
    high: '1–3°C',
    low: '-3–0°C',
    note: '陰天多、偶有飄雪，地面若有融雪注意鞋底防滑。',
  },
]

const hotelCards = [
  {
    city: '布達佩斯 · 12/11–15',
    name: 'Hotel Moments Budapest',
    address: 'Andrássy út 8, 1061 Budapest',
    phone: '+36 1 611 7000',
  },
  {
    city: '維也納 · 12/15–19',
    name: 'Jaz in the City Vienna',
    address: 'Windmühlgasse 28, 1060 Wien',
    phone: '+43 1 25300610',
  },
  {
    city: '布拉格 · 12/19–23',
    name: 'Hotel CUBE',
    address: 'Křemencova 164/18, 110 00 Praha 1',
    phone: '+420 251 019 811',
  },
]

const localEmergency = [
  { country: '奧地利', police: '133', ambulance: '144' },
  { country: '匈牙利', police: '107', ambulance: '104' },
  { country: '捷克', police: '158', ambulance: '155' },
]

const taiwanOffices = [
  {
    name: '駐奧地利台北經濟文化代表處',
    city: '維也納',
    emergency: '+43 664 345 0455',
    office: '+43 1 2124720',
    address: 'Wagramer Str. 19/11. OG, 1220 Wien',
  },
  {
    name: '駐匈牙利台北代表處',
    city: '布達佩斯',
    emergency: '+36 30 964 1546',
    office: '+36 1 266 2884',
    address: 'Rákóczi út 1-3/II, 1088 Budapest',
  },
  {
    name: '駐捷克台北經濟文化辦事處',
    city: '布拉格',
    emergency: '+420 603 166 707',
    office: '+420 233 320 606',
    address: 'Evropská 2590/33c, 160 00 Praha 6',
  },
]

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

const packingGroups: { title: string; note?: string; items: string[] }[] = [
  {
    title: '保暖衣物',
    note: '洋蔥式穿法，進室內有暖氣好穿脫。',
    items: ['防風長版外套', '發熱衣', '中層毛衣／刷毛', '毛帽', '圍巾', '防滑防水鞋', '止滑鞋套'],
  },
  {
    title: '防寒保濕',
    note: '空氣乾，護唇與保濕很重要。',
    items: ['護唇膏', '保濕乳霜', '手套', '折疊傘'],
  },
  {
    title: '證件與錢',
    note: '信用卡兩張分開放；零錢留著付廁所和市集杯子押金。',
    items: ['護照', '護照照片存手機', '信用卡 ×2', '少量歐元', '匈牙利福林', '捷克克朗', '零錢包'],
  },
  {
    title: '電器',
    note: '中歐是 C／F 型插頭、230V。手機、相機充電器多半通用；吹風機、電棒捲要確認雙電壓。',
    items: ['轉接頭', '行動電源', '充電線', '延長線或多孔插座', 'eSIM／網卡'],
  },
  {
    title: '特別行程',
    items: ['泳衣（溫泉）', '溫泉拖鞋', '歌劇院服裝', '好走的正式鞋'],
  },
  {
    title: '隨身小物',
    note: '歐洲超市的購物袋要另外買，帶一個折疊袋很方便。',
    items: ['常備藥', '暖暖包', '防盜斜背包', '折疊購物袋', '保溫瓶', '濕紙巾'],
  },
]

type InfoSectionId = 'hotels' | 'emergency' | 'weather' | 'packing'

const infoSectionTitles: Record<InfoSectionId, string> = {
  hotels: '🏨 飯店地址卡',
  emergency: '🆘 緊急聯絡',
  weather: '❄️ 12 月天氣',
  packing: '🧳 建議攜帶',
}

const defaultInfoOrder: InfoSectionId[] = ['hotels', 'emergency', 'weather', 'packing']

export function InfoView() {
  const layout = useSectionLayout('auhucz-info', defaultInfoOrder)

  const sections: Record<InfoSectionId, ReactNode> = {
    hotels: (
      <>
        <h2>🏨 飯店地址卡</h2>
        <p className="hero-sub pending-lead">搭 Bolt 或計程車時，直接把這張給司機看。</p>
        <div className="tip-list">
          {hotelCards.map((hotel) => (
            <div key={hotel.name} className="info-card hotel-card">
              <span>{hotel.city}</span>
              <strong>{hotel.name}</strong>
              <p className="hotel-address">{hotel.address}</p>
              <div className="hotel-links">
                <a href={telHref(hotel.phone)}>📞 {hotel.phone}</a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${hotel.address}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  地圖 ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
    emergency: (
      <>
        <h2>🆘 緊急聯絡</h2>
        <p className="hero-sub pending-lead">點號碼可以直接撥打。市集人多，包包背前面。</p>
        <div className="tip-list">
          <div className="info-card emergency-card">
            <span>歐盟通用・警察／救護／消防</span>
            <a className="emergency-main" href="tel:112">
              112
            </a>
            <p>英文可通，三國都能撥，手機沒插當地 SIM 卡也能打。</p>
            <div className="emergency-grid">
              <span />
              <span>警察</span>
              <span>救護車</span>
              {localEmergency.map((row) => (
                <Fragment key={row.country}>
                  <span>{row.country}</span>
                  <a href={telHref(row.police)}>{row.police}</a>
                  <a href={telHref(row.ambulance)}>{row.ambulance}</a>
                </Fragment>
              ))}
            </div>
          </div>

          {taiwanOffices.map((office) => (
            <div key={office.name} className="info-card office-card">
              <span>{office.city}</span>
              <strong>{office.name}</strong>
              <div className="office-lines">
                <span>急難救助（24 小時）</span>
                <a href={telHref(office.emergency)}>{office.emergency}</a>
                <span>上班時間</span>
                <a href={telHref(office.office)}>{office.office}</a>
              </div>
              <p className="office-address">{office.address}</p>
            </div>
          ))}

          <div className="info-card office-card">
            <span>台灣</span>
            <strong>外交部旅外國人緊急服務專線</strong>
            <div className="office-lines">
              <span>24 小時</span>
              <a href={telHref('+886 800 085 095')}>+886 800 085 095</a>
            </div>
            <p className="office-address">
              從國外撥要付國際電話費。急難電話只用在車禍、搶劫、生命安危等狀況；護照遺失這類一般事項，請在上班時間打代表處辦公室電話。
            </p>
          </div>
        </div>
      </>
    ),
    weather: (
      <>
        <h2>❄️ 12 月天氣</h2>
        <p className="hero-sub pending-lead">
          約略均溫，實際以出發前一週為準。白天短，約 8:00–16:00。
        </p>

        <div className="weather-overview corner-wrap">
          <Holly className="holly holly-card" />
          <span>實際均溫</span>
          <p className="weather-temps">
            白天約 <strong>1–5°C</strong>
            <i>／</i>
            夜晚約 <strong>-3–1°C</strong>
          </p>
          <p className="weather-temps-note">三城差不多；薩爾斯堡／哈修塔特再低 2–3°C。</p>
          <span>體感</span>
          <p className="weather-temps">
            約台灣寒流 <strong>12–14°C</strong>
          </p>
          <p className="weather-temps-note">
            穿好防風的話，涼涼乾乾的很好走，沒有濕冷那種黏。實際氣溫更低，可是中歐是乾冷，體感沒數字看起來可怕；空曠市集沒防風，就會再冷好幾度。
          </p>
        </div>

        <h3 className="weather-sub">📍 各城市氣候提示</h3>
        <div className="stack">
          {weather.map((item) => (
            <div key={item.city} className="weather-card">
              <div className="weather-head">
                <strong>{item.city}</strong>
                <span>
                  白天 {item.high}
                  <i>／</i>
                  夜晚 {item.low}
                </span>
              </div>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
      </>
    ),
    packing: (
      <>
        <h2>🧳 建議攜帶</h2>
        <div className="tip-list">
          {packingGroups.map((group) => (
            <div key={group.title} className="info-card">
              <strong>{group.title}</strong>
              {group.note && <p>{group.note}</p>}
              <div className="kit-chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  }

  return (
    <div className="page info-page">
      <header className="page-head">
        <p className="eyebrow">Travel info</p>
        <h1>實用資訊</h1>
        <p className="hero-sub">飯店地址、緊急聯絡、天氣與攜帶清單。</p>
        <SectionLayoutToggle layout={layout} />
      </header>

      <SectionLayoutEditor layout={layout} titles={infoSectionTitles} />

      {layout.visible.map((id) => (
        <section key={id} className="section">
          {sections[id]}
        </section>
      ))}
    </div>
  )
}
