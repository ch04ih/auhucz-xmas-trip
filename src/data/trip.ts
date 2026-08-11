import type { DayPlan, FlightLeg, FlightOption, HotelCityGroup, HotelOption } from './types'

export const tripMeta = {
  title: '🎄 奧匈捷 14 天聖誕市集',
  nights: '14 天 13 夜',
  start: '2026-12-07',
  end: '2026-12-21',
  dateRangeLabel: '12/7 – 12/21',
  year: 2026,
}

export const flightOptions: FlightOption[] = [
  { cabin: '經濟艙', price: 33639 },
  { cabin: '豪經艙', price: 68786 },
]

export const flightLegs: FlightLeg[] = [
  { route: '台北 ➜ 維也納', detail: '12/7 23:35 – 12/8 06:50　華航 CI63' },
  { route: '布拉格 ➜ 台北', detail: '12/20 10:30 – 12/21 05:25　華航 CI68' },
]

export const hotelCities: HotelCityGroup[] = [
  {
    cityId: 'budapest',
    city: '布達佩斯',
    nights: '3 晚',
    dates: '12/8 – 12/11',
    defaultOptionId: 'basiliq-suite',
    options: [
      {
        id: 'hotel-vision',
        placeId: 'hotel-vision',
        name: '美景飯店－大陸集團',
        room: '雙床房',
        price: 16314,
        stars: 4,
        summary: '市區方便、性價比高；房間較普通，適合想省預算。',
      },
      {
        id: 'basiliq-exec',
        placeId: 'basiliq',
        name: 'BasiliQ Hotel',
        room: '行政房',
        price: 19961,
        stars: 4,
        note: '不可退 · 2025 開幕',
        summary: '全新四星，走路就到聖殿大教堂市集；行政房新淨實用。',
        imageId: 'basiliq-room',
      },
      {
        id: 'basiliq-suite',
        placeId: 'basiliq',
        name: 'BasiliQ Hotel',
        room: '招牌套房（聖殿大教堂景觀）',
        price: 22787,
        stars: 4,
        note: '不可退 · 含四客早餐 · 2025 開幕',
        summary: '窗景正對大教堂，市集夜景超加分；空間比行政房寬，推薦首選。',
      },
      {
        id: 'kempinski',
        placeId: 'kempinski',
        name: 'Kempinski Hotel Corvinus',
        room: '高級雙床房',
        price: 25248,
        stars: 5,
        note: '不可退 · 2025 翻新',
        summary: '五星旗艦、服務與隔音最好；價格最高，住得最穩。',
      },
    ],
  },
  {
    cityId: 'vienna',
    city: '維也納',
    nights: '4 晚',
    dates: '12/11 – 12/15',
    defaultOptionId: 'jaz-vienna',
    options: [
      {
        id: 'ibis-wien',
        placeId: 'ibis-wien',
        name: '宜必思維也納中央火車站飯店',
        room: '雙床房',
        price: 24899,
        stars: 3,
        note: '不可退',
        summary: '貼著中央車站，轉車最省事；房間基本，去老城要搭地鐵。',
      },
      {
        id: 'spark-hilton',
        placeId: 'spark-hilton',
        name: '希爾頓維也納多瑙城區 Spark 飯店',
        room: '雙床房',
        price: 22364,
        stars: 4,
        note: '2022 開幕',
        summary: '新、乾淨、價位友善；在多瑙城區，每天進老城通勤稍遠。',
      },
      {
        id: 'jaz-vienna',
        placeId: 'jaz-vienna',
        name: '維也納城市爵士飯店',
        room: '悠音房',
        price: 27042,
        stars: 4,
        note: '不可退 · 2021 開幕',
        summary: '設計感強、地鐵方便；氣氛好，比車站飯店更有度假感。',
      },
      {
        id: 'hilton-vienna-park',
        placeId: 'hilton-vienna-park',
        name: '希爾頓維也納公園飯店',
        room: '雙床房',
        price: 43636,
        stars: 5,
        note: '不可退 · 2020 翻新',
        summary: '五星、靠市政廳公園與市集；位置與舒適度最好，也最貴。',
      },
    ],
  },
  {
    cityId: 'prague',
    city: '布拉格',
    nights: '5 晚',
    dates: '12/15 – 12/20',
    defaultOptionId: 'hilton-prague',
    options: [
      {
        id: 'botanique',
        placeId: 'botanique',
        name: '布拉格植物園飯店',
        room: '雙床房',
        price: 32814,
        stars: 4,
        note: '不可退',
        summary: '四星舒適、相對省錢；離老城稍遠，進出多半要叫車或搭電車。',
      },
      {
        id: 'hilton-prague',
        placeId: 'hilton-prague',
        name: '布拉格古城希爾頓飯店',
        room: '希爾頓雙床房',
        price: 38022,
        stars: 5,
        note: '不可退 · 2016 翻新',
        summary: '住在老城裡，走路逛廣場與橋最輕鬆；五星規格，晚歸也安心。',
      },
    ],
  },
]

