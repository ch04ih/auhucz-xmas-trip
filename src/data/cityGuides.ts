import type { CityId } from './types'

export type GuideCityId = Extract<CityId, 'budapest' | 'vienna' | 'prague'>

export type GuideSectionId = 'eat' | 'see' | 'buy' | 'tips'

export interface CityGuideItem {
  title: string
  /** 一兩句介紹，可省略 */
  note?: string
  placeId?: string
  /** 卡片圖；沒設就用 placeId 對應的 places 圖 */
  imageId?: string
  /** 大圖被裁切時保留的位置（CSS object-position） */
  imagePosition?: string
  mapsQuery?: string
  /**
   * 是否已排進程程。
   * 有設就照這個；沒設且有 placeId 時，由行程 placeId 自動判斷。
   */
  planned?: boolean
}

export interface CityGuide {
  id: GuideCityId
  name: string
  /** 一兩句城市印象就好 */
  intro: string
  /** 總覽城市卡代表圖（places 圖 id） */
  coverImageId: string
  /** 代表圖裁切位置（CSS object-position） */
  coverImagePosition?: string
  eat: CityGuideItem[]
  see: CityGuideItem[]
  buy: CityGuideItem[]
  tips: CityGuideItem[]
}

export const guideSectionLabels: Record<GuideSectionId, string> = {
  eat: '必吃',
  see: '必去',
  buy: '必買',
  tips: '實用',
}

export const guideSectionOrder: GuideSectionId[] = ['eat', 'see', 'buy', 'tips']