export const defaultHotelSelection: Record<HotelCityGroup['cityId'], string> = {
  budapest: 'basiliq-suite',
  vienna: 'jaz-vienna',
  prague: 'hilton-prague',
}

export function hotelOptionById(id: string): HotelOption | undefined {
  for (const city of hotelCities) {
    const found = city.options.find((opt) => opt.id === id)
    if (found) return found
  }
  return undefined
}

export function hotelPerPersonFromSelection(
  selection: Record<HotelCityGroup['cityId'], string>,
): number {
  const total = hotelCities.reduce((sum, city) => {
    const opt =
      city.options.find((o) => o.id === selection[city.cityId]) ??
      city.options.find((o) => o.id === city.defaultOptionId) ??
      city.options[0]
    return sum + opt.price
  }, 0)
  return Math.round(total / 2)
}

export const hotelPerPerson = hotelPerPersonFromSelection(defaultHotelSelection)

export const transportItems = [
  {
    label: '維也納機場 ➜ 中央車站',
    detail: 'Day 2 · €19.9',
    price: 743,
    placeId: 'wien-hbf',
  },
  {
    label: '維也納 ➜ 布達佩斯',
    detail: 'ÖBB 火車頭等艙 €35.4',
    price: 1324,
    placeId: 'obb',
  },
  {
    label: '布達佩斯 ➜ 維也納',
    detail: 'ÖBB 火車頭等艙 €31.4',
    price: 1174,
    placeId: 'obb',
  },
  {
    label: '維也納 ➜ 布拉格',
    detail: 'ÖBB 火車頭等艙 €32　15:10–19:23',
    price: 1195,
    placeId: 'obb',
  },
  {
    label: '布拉格飯店 ➜ 機場專車',
    detail: 'Day 14 · 每人 $1,000',
    price: 1000,
    placeId: 'prg-airport',
  },
]

export const ticketItems = [
  {
    label: '薩爾斯堡 & 哈修塔特一日遊',
    detail: 'Klook 團體日遊',
    price: 3733,
    placeId: 'klook-daytrip',
  },
  {
    label: '國會大廈內部導覽',
    detail: 'Day 3 · 非歐盟成人 14,000 HUF，含中文語音導覽',
    price: 1445,
    placeId: 'parliament',
  },
  {
    label: '城堡山復古纜車',
    detail: 'Day 3 · 官網單程 4,500 HUF（上山後走路下山）',
    price: 464,
    placeId: 'funicular',
  },
  {
    label: '塞車尼溫泉',
    detail: 'Day 4 週四 · 平日全日票含置物櫃 13,200 HUF',
    price: 1362,
    placeId: 'szechenyi',
  },
  {
    label: '多瑙河夜航',
    detail: 'Day 4 · 參考 Legenda 官網晚間航程約 €25，含中文語音',
    price: 934,
    placeId: 'danube-cruise',
  },
  {
    label: '美景宮上宮（克林姆《吻》）',
    detail: 'Day 6 · 官網上宮成人 €23',
    price: 859,
    placeId: 'belvedere',
  },
  {
    label: '維也納國家歌劇院',
    detail: 'Day 8 · 官網站票 Parterre €18；座位視劇目另計',
    price: 672,
    placeId: 'staatsoper',
  },
  {
    label: '布拉格城堡套票',
    detail: 'Day 11 · 主迴路成人 450 CZK（聖維特、舊皇宮、黃金巷）',
    price: 695,
    placeId: 'prague-castle',
  },
]

export const optionalTicketItems = [
  {
    label: '美泉宮宮殿（若進宮）',
    detail: 'Day 6 · Palace Ticket 成人 €42，含語音導覽；冬季價可能微調',
    price: 1569,
    placeId: 'schonbrunn',
  },
]

export const days: DayPlan[] = [
  {
    day: 1,
    date: '12/7',
    weekday: '一',
    title: '啟程前往歐洲',
    cityLabel: '台北 ➜ 維也納',
    cityIds: ['taipei', 'inflight'],
    coverPlaceId: 'ci63',
    schedule: [
      {
        time: '21:30',
        title: '抵達桃園機場',
        note: '預留出境與安檢時間',
        placeIds: ['tpe-airport'],
      },
      {
        time: '23:35',
        title: '華航 CI63 直飛維也納',
        note: '機上充分休息補眠',
        placeIds: ['ci63'],
      },
    ],
    meals: {
      breakfast: { label: '自理' },
      lunch: { label: '機上餐點' },
      dinner: { label: '機上餐點' },
    },
    transport: '桃園機場搭機',
    lodging: '機上睡眠',
    lodgingPlaceId: 'ci63',
  },
  {
    day: 2,
    date: '12/8',
    weekday: '二',
    title: '維也納落地 ➔ 直奔布達佩斯',
    cityLabel: '維也納 ➜ 布達佩斯',
    cityIds: ['vienna', 'budapest'],
    coverPlaceId: 'st-stephen-market',
    schedule: [
      {
        time: '06:50',
        title: '抵達維也納',
        placeIds: ['ci63'],
      },
      {
        time: '07:30 – 08:30',
        title: '搭 ÖBB 到維也納中央車站',
        note: '機場地底電車／列車約 15 分',
        placeIds: ['obb', 'wien-hbf'],
      },
      {
        time: '08:30 – 09:30',
        title: '車站買點東西吃',
        placeIds: ['wien-hbf'],
      },
      {
        time: '09:40 – 12:35',
        title: 'ÖBB 特快火車（頭等艙）前往布達佩斯',
        note: '車上休息',
        placeIds: ['obb'],
      },
      {
        time: '12:35 – 13:10',
        title: '飯店放行李',
        placeIds: ['basiliq'],
      },
      {
        time: '13:30 – 15:00',
        title: '瓦茨街逛街 + 午餐',
        placeIds: ['vaci-utca'],
      },
      {
        time: '15:00 – 17:00',
        title: '飯店 check-in 休息',
        placeIds: ['basiliq'],
      },
      {
        time: '17:00 – 19:00',
        title: '聖伊什特萬大教堂聖誕市集',
        note: '布達佩斯規模最大市集，看光影秀',
        placeIds: ['st-stephen-market', 'st-stephen-basilica'],
      },
    ],
    meals: {
      lunch: {
        label: '火車上輕食或抵達後小吃',
        time: '約 13:30',
        placeIds: ['vaci-utca'],
      },
      dinner: {
        label: 'Bors GastroBar 或市集小吃',
        time: '約 19:00',
        placeIds: ['bors-gastrobar', 'st-stephen-market'],
      },
    },
    transport: '機場地底搭電車至維也納中央車站，轉乘特快火車頭等艙直達布達佩斯；市區步行／Bolt。',
    lodging: 'BasiliQ Hotel（1/3 晚）',
    lodgingPlaceId: 'basiliq',
  },
  {
    day: 3,
    date: '12/9',
    weekday: '三',
    title: '經典宮廷與城堡夕陽',
    cityLabel: '布達佩斯',
    cityIds: ['budapest'],
    coverPlaceId: 'parliament',
    schedule: [
      { time: '11:00', title: '睡飽飽出門' },
      {
        time: '11:30 – 12:30',
        title: '紐約咖啡館早午餐',
        note: '被譽為全歐最美咖啡館',
        placeIds: ['new-york-cafe'],
      },
      {
        time: '13:00 – 14:30',
        title: '國會大廈內部導覽',
        note: '中文語音導覽；歐洲最宏偉哥德式建築之一',
        placeIds: ['parliament'],
      },
      {
        time: '15:00 – 17:00',
        title: '漁人堡與布達城堡',
        note: '搭纜車上山，看城堡、夕陽與市景',
        placeIds: ['funicular', 'fishermans-bastion', 'buda-castle'],
      },
    ],
    meals: {
      lunch: {
        label: '紐約咖啡館（奢華早午餐／輕食咖啡）',
        time: '11:30',
        placeIds: ['new-york-cafe'],
      },
      dinner: {
        label: 'Kiskakukk（傳統匈牙利燉牛肉湯 Goulash）',
        time: '19:00',
        placeIds: ['kiskakukk'],
      },
    },
    transport: '市內全搭 Bolt；城堡區搭復古纜車（Funicular）上山。',
    lodging: 'BasiliQ Hotel（2/3 晚）',
    lodgingPlaceId: 'basiliq',
  },
  {
    day: 4,
    date: '12/10',
    weekday: '四',
    title: '百年市集與冰火溫泉',
    cityLabel: '布達佩斯',
    cityIds: ['budapest'],
    coverPlaceId: 'szechenyi',
    schedule: [
      { time: '11:00', title: '睡飽飽出門' },
      {
        time: '11:30 – 13:00',
        title: '中央市場',
        note: '採買鵝肝醬、紅椒粉與刺繡藝品',
        placeIds: ['great-market-hall', 'langos'],
      },
      {
        time: '13:30 – 16:30',
        title: '塞車尼戶外溫泉',
        note: '巴洛克黃色宮殿中的冬日露天熱泉',
        placeIds: ['szechenyi'],
      },
      {
        time: '17:00 – 18:30',
        title: '沃伊達奇城堡市集',
        note: '童話氣氛的城堡外聖誕市集',
        placeIds: ['vajdahunyad-market', 'vajdahunyad'],
      },
      {
        time: '20:30 – 22:00',
        title: '多瑙河夜航遊船',
        note: '近距離看金黃燈飾國會大廈夜景',
        placeIds: ['danube-cruise'],
      },
    ],
    meals: {
      lunch: {
        label: '中央市場二樓 Lángos 炸餅',
        time: '13:00',
        placeIds: ['langos', 'great-market-hall'],
      },
      dinner: {
        label: 'Menza（摩登匈牙利菜，招牌鴨胸）',
        time: '19:30',
        placeIds: ['menza'],
      },
    },
    transport: '景點間以 Bolt 接駁；可體驗黃線地鐵 M1。',
    lodging: 'BasiliQ Hotel（3/3 晚）',
    lodgingPlaceId: 'basiliq',
  },
  {
    day: 5,
    date: '12/11',
    weekday: '五',
    title: '布達佩斯 ➔ 維也納',
    subtitle: '歐洲最大聖誕市集',
    cityLabel: '布達佩斯 ➜ 維也納',
    cityIds: ['budapest', 'vienna'],
    coverPlaceId: 'stephansdom',
    schedule: [
      {
        time: '11:00',
        title: '退房、吃東西',
        note: '12:00 前退房',
        placeIds: ['basiliq'],
      },
      {
        time: '12:30 – 15:20',
        title: 'ÖBB 特快火車（頭等艙）回維也納',
        placeIds: ['obb'],
      },
      {
        time: '15:30 – 17:00',
        title: '飯店 check-in 休息',
        placeIds: ['jaz-vienna'],
      },
      {
        time: '17:00 – 19:00',
        title: '維也納市政廳聖誕市集',
        note: '全歐規模最大、燈飾最華麗',
        placeIds: ['rathaus-market', 'rathaus'],
      },
      {
        time: '19:00 – 20:30',
        title: '聖史蒂芬大教堂・老城散步',
        placeIds: ['stephansdom'],
      },
    ],
    meals: {
      lunch: {
        label: '火車餐車或飯店附近輕食',
        time: '約 12:30',
      },
      dinner: {
        label: 'Figlmüller（百年巨無霸維也納炸牛排）',
        time: '19:00',
        placeIds: ['figlmuller'],
      },
    },
    transport: 'ÖBB 特快火車頭等艙；老城區市集與餐廳皆可步行。',
    lodging: 'Jaz in the City Vienna（1/4 晚）',
    lodgingPlaceId: 'jaz-vienna',
  },
  {
    day: 6,
    date: '12/12',
    weekday: '六',
    title: '皇家宮殿與古典咖啡館',
    cityLabel: '維也納',
    cityIds: ['vienna'],
    coverPlaceId: 'the-kiss',
    schedule: [
      { time: '11:00', title: '睡飽飽出門' },
      {
        time: '11:30 – 13:00',
        title: '中央咖啡館 Café Central',
        note: '音樂家與文人聚集的百年咖啡館',
        placeIds: ['cafe-central'],
      },
      {
        time: '13:30 – 16:00',
        title: '美泉宮（熊布朗宮）',
        note: '哈布斯堡夏宮，逛宮殿前方大型市集',
        placeIds: ['schonbrunn', 'schonbrunn-market'],
      },
      {
        time: '16:30 – 18:30',
        title: '美景宮 + 聖誕市集',
        note: '克林姆《吻》、巴洛克水池倒影',
        placeIds: ['belvedere', 'the-kiss', 'belvedere-market'],
      },
    ],
    meals: {
      lunch: {
        label: '中央咖啡館（早午餐、咖啡與招牌甜點）',
        time: '11:30',
        placeIds: ['cafe-central'],
      },
      dinner: {
        label: 'Plachutta（正宗清燉牛肉 Tafelspitz）',
        time: '19:00',
        placeIds: ['plachutta'],
      },
    },
    transport: '市區至美泉宮與美景宮搭 Bolt 或地鐵 U-Bahn。',
    lodging: 'Jaz in the City Vienna（2/4 晚）',
    lodgingPlaceId: 'jaz-vienna',
  },
  {
    day: 7,
    date: '12/13',
    weekday: '日',
    title: '薩爾斯堡 & 哈修塔特一日遊',
    subtitle: '比較辛苦的一天，拉車時間長',
    cityLabel: '維也納 ➜ 薩爾斯堡／哈修塔特',
    cityIds: ['vienna', 'salzburg', 'hallstatt'],
    coverPlaceId: 'hallstatt',
    schedule: [
      {
        time: '07:30 – 20:00',
        title: 'Klook 薩爾斯堡 & 哈修塔特一日遊',
        placeIds: ['klook-daytrip', 'salzburg', 'hallstatt'],
      },
    ],
    meals: {
      lunch: {
        label: '在哈修塔特吃',
        placeIds: ['hallstatt'],
      },
      dinner: { label: '飯店附近吃' },
    },
    transport: '巴士一日遊',
    lodging: 'Jaz in the City Vienna（3/4 晚）',
    lodgingPlaceId: 'jaz-vienna',
  },
  {
    day: 8,
    date: '12/14',
    weekday: '一',
    title: '維也納放鬆日',
    cityLabel: '維也納',
    cityIds: ['vienna'],
    coverPlaceId: 'staatsoper',
    schedule: [
      {
        time: '12:30 – 14:00',
        title: '自然醒，去納許市場吃午餐',
        placeIds: ['naschmarkt', 'neni'],
      },
      {
        time: '14:30 – 17:00',
        title: '老城區晃晃',
        note: '格拉本大街、科爾市場等精品街',
        placeIds: ['graben', 'kohlmarkt'],
      },
      {
        time: '17:00 – 18:30',
        title: '吃晚餐',
        placeIds: ['ribs-of-vienna', 'lugeck'],
      },
      {
        time: '19:00 – 21:30',
        title: '維也納國家歌劇院',
        note: '歌劇或芭蕾演出',
        placeIds: ['staatsoper'],
      },
    ],
    meals: {
      lunch: {
        label: 'NENI 或市場內海鮮攤',
        time: '12:30',
        placeIds: ['neni', 'naschmarkt'],
      },
      dinner: {
        label: 'Ribs of Vienna 或 Lugeck',
        time: '17:00–18:30',
        placeIds: ['ribs-of-vienna', 'lugeck'],
      },
    },
    transport: 'Bolt 或地鐵 U-Bahn。',
    lodging: 'Jaz in the City Vienna（4/4 晚）',
    lodgingPlaceId: 'jaz-vienna',
  },
  {
    day: 9,
    date: '12/15',
    weekday: '二',
    title: '維也納 ➔ 布拉格',
    cityLabel: '維也納 ➜ 布拉格',
    coverPlaceId: 'obb',
    cityIds: ['vienna', 'prague'],
    schedule: [
      {
        time: '12:00',
        title: '退房，行李寄放飯店',
        note: '先放行李再出門；回程再取行李搭 Bolt 去中央車站',
        placeIds: ['jaz-vienna'],
      },
      {
        time: '12:20 – 13:30',
        title: '午餐 Zum Schwarzen Kameel',
        note: '格拉本旁百年老店，開放式三明治與熱食，份量適中',
        placeIds: ['schwarzer-kameel'],
      },
      {
        time: '13:30 – 14:20',
        title: '格拉本／科爾市場買最後紀念品',
        placeIds: ['graben', 'kohlmarkt'],
      },
      {
        time: '14:20 – 14:50',
        title: '回飯店取行李，Bolt 前往中央車站',
        note: '預留塞車，目標 14:50 前到站',
        placeIds: ['jaz-vienna', 'wien-hbf'],
      },
      {
        time: '15:10 – 19:23',
        title: 'ÖBB 特快火車（頭等艙）直達布拉格',
        note: 'Wien Hbf → Praha hl.n.，車上休息',
        placeIds: ['obb', 'praha-hlavni'],
      },
      {
        time: '19:23 – 20:00',
        title: '抵達，前往飯店 check-in',
        placeIds: ['praha-hlavni', 'hilton-prague'],
      },
      {
        time: '20:15 – 21:45',
        title: '晚餐 Lokál Dlouhááá',
        note: '道地捷克菜與生啤，抵達第一晚吃得飽',
        placeIds: ['lokal'],
      },
      {
        time: '21:45 – 22:30',
        title: '老城廣場夜晃',
        note: '先看聖誕樹與市集燈火，明天再完整走白天路線',
        placeIds: ['old-town-square', 'prague-christmas-market'],
      },
    ],
    meals: {
      lunch: {
        label: 'Zum Schwarzen Kameel（黑駱駝）',
        time: '12:20',
        placeIds: ['schwarzer-kameel'],
      },
      dinner: {
        label: 'Lokál Dlouhááá（道地捷克菜與生啤）',
        time: '20:15',
        placeIds: ['lokal'],
      },
    },
    transport: '退房後 Bolt 至中央車站；ÖBB 頭等艙 15:10–19:23 直達布拉格；再叫車到飯店。',
    lodging: 'Hilton Prague Old Town（1/5 晚）',
    lodgingPlaceId: 'hilton-prague',
  },
  {
    day: 10,
    date: '12/16',
    weekday: '三',
    title: '童話老城與查理大橋',
    cityLabel: '布拉格',
    cityIds: ['prague'],
    coverPlaceId: 'old-town-square',
    schedule: [
      { time: '11:00', title: '睡飽飽出門' },
      {
        time: '11:30 – 13:00',
        title: '查理大橋',
        note: '伏爾塔瓦河上最古老石橋，欣賞巴洛克雕像',
        placeIds: ['charles-bridge'],
      },
      {
        time: '13:00 – 14:30',
        title: '伏爾塔瓦河景觀午餐',
        note: '邊用餐邊看城堡遠景',
        placeIds: ['kampa-park'],
      },
      {
        time: '15:00 – 18:00',
        title: '老城廣場與天文鐘',
        note: '全歐最美聖誕樹，整點報時與市集',
        placeIds: ['old-town-square', 'astronomical-clock', 'prague-christmas-market'],
      },
    ],
    meals: {
      lunch: {
        label: 'Kampa Park 或河畔景觀餐廳',
        time: '13:00',
        placeIds: ['kampa-park'],
      },
      dinner: {
        label: 'U Fleků（500 年釀酒廠，黑啤與烤鴨）',
        time: '19:00',
        placeIds: ['u-fleku'],
      },
    },
    transport: '老城區與查理大橋步行；累了搭 Uber／Bolt。',
    lodging: 'Hilton Prague Old Town（2/5 晚）',
    lodgingPlaceId: 'hilton-prague',
  },
  {
    day: 11,
    date: '12/17',
    weekday: '四',
    title: '城堡區與帝國午茶',
    cityLabel: '布拉格',
    cityIds: ['prague'],
    coverPlaceId: 'st-vitus',
    schedule: [
      { time: '11:00', title: '睡飽飽出門' },
      {
        time: '11:30 – 14:00',
        title: '布拉格城堡區',
        note: '聖維特大教堂、舊皇宮、黃金巷，由上往下走',
        placeIds: ['prague-castle', 'st-vitus', 'old-royal-palace', 'golden-lane'],
      },
      {
        time: '14:30 – 17:00',
        title: '帝國咖啡館下午茶',
        note: '結束後順道採買菠丹妮',
        placeIds: ['cafe-imperial', 'botanicus'],
      },
    ],
    meals: {
      lunch: {
        label: '城堡區景觀餐廳（如 Terasa U Zlaté studně）',
        time: '12:00',
        placeIds: ['terasa'],
      },
      dinner: {
        label: 'Mlynec（河畔精緻捷克菜，查理大橋夜景）',
        time: '19:00',
        placeIds: ['mlynec'],
      },
    },
    transport: '去程 Uber／Bolt 上山至城堡頂，一路往下走回老城。',
    lodging: 'Hilton Prague Old Town（3/5 晚）',
    lodgingPlaceId: 'hilton-prague',
  },
  {
    day: 12,
    date: '12/18',
    weekday: '五',
    title: '高堡區雪景與漫活日',
    cityLabel: '布拉格',
    cityIds: ['prague'],
    coverPlaceId: 'vysehrad',
    schedule: [
      { time: '11:00', title: '睡飽飽出門' },
      {
        time: '11:30 – 14:00',
        title: '高堡區 Vyšehrad',
        note: '在地人私房祕境，俯瞰紅瓦雪景與河景',
        placeIds: ['vysehrad'],
      },
      {
        time: '14:30 – 17:00',
        title: '市民會館下午茶',
        note: '新藝術風格建築',
        placeIds: ['municipal-house'],
      },
      {
        time: '17:00 – 18:30',
        title: '瓦茨拉夫廣場市集',
        placeIds: ['wenceslas'],
      },
    ],
    meals: {
      lunch: {
        label: '高堡區周邊在地小餐館',
        time: '12:30',
        placeIds: ['vysehrad'],
      },
      dinner: {
        label: 'V Zátiší（米其林推薦精緻捷克菜）',
        time: '19:00',
        placeIds: ['v-zatisi'],
      },
    },
    transport: '高堡區搭 Uber／Bolt 約 10 分鐘，回程可散步回老城。',
    lodging: 'Hilton Prague Old Town（4/5 晚）',
    lodgingPlaceId: 'hilton-prague',
  },
  {
    day: 13,
    date: '12/19',
    weekday: '六',
    title: '最後採買與歡送晚宴',
    cityLabel: '布拉格',
    cityIds: ['prague'],
    coverPlaceId: 'old-town-shopping',
    schedule: [
      { time: '11:00', title: '睡飽晚出門' },
      {
        time: '11:00 – 13:00',
        title: '老城精品街最後採買',
        placeIds: ['old-town-shopping', 'botanicus'],
      },
      {
        time: '14:00 – 16:00',
        title: '回飯店收拾行李、秤重打包',
        placeIds: ['hilton-prague'],
      },
      {
        time: '16:30 – 18:30',
        title: '重溫老城廣場夜景',
        note: '喝最後一杯熱果汁',
        placeIds: ['old-town-square', 'prague-christmas-market'],
      },
    ],
    meals: {
      lunch: {
        label: 'Café Louvre 羅浮咖啡館輕食',
        time: '11:30',
        placeIds: ['cafe-louvre'],
      },
      dinner: {
        label: 'Restaurant Bellevue 歡送晚宴',
        time: '18:30',
        placeIds: ['bellevue'],
      },
    },
    transport: '全天於老城區與飯店周邊，零拉車負擔。',
    lodging: 'Hilton Prague Old Town（5/5 晚）',
    lodgingPlaceId: 'hilton-prague',
  },
  {
    day: 14,
    date: '12/20–21',
    weekday: '日／一',
    title: '布拉格 ➔ 桃園，平安返台',
    cityLabel: '布拉格 ➜ 台北',
    cityIds: ['prague', 'inflight', 'taipei'],
    coverPlaceId: 'prg-airport',
    schedule: [
      {
        time: '12/20 07:30',
        title: '退房，搭機場接送',
        note: '車程約 25 分鐘',
        placeIds: ['hilton-prague', 'prg-airport'],
      },
      {
        time: '12/20 10:30',
        title: '華航 CI68 直飛返台',
        placeIds: ['ci68'],
      },
      {
        time: '12/21 05:25',
        title: '抵達桃園國際機場',
        placeIds: ['tpe-airport'],
      },
    ],
    meals: {
      breakfast: { label: '飯店或機場' },
      lunch: { label: '機上餐點' },
      dinner: { label: '機上餐點' },
    },
    transport: '門對門專車送機 ➔ 華航直飛。',
    lodging: '機上／返家',
    lodgingPlaceId: 'ci68',
  },
]

export function formatTwd(n: number): string {
  return `$${n.toLocaleString('zh-TW')}`
}

export function getDayByNumber(day: number): DayPlan | undefined {
  return days.find((d) => d.day === day)
}

export function placesForDay(day: DayPlan): string[] {
  const ids = new Set<string>()
  for (const item of day.schedule) {
    item.placeIds?.forEach((id) => ids.add(id))
  }
  for (const meal of Object.values(day.meals)) {
    meal?.placeIds?.forEach((id) => ids.add(id))
  }
  if (day.lodgingPlaceId) ids.add(day.lodgingPlaceId)
  return [...ids]
}