export const cityGuides: CityGuide[] = [
  {
    id: 'budapest',
    name: '布達佩斯',
    coverImageId: 'parliament',
    intro:
      '布達與佩斯本來是兩座城，中間隔著多瑙河；曾歷經鄂圖曼佔領，後來又進入哈布斯堡時期，1873 年才正式合併成布達佩斯。鏈橋是兩岸第一座常設橋，國會大廈也是這個興盛年代留下的地標。冬天適合泡湯，晚上搭船看兩岸點燈，聖誕氣氛很完整。',
    eat: [
      {
        title: 'Goulash 古拉什',
        note: '匈牙利國菜燉牛肉湯，紅椒粉香氣重，配麵包或麵條吃最對味',
        placeId: 'kiskakukk',
        imageId: 'goulash',
        planned: true,
      },
      {
        title: 'Lángos 炸餅',
        note: '油炸麵餅，常見蒜泥、酸奶油與起司；市集與小吃攤都買得到',
        placeId: 'langos',
        planned: true,
      },
      {
        title: '紐約咖啡館',
        note: '華麗大廳咖啡館，金箔與水晶燈很多；適合點杯咖啡、甜點坐一下',
        placeId: 'new-york-cafe',
        planned: true,
      },
      {
        title: '大教堂市集熱食',
        note: '聖伊什特萬大教堂前的聖誕市集，香腸、熱紅酒、煙囪捲都有',
        placeId: 'st-stephen-market',
        planned: true,
      },
      {
        title: 'Chimney Cake 煙囪捲',
        note: '炭火轉烤的甜麵包捲（kürtőskalács），外層糖衣焦香，市集與街頭都常看到',
        imageId: 'food-good-food',
        imagePosition: 'center bottom',
        mapsQuery: 'kürtőskalács Budapest',
        planned: false,
      },
      {
        title: 'Ruins Bar 小吃',
        note: '廢墟酒吧區的小食與啤酒；重點是氣氛——拼貼家具、霓虹與人潮',
        imageId: 'ruin-bar-snack',
        mapsQuery: 'Szimpla Kert Budapest',
        planned: false,
      },
      {
        title: 'Dobos 蛋糕',
        note: '匈牙利經典千層蛋糕：薄海綿夾巧克力奶油，頂層焦糖脆片很有辨識度',
        imageId: 'dobos-cake',
        mapsQuery: 'Dobos cake Budapest',
        planned: false,
      },
      {
        title: 'Unicum 苦酒',
        note: 'Zwack 草藥利口酒，圓形綠瓶最好認；味道偏苦，餐後或冷天很適合',
        imageId: 'unicum',
        mapsQuery: 'Zwack Unicum Budapest',
        planned: false,
      },
    ],
    see: [
      {
        title: '國會大廈',
        note: '多瑙河畔新哥德式國會建築，尖塔與圓頂很壯觀；夜間點燈最漂亮',
        placeId: 'parliament',
      },
      {
        title: '漁人堡',
        note: '城堡區白色城堡式展望台，可看國會與多瑙河；白天免費區就能拍',
        placeId: 'fishermans-bastion',
      },
      {
        title: '布達城堡',
        note: '城堡山舊王宮與博物館區，可搭纜車上山，走下來過鏈橋',
        placeId: 'buda-castle',
      },
      {
        title: '塞切尼鏈橋',
        note: '連接布達與佩斯的經典鐵鏈橋；夜晚點燈後倒映多瑙河最漂亮',
        placeId: 'chain-bridge',
      },
      {
        title: '中央市場',
        note: '百年室內大市場，賣香料、香腸、伴手禮；二樓有小吃攤可午餐',
        placeId: 'great-market-hall',
      },
      {
        title: '塞切尼溫泉',
        note: '黃綠建築的大型溫泉浴場，戶外熱池冬天泡湯最有感',
        placeId: 'szechenyi',
      },
      {
        title: '多瑙河夜航',
        note: '晚上搭船看兩岸點燈：國會、鏈橋、城堡一次收齊',
        placeId: 'danube-cruise',
      },
      {
        title: '英雄廣場',
        note: '千年紀念廣場與騎馬雕像，旁接城市公園；常當安德拉希大道終點',
        placeId: 'heroes-square',
      },
      {
        title: '聖伊什特萬大教堂',
        note: '佩斯市中心圓頂大教堂，廣場前就是聖誕市集，可登頂看市景',
        placeId: 'st-stephen-basilica',
      },
      {
        title: '安德拉希大道',
        note: '林蔭大道，精品店與歌劇院沿線；地下有百年黃線地鐵 M1',
        placeId: 'andrassy',
      },
      {
        title: '馬加什教堂',
        note: '城堡區哥德式教堂，彩色磁磚屋頂在陽光下特別醒目',
        imageId: 'matthias-church',
        mapsQuery: 'Matthias Church Budapest',
        planned: false,
      },
      {
        title: '自由橋',
        note: '中央市場旁的綠色鐵橋，黃色電車常從橋上開過，站上去拍照很有布達佩斯感',
        imageId: 'liberty-bridge',
        mapsQuery: 'Liberty Bridge Budapest',
        planned: false,
      },
      {
        title: '蓋勒特山',
        note: '山上自由女神像，夜晚由下往上打燈，可俯瞰整條多瑙河',
        imageId: 'gellert-hill',
        mapsQuery: 'Gellért Hill Budapest',
        planned: false,
      },
      {
        title: '多瑙河鞋紀念碑',
        note: '河岸鐵鞋紀念裝置，紀念二戰時被殺害的猶太人；氣氛肅穆，適合安靜停留',
        imageId: 'shoes-danube',
        mapsQuery: 'Shoes on the Danube Bank',
        planned: false,
      },
      {
        title: '猶太會堂',
        note: 'Dohány 街會堂，歐洲最大猶太會堂之一；摩爾式雙塔與藍頂很好認',
        imageId: 'dohany-synagogue',
        mapsQuery: 'Dohány Street Synagogue',
        planned: false,
      },
      {
        title: '廢墟酒吧 Szimpla',
        note: '猶太區最經典的廢墟酒吧：舊建築裡塞滿燈飾、舊家具與混搭裝飾',
        imageId: 'szimpla-kert',
        mapsQuery: 'Szimpla Kert Budapest',
        planned: false,
      },
    ],
    buy: [
      {
        title: 'Nanushka',
        note: '匈牙利設計師品牌，剪裁簡約偏時尚；Sas 街有旗艦與 Archive',
        imageId: 'nanushka',
        mapsQuery: 'Nanushka Store & Archive Sas utca 16 Budapest',
        planned: true,
      },
      {
        title: 'Nubu',
        note: '本地精品服飾，風格乾淨現代；安德拉希大道附近好逛',
        imageId: 'nubu',
        mapsQuery: 'Nubu Studio Andrássy út 15 Budapest',
        planned: false,
      },
      {
        title: '紅椒粉 paprika',
        note: '匈牙利招牌香料，甜／辣／煙燻都可買；中央市場有禮盒組很好帶',
        placeId: 'great-market-hall',
        imageId: 'paprika',
        planned: true,
      },
      {
        title: '鵝肝醬',
        note: 'Libamáj 鵝肝醬罐頭，常溫可帶；超市與中央市場都買得到',
        placeId: 'great-market-hall',
        imageId: 'libamaj',
        planned: true,
      },
      {
        title: '刺繡小物',
        note: '匈牙利傳統刺繡手帕、杯墊或小袋；中央市場二樓常有攤位',
        placeId: 'great-market-hall',
        planned: true,
      },
      {
        title: 'Herend 瓷器',
        note: '匈牙利手繪瓷器，花鳥蝶圖樣最經典；適合當精緻伴手禮',
        imageId: 'herend',
        mapsQuery: 'Herend Porcelain Budapest',
        planned: false,
      },
      {
        title: 'Tokaji 托卡伊酒',
        note: '托卡伊 Aszú 貴腐甜白酒，5–6 puttonyos 甜度高；小瓶好帶上飛機',
        imageId: 'tokaji-wine',
        mapsQuery: 'Tokaji wine Budapest',
        planned: false,
      },
    ],
    tips: [
      {
        title: '亞洲超市',
        note: '想補泡麵、調味料可來；Bajcsy-Zsilinszky 路上有 Asia Market',
        imageId: 'asia-market',
        mapsQuery: 'Asia Market Bajcsy-Zsilinszky út 55 Budapest',
        planned: false,
      },
      {
        title: 'BudapestGO',
        note: '公車／地鐵票官方 App，可用 Apple Pay；單程約 500 福林，上車前記得驗票',
        imageId: 'budapest-go',
        planned: true,
      },
      {
        title: '退稅',
        note: '同店同發票超過 €175（約 68,000 福林）可退。VAT 27%，扣手續費實拿約 15%；最後離歐機場蓋章',
        imageId: 'tax-refund',
        planned: true,
      },
      {
        title: '福林現金',
        note: 'ATM 提福林通常比機場換匯划算；市集與小攤小額用現金較方便',
        imageId: 'forint-cash',
        planned: false,
      },
    ],
  },
  {
    id: 'vienna',
    name: '維也納',
    coverImageId: 'stephansdom',
    coverImagePosition: 'center 58%',
    intro:
      '維也納曾是哈布斯堡王朝的權力中心，帝國在此統治中歐數百年，直到一次大戰後才結束。美泉宮是皇帝夏宮，霍夫堡則有茜茜博物館，能看見這段宮廷故事。街上咖啡廳與音樂傳統延續到現在；聖誕時市政廳市集燈飾很大，白天逛街、晚上聽一場最對味。',
    eat: [
      {
        title: 'Schnitzel 炸豬排',
        note: '維也納薄脆炸豬排，麵皮包得薄、炸得金黃；常配馬鈴薯沙拉',
        placeId: 'figlmuller',
        planned: true,
      },
      {
        title: '皇帝煎餅',
        note: '撕開的甜煎餅 Kaiserschmarrn，灑糖粉，常配果醬或李子醬',
        placeId: 'demel',
        planned: true,
      },
      {
        title: '中央咖啡館',
        note: '百年經典咖啡館，報紙、大理石桌與蛋糕櫃；適合慢坐一杯',
        placeId: 'cafe-central',
        planned: true,
      },
      {
        title: '市政廳市集熱食',
        note: '市政廳廣場聖誕市集熱食：香腸、熱紅酒、烤栗子最常見',
        placeId: 'rathaus-market',
        planned: true,
      },
      {
        title: '納許市場',
        note: '露天市集與攤販午餐，國際小吃與奧地利小館都有；白天逛最熱鬧',
        placeId: 'naschmarkt',
        planned: true,
      },
      {
        title: 'Sacher 蛋糕',
        note: '維也納經典巧克力蛋糕，夾杏桃醬、外層巧克力糖衣；常配鮮奶油',
        imageId: 'sacher-cake',
        mapsQuery: 'Hotel Sacher Café Vienna',
        planned: false,
      },
      {
        title: 'Apfelstrudel 蘋果捲',
        note: '薄皮捲蘋果餡，灑糖粉；咖啡館與市集都常見，熱熱吃最好吃',
        imageId: 'apfelstrudel',
        mapsQuery: 'Apfelstrudel Vienna',
        planned: false,
      },
      {
        title: 'Würstelstand 香腸攤',
        note: '街頭香腸攤，Käsekrainer 起司香腸很經典；配麵包與芥末邊走邊吃',
        imageId: 'wurstelstand',
        mapsQuery: 'Würstelstand Vienna',
        planned: false,
      },
    ],
    see: [
      {
        title: '聖史蒂芬大教堂',
        note: '維也納地標彩色屋頂大教堂，廣場就是老城中心，可登南塔看市景',
        placeId: 'stephansdom',
      },
      {
        title: '市政廳聖誕市集',
        note: '歐洲大型聖誕市集之一，市政廳前燈飾與溜冰場很有氣氛',
        placeId: 'rathaus-market',
      },
      {
        title: '沃蒂夫教堂',
        note: '新哥德式教堂；聖誕期間常有「無限光環」裝置，晚上打燈好拍',
        placeId: 'votivkirche',
      },
      {
        title: '美泉宮',
        note: '哈布斯堡夏宮，花園與宮殿本身都壯觀；可走花園或進宮參觀',
        placeId: 'schonbrunn',
      },
      {
        title: '霍夫堡茜茜博物館',
        note: '霍夫堡皇宮內的茜茜生平展，看皇宮生活與服飾收藏',
        placeId: 'hofburg',
      },
      {
        title: '美景宮',
        note: '上美景宮美術館有克林姆特《吻》；花園展望也很漂亮',
        placeId: 'belvedere',
      },
      {
        title: '國家歌劇院',
        note: '維也納國家歌劇院，外觀新古典；晚上有演出可看，大廳也很華麗',
        placeId: 'staatsoper',
      },
      {
        title: '納許市場',
        note: '長條露天市集街道，賣食材與小吃；週末還有跳蚤市場區',
        placeId: 'naschmarkt',
      },
      {
        title: '卡爾教堂',
        note: '巴洛克圓頂教堂，前方水池倒影很適合拍照；非行程內可選去',
        imageId: 'karlskirche',
        mapsQuery: 'Karlskirche Vienna',
        planned: false,
      },
      {
        title: '百水公寓',
        note: '彩色不規則建築，窗線彎曲、陽台長植物；外觀免費看，人多可早一點',
        imageId: 'hundertwasser',
        mapsQuery: 'Hundertwasserhaus Vienna',
        planned: false,
      },
      {
        title: '普拉特樂園',
        note: '普拉特遊樂園，摩天輪是維也納地標；夜晚燈火漂亮，適合傍晚去',
        imageId: 'prater',
        mapsQuery: 'Wiener Riesenrad Prater',
        planned: false,
      },
      {
        title: '阿爾貝蒂娜',
        note: '阿爾貝蒂娜美術館，收藏版畫與經典展；建築本身與廣場也很值得看',
        imageId: 'albertina',
        mapsQuery: 'Albertina Museum Vienna',
        planned: false,
      },
      {
        title: '博物館區 MQ',
        note: '博物館區廣場與美術館聚落；廣場有戶外座位，逛累可歇腳',
        imageId: 'museumsquartier',
        mapsQuery: 'MuseumsQuartier Vienna',
        planned: false,
      },
    ],
    buy: [
      {
        title: 'Swarovski',
        note: '奧地利水晶品牌，飾品與擺件；Kärntner 大街有旗艦店好逛',
        imageId: 'swarovski',
        mapsQuery: 'Swarovski Store Kärntner Straße Vienna',
        planned: false,
      },
      {
        title: 'Wolford',
        note: '奧地利絲襪與貼身衣品牌，剪裁與材質偏精品；適合當自己或伴手禮',
        imageId: 'wolford',
        mapsQuery: 'Wolford Boutique Vienna',
        planned: false,
      },
      {
        title: 'Manner 威化',
        note: '粉紅包裝榛果威化，維也納代表性零食；機場與市區專賣店都買得到',
        imageId: 'manner',
        planned: false,
      },
      {
        title: '莫札特球',
        note: '開心果杏仁糖巧克力球，金箔包裝辨識度高；好帶、好當伴手禮',
        imageId: 'mozartkugel',
        planned: false,
      },
      {
        title: '南瓜籽油',
        note: '奧地利施泰爾馬克綠油，拌沙拉或麵包都適合；小瓶較好帶上飛機',
        imageId: 'pumpkin-seed-oil',
        mapsQuery: 'Kürbiskernöl Vienna',
        planned: false,
      },
      {
        title: 'Frey Wille',
        note: '維也納琺瑯飾品品牌，色彩與圖騰辨識度高；手鍊、項鍊常見',
        imageId: 'frey-wille',
        mapsQuery: 'FREYWILLE Vienna',
        planned: false,
      },
    ],
    tips: [
      {
        title: '市集現金',
        note: '聖誕市集與小攤常要歐元現金；零錢多留一點，杯子押金也常用現金',
        imageId: 'euro-cash',
        planned: true,
      },
      {
        title: 'WienMobil',
        note: '查公車／電車／地鐵路線與票價的官方 App；市區移動先看這個',
        imageId: 'wienmobil',
        planned: false,
      },
      {
        title: '退稅',
        note: '同張發票超過 €75 可退。VAT 20%，扣手續費實拿約 12%；機場出境蓋章',
        imageId: 'tax-refund',
        planned: true,
      },
    ],
  },
  {
    id: 'prague',
    name: '布拉格',
    coverImageId: 'charles-bridge',
    intro:
      '布拉格曾是波希米亞王國的都城，查理四世時代最盛，查理大橋與城堡區多半是那時留下的。後來也納入哈布斯堡版圖，紅瓦屋頂與老城廣場仍保留中世紀的樣子。白天從城堡一路往下逛，晚上橋上與廣場燈火最漂亮。',
    eat: [
      {
        title: '捷克豬腳',
        note: '烤豬腳配啤酒與芥末／麵包；份量大，啤酒館或捷克菜餐廳常見',
        imageId: 'czech-pork-knuckle',
        planned: false,
      },
      {
        title: '生啤',
        note: '捷克以皮爾森類生啤出名，酒體清爽；酒館點半升（půl litru）最常見',
        imageId: 'czech-beer',
        planned: true,
      },
      {
        title: '煙囪捲 Trdelník',
        note: '炭火轉烤的糖麵包捲，外層糖衣焦香；老城街頭很多，也可塞冰淇淋',
        imageId: 'food-good-food',
        imagePosition: 'center bottom',
        planned: false,
      },
      {
        title: '老城市集熱食',
        note: '老城廣場聖誕市集熱食：香腸、熱紅酒、熱果汁都有，邊逛邊吃',
        placeId: 'old-town-square',
        planned: true,
      },
      {
        title: 'U Fleků',
        note: '百年黑啤酒館，只賣自家黑啤；大廳座位多，氣氛很捷克',
        placeId: 'u-fleku',
        planned: true,
      },
      {
        title: 'Svíčková',
        note: '奶油醬燉牛肉，配麵團 knedlíky；捷克家常菜代表之一',
        imageId: 'svickova',
        mapsQuery: 'Svíčková Prague',
        planned: false,
      },
    ],
    see: [
      {
        title: '查理大橋',
        note: '伏爾塔瓦河上的石橋，橋上有聖徒雕像；清晨較空，晚上燈火漂亮',
        placeId: 'charles-bridge',
      },
      {
        title: '老城廣場',
        note: '老城心臟，聖誕樹與市集在這；旁有天文鐘與彩色建築',
        placeId: 'old-town-square',
      },
      {
        title: '天文鐘',
        note: '老城市政廳天文鐘，整點有木偶報時表演；人多可提早佔位',
        placeId: 'astronomical-clock',
      },
      {
        title: '布拉格城堡',
        note: '城堡區總稱，含聖維特大教堂與宮殿；建議上山後一路往下走回老城',
        placeId: 'prague-castle',
      },
      {
        title: '聖維特大教堂',
        note: '城堡核心哥德式大教堂，彩色玻璃與尖塔很壯觀',
        placeId: 'st-vitus',
      },
      {
        title: '火藥塔',
        note: '哥德式城門塔樓，連結市民會館；可當新舊城交界地標',
        placeId: 'powder-tower',
      },
      {
        title: '市民會館',
        note: '新藝術風格建築，外牆馬賽克與金飾華麗；可看外觀或進內廳',
        placeId: 'municipal-house',
      },
      {
        title: '慕夏博物館',
        note: '阿爾豐斯·慕夏新藝術海報與作品展；喜歡海報風格很值得',
        placeId: 'mucha-museum',
      },
      {
        title: '瓦茨拉夫廣場',
        note: '新城市集大道，購物與飯店集中；一端有聖瓦茨拉夫雕像',
        placeId: 'wenceslas',
      },
      {
        title: '約翰藍儂牆',
        note: '塗鴉與許願牆，色彩常換；小巷氣氛輕鬆，適合拍照',
        imageId: 'lennon-wall',
        mapsQuery: 'John Lennon Wall Prague',
        planned: false,
      },
      {
        title: '佩特任山',
        note: '小山展望台與小艾菲爾鐵塔風格塔；可搭纜車或走路上去看市景',
        imageId: 'petrin',
        mapsQuery: 'Petřín Lookout Tower',
        planned: false,
      },
      {
        title: '跳舞的房子',
        note: '伏爾塔瓦河畔現代扭曲建築，像兩棟樓在跳舞；外觀免費看',
        imageId: 'dancing-house',
        mapsQuery: 'Dancing House Prague',
        planned: false,
      },
      {
        title: '猶太區',
        note: 'Josefov 猶太區，有舊猶太會堂與墓園；歷史氣息濃，適合安靜走',
        imageId: 'josefov',
        mapsQuery: 'Josefov Jewish Quarter Prague',
        planned: false,
      },
      {
        title: '高堡 Vyšehrad',
        note: '南岸古城與城堡遺址，展望河景；比市中心安靜，適合半日走走',
        imageId: 'vysehrad',
        mapsQuery: 'Vyšehrad Prague',
        planned: false,
      },
    ],
    buy: [
      {
        title: '菠丹妮 Botanicus',
        note: '捷克香氛與保養品牌，草本皂、乳液好帶；老城有門市',
        placeId: 'botanicus',
        planned: true,
      },
      {
        title: 'Moser',
        note: '波希米亞水晶品牌，杯具與擺件精緻；老城有專賣店',
        imageId: 'moser',
        mapsQuery: 'Moser Store Prague Old Town',
        planned: false,
      },
      {
        title: 'Baťa',
        note: '捷克老牌鞋店，實用皮鞋與靴子；瓦茨拉夫廣場有大店',
        mapsQuery: 'Baťa Václavské náměstí Prague',
        planned: false,
      },
      {
        title: '捷克石榴石',
        note: '深紅色石榴石飾品，耳環與項鍊常見；買有信譽的店較安心',
        imageId: 'czech-garnet',
        planned: false,
      },
      {
        title: 'Marionette 木偶',
        note: '傳統木偶伴手禮，手工感強；老城紀念品店很多，挑小件好帶',
        imageId: 'marionette',
        mapsQuery: 'marionette shop Prague',
        planned: false,
      },
      {
        title: 'Becherovka',
        note: '捷克草藥利口酒，味道偏藥草甜苦；小瓶好帶，超市也能買到',
        imageId: 'becherovka',
        mapsQuery: 'Becherovka Prague',
        planned: false,
      },
    ],
    tips: [
      {
        title: '現金克朗',
        note: '市集與部分小店仍偏好克朗現金；ATM 提款通常比街頭換匯划算',
        imageId: 'czk-cash',
        planned: true,
      },
      {
        title: '退稅蓋章',
        note: '同張發票超過 2,001 CZK 可退。VAT 21%，扣手續費實拿約 12%；最後離歐機場蓋章',
        imageId: 'tax-refund',
        planned: true,
      },
      {
        title: 'PID Lítačka',
        note: '查電車／地鐵路線與票的官方 App；市區移動可先用這個',
        imageId: 'pid-litacka',
        planned: false,
      },
    ],
  },
]

export function getCityGuide(id: string | undefined): CityGuide | undefined {
  return cityGuides.find((g) => g.id === id)
}

export function isGuideCityId(id: string): id is GuideCityId {
  return cityGuides.some((g) => g.id === id)
}

export function isGuideItemPlanned(item: CityGuideItem, plannedPlaceIds: Set<string>): boolean {
  if (item.planned != null) return item.planned
  if (item.placeId) return plannedPlaceIds.has(item.placeId)
  return false
}
