import type { CityId, Place, PlaceCategory } from './types'

export const cityLabels: Record<CityId, string> = {
  taipei: '台北',
  vienna: '維也納',
  budapest: '布達佩斯',
  salzburg: '薩爾斯堡',
  hallstatt: '哈修塔特',
  prague: '布拉格',
  inflight: '旅途中',
}

export const categoryLabels: Record<PlaceCategory, string> = {
  attraction: '景點',
  market: '市集',
  restaurant: '餐廳',
  cafe: '咖啡',
  hotel: '住宿',
  transport: '交通',
  shop: '購物',
  experience: '體驗',
}

export const places: Place[] = [
  {
    id: 'tpe-airport',
    name: '桃園國際機場',
    nameEn: 'Taiwan Taoyuan International Airport',
    city: 'taipei',
    category: 'transport',
    intro:
      '台灣主要國際門戶。本行程去程搭華航 CI63 直飛維也納，回程 CI68 直飛返台，建議至少於起飛前 2.5–3 小時抵達，預留冬季尖峰安檢與出境時間。',
    tip: 'Day 1 建議 21:30 到機場。回程 12/20 07:30 退房後專車送機即可。',
    mapsQuery: 'Taiwan Taoyuan International Airport',
  },
  {
    id: 'ci63',
    name: '華航 CI63',
    nameEn: 'China Airlines CI63',
    city: 'inflight',
    category: 'transport',
    intro:
      '台北直飛維也納航班。12/7 23:35 起飛，12/8 06:50 抵達，機上過夜約 12 小時。經濟艙 $33,639，豪經艙 $68,786。',
    tip: '這晚就是住宿，盡量在機上補眠，隔天落地後行程會直接轉往布達佩斯。',
  },
  {
    id: 'ci68',
    name: '華航 CI68',
    nameEn: 'China Airlines CI68',
    city: 'inflight',
    category: 'transport',
    intro:
      '布拉格直飛台北航班。12/20 10:30 起飛，12/21 05:25–05:25 左右抵達桃園。回程同樣是長程紅眼／清晨抵達。',
    tip: '布拉格機場建議提早 3 小時；07:30 退房搭專車，車程約 25 分鐘。',
  },
  {
    id: 'obb',
    name: 'ÖBB 特快火車',
    nameEn: 'ÖBB Railjet / EuroCity',
    city: 'vienna',
    category: 'transport',
    intro:
      '奧地利聯邦鐵路。維也納⇄布達佩斯去回皆訂頭等艙（約 €35.4／€31.4）；Day 9 再搭頭等艙直達布拉格，約 €32（$1,195），15:10–19:23。',
    tip: '頭等艙較安靜、座位寬，適合補眠。車票建議事先在 ÖBB app 預訂。Day 9 記得 14:40 前回到中央車站。',
    mapsQuery: 'Wien Hauptbahnhof',
  },
  {
    id: 'wien-hbf',
    name: '維也納中央車站',
    nameEn: 'Wien Hauptbahnhof',
    city: 'vienna',
    category: 'transport',
    intro:
      '維也納最主要的長途鐵路樞紐，地下有超市、麵包店與咖啡。Ibis 飯店就在車站旁，Day 2 落地後先到這裡轉 ÖBB，Day 5 回維也納也在此下車。',
    tip: '機場進市區車票以 €19.9 計。Day 9 由此搭 15:10 ÖBB 頭等艙前往布拉格。',
    mapsQuery: 'Wien Hauptbahnhof',
  },
  {
    id: 'hotel-vision',
    name: '美景飯店－大陸集團',
    nameEn: 'Hotel Vision Budapest',
    city: 'budapest',
    category: 'hotel',
    intro:
      '布達佩斯四星，市區位置方便，瓦茨街與大教堂市集都好到達。房價最親民，適合想把預算留給吃喝與門票的人；房間標準實用，沒有太多設計感。',
    tip: 'Day 2 中午可先放行李再逛街。治安與一般市中心觀光區差不多，晚上回飯店建議走大路或叫車。',
    mapsQuery: 'Hotel Vision Budapest',
  },
  {
    id: 'basiliq',
    name: 'BasiliQ Hotel',
    nameEn: 'BasiliQ Hotel Budapest',
    city: 'budapest',
    category: 'hotel',
    intro:
      '2025 年開幕的四星新飯店，就在聖伊什特萬大教堂旁邊。行政房新淨實用；招牌套房可看大教堂，還含四客早餐。逛聖誕市集幾乎不用通勤，夜晚回房也安心。',
    tip: '本行程預設住招牌套房。市集就在門口，行李可請飯店暫放。',
    mapsQuery: 'BasiliQ Hotel Budapest',
  },
  {
    id: 'kempinski',
    name: 'Kempinski Hotel Corvinus',
    nameEn: 'Kempinski Hotel Corvinus Budapest',
    city: 'budapest',
    category: 'hotel',
    intro:
      '布達佩斯五星旗艦，2025 年翻新。高級雙床房隔音與床墊都很好，服務穩定。位在市中心精華區，步行可到廣場與購物街，是「住得最穩」的選項。',
    tip: '價格最高。若很在意睡眠品質與大廳氣質，這間最有把握。',
    mapsQuery: 'Kempinski Hotel Corvinus Budapest',
  },
  {
    id: 'vaci-utca',
    name: '瓦茨街',
    nameEn: 'Váci utca',
    city: 'budapest',
    category: 'shop',
    intro:
      '布達佩斯最知名的步行購物街，連接沃洛斯馬蒂廣場與中央市場方向，兩側是紀念品店、時裝店、餐廳與街頭藝人，適合落地後先熟悉城市節奏。',
    tip: '觀光區餐廳偏貴，午餐可隨便小吃即可，把正餐留給晚上。',
    mapsQuery: 'Váci utca Budapest',
  },
  {
    id: 'st-stephen-market',
    name: '聖伊什特萬大教堂聖誕市集',
    nameEn: "St. Stephen's Basilica Christmas Market",
    city: 'budapest',
    category: 'market',
    intro:
      '布達佩斯規模最大、最華麗的聖誕市集之一，以聖伊什特萬大教堂為背景。傍晚燈光亮起後氣氛最好，常有光影投影秀打在教堂立面。',
    tip: '17:00–19:00 是看燈與逛攤的黃金時段。可順便嚐熱紅酒、煙囪捲 Chimney cake。',
    mapsQuery: "St. Stephen's Basilica Christmas Market Budapest",
  },
  {
    id: 'st-stephen-basilica',
    name: '聖伊什特萬大教堂',
    nameEn: "St. Stephen's Basilica",
    city: 'budapest',
    category: 'attraction',
    intro:
      '布達佩斯最重要的天主教堂，供奉匈牙利首位國王聖伊什特萬的右手聖骸。新古典圓頂是市區天際線地標，夜晚被燈光照亮非常壯觀。',
    tip: '若時間夠可上樓觀景台俯瞰市區；市集就在教堂前廣場。',
    mapsQuery: "St. Stephen's Basilica Budapest",
  },
  {
    id: 'bors-gastrobar',
    name: 'Bors GastroBar',
    nameEn: 'Bors GastroBar',
    city: 'budapest',
    category: 'restaurant',
    intro:
      '布達佩斯超人氣小店，以創意湯品、三明治與在地風味小食聞名，份量實在、周轉快，常有排隊。適合市集逛完後來一碗熱湯暖身。',
    tip: '店面不大，尖峰可能需等候。也可改吃市集小吃，看當天體力與排隊狀況。',
    mapsQuery: 'Bors GastroBar Budapest',
  },
  {
    id: 'new-york-cafe',
    name: '紐約咖啡館',
    nameEn: 'New York Café',
    city: 'budapest',
    category: 'cafe',
    intro:
      '常被稱為「全世界最美咖啡館」之一。金箔、壁畫、水晶燈與巴洛克大廳極盡華麗，19 世紀末曾是作家與記者聚集地。適合當成一頓儀式感早午餐，而不只是喝杯咖啡。',
    tip: '強烈建議訂位。點套餐或早午餐比較划算；進去先拍照再慢慢吃。',
    mapsQuery: 'New York Café Budapest',
  },
  {
    id: 'parliament',
    name: '布達佩斯國會大廈',
    nameEn: 'Hungarian Parliament Building',
    city: 'budapest',
    category: 'attraction',
    intro:
      '多瑙河畔的新哥德式巨構，也是匈牙利最大建築之一。外觀對稱華麗，內部導覽可見圓頂大廳、階梯與王冠複製品。無論白天或夜景都是布達佩斯招牌畫面。',
    tip: '非歐盟成人 14,000 HUF，票價含語音導覽；官網 jegymester.hu 先訂場次，進場後選中文耳機。外面拍照最佳角度在對岸漁人堡或船上。',
    mapsQuery: 'Hungarian Parliament Building',
  },
  {
    id: 'fishermans-bastion',
    name: '漁人堡',
    nameEn: "Fisherman's Bastion",
    city: 'budapest',
    category: 'attraction',
    intro:
      '布達山丘上的新羅馬式白色廊台與尖塔，建於 19–20 世紀之交，用來紀念守護這片城牆的漁民公會。由此俯瞰國會大廈與多瑙河，是看夕陽的經典位置。',
    tip: '主廊台部分收費，周圍仍有很多免費觀景點。冬天日短，15:00–16:30 就要就位看夕陽。',
    mapsQuery: "Fisherman's Bastion Budapest",
  },
  {
    id: 'buda-castle',
    name: '布達城堡',
    nameEn: 'Buda Castle',
    city: 'budapest',
    category: 'attraction',
    intro:
      '布達佩斯城堡區核心，曾是匈牙利王宮所在。現為國家藝廊與歷史博物館等文化空間，廣場、城牆與遠眺市景本身就很值得走一圈。',
    tip: '可與漁人堡同一下午走完。搭復古纜車上山最省力，下山可步行或搭公車。',
    mapsQuery: 'Buda Castle',
  },
  {
    id: 'funicular',
    name: '城堡山復古纜車',
    nameEn: 'Budavári Sikló (Castle Hill Funicular)',
    city: 'budapest',
    category: 'transport',
    intro:
      '從鍊子橋布達側山腳通往城堡區的百年纜車，車廂復古、坡度明顯，本身就是一個小體驗。可比走路省力，也適合拍照。',
    tip: '官網單程 4,500 HUF、來回 5,500 HUF。現場買票即可；尖峰可能稍等。排隊太長可改搭巴士 16 路上山。',
    mapsQuery: 'Budavári Sikló',
  },
  {
    id: 'kiskakukk',
    name: 'Kiskakukk Étterem',
    nameEn: 'Kiskakukk Étterem',
    city: 'budapest',
    category: 'restaurant',
    intro:
      '傳統匈牙利餐廳，氣氛較古典，適合品嚐國菜燉牛肉湯 Goulash、燉菜與餃子類主食。Day 3 晚餐首選，吃完一天的宮廷與城堡行程。',
    tip: 'Goulash 在匈牙利比較接近濃湯而非乾炒牛肉；可再點一道主餐分享。',
    mapsQuery: 'Kiskakukk Étterem Budapest',
  },
  {
    id: 'great-market-hall',
    name: '中央市場',
    nameEn: 'Great Market Hall (Nagyvásárcsarnok)',
    city: 'budapest',
    category: 'market',
    intro:
      '1897 年啟用的室內市集，彩色磁磚屋頂與鋼鐵骨架很有年代感。一樓賣香料、香腸、鵝肝醬、紅椒粉與農產，二樓是小吃與刺繡、桌巾等伴手禮。',
    tip: '午餐吃二樓 Lángos（大蒜酸奶油炸餅）最經典。紅椒粉與鵝肝醬是常見伴手禮，比瓦茨街便宜。',
    mapsQuery: 'Great Market Hall Budapest',
  },
  {
    id: 'langos',
    name: 'Lángos 炸餅',
    nameEn: 'Lángos',
    city: 'budapest',
    category: 'restaurant',
    intro:
      '匈牙利國民小吃：發酵麵團油炸後抹蒜、酸奶油，再加起司或其他配料。外酥內軟、份量很大，在中央市場二樓吃最有在地感。',
    tip: '一份很能飽，兩人可分享。趁熱吃，別點太多配料反而吃不完。',
    mapsQuery: 'Great Market Hall Budapest Langos',
  },
  {
    id: 'szechenyi',
    name: '塞車尼溫泉',
    nameEn: 'Széchenyi Thermal Bath',
    city: 'budapest',
    category: 'experience',
    intro:
      '布達佩斯最著名的溫泉浴場，黃色巴洛克宮殿環繞數座戶外熱池。冬天蒸汽與熱氣在冷空氣中升起，是「冰火溫泉」的招牌畫面，也是本行程放鬆核心。',
    tip: '平日全日票含置物櫃 13,200 HUF；12/19 起旺季 15,800 HUF。記得帶泳衣，戶外池才是重點。',
    mapsQuery: 'Széchenyi Thermal Bath',
  },
  {
    id: 'vajdahunyad-market',
    name: '沃伊達奇城堡市集',
    nameEn: 'Vajdahunyad Castle Christmas Market',
    city: 'budapest',
    category: 'market',
    intro:
      '位於城市公園內的沃伊達奇城堡前，建築本身融合多種歷史風格，晚上燈光照在城堡與冰場上，聖誕市集氣氛偏童話、比大教堂市集更安靜浪漫。',
    tip: '可與塞車尼溫泉同一天，溫泉出來吹風後去市集喝熱飲剛剛好。',
    mapsQuery: 'Vajdahunyad Castle Christmas Market',
  },
  {
    id: 'vajdahunyad',
    name: '沃伊達奇城堡',
    nameEn: 'Vajdahunyad Castle',
    city: 'budapest',
    category: 'attraction',
    intro:
      '為 1896 年千年慶而建的展示建築，把匈牙利各地建築風格濃縮成一座城堡，座落城市公園湖畔。冬天常有冰場，外觀非常上相。',
    tip: '不一定要進館，外觀與市集就很值得。白天與晚上氛圍差很多。',
    mapsQuery: 'Vajdahunyad Castle',
  },
  {
    id: 'menza',
    name: 'Menza Étterem és Kávéház',
    nameEn: 'Menza',
    city: 'budapest',
    category: 'restaurant',
    intro:
      '位於利斯斐倫茨廣場附近的摩登匈牙利餐廳，裝潢有復古食堂感，菜色道地但呈現較新。招牌鴨胸常被推薦，適合想吃好料又不想太正裝的晚上。',
    tip: '建議訂位。吃完再走去碼頭搭多瑙河夜航。',
    mapsQuery: 'Menza Étterem Budapest',
  },
  {
    id: 'danube-cruise',
    name: '多瑙河夜航',
    nameEn: 'Danube Evening Cruise',
    city: 'budapest',
    category: 'experience',
    intro:
      '夜遊多瑙河是看國會大廈、鍊子橋與城堡燈飾的最佳方式。金黃色燈光倒映水面，從船上拍國會幾乎不會失手，也是布達佩斯最值得排進晚上的體驗。',
    tip: '20:30–22:00 場次。Legenda 等業者晚間航程約 €25，多含中文語音。記得帶外套，甲板風大。',
    mapsQuery: 'Danube cruise Budapest Parliament',
  },
  {
    id: 'metro-m1',
    name: '黃線地鐵 M1',
    nameEn: 'Metro Line M1 (Millennium Underground)',
    city: 'budapest',
    category: 'transport',
    intro:
      '歐洲最早的地鐵線之一，1896 年通車，車廂與站體小巧復古，連接沃洛斯馬蒂廣場到城市公園／塞車尼溫泉方向。搭一程本身就是體驗。',
    tip: '本行程多數路段用 Bolt，若順路可特地搭一段 M1 過癮。',
    mapsQuery: 'Opera Metro Station Budapest M1',
  },
  {
    id: 'ibis-wien',
    name: '宜必思維也納中央火車站飯店',
    nameEn: 'Ibis Wien Hauptbahnhof',
    city: 'vienna',
    category: 'hotel',
    intro:
      '三星連鎖，幾乎貼著中央車站。轉 ÖBB、一日遊早出晚歸最省事，房價相對可控。房間偏機能、空間不大，去市政廳與老城通常要搭地鐵或 Bolt。',
    tip: '若行程火車多、想少搬行李，這間最省心。治安單純，車站人多，貴重物品照常留意。',
    mapsQuery: 'Ibis Wien Hauptbahnhof',
  },
  {
    id: 'spark-hilton',
    name: '希爾頓維也納多瑙城區 Spark 飯店',
    nameEn: 'Spark by Hilton Vienna Donaustadt',
    city: 'vienna',
    category: 'hotel',
    intro:
      '2022 年開幕的四星，房間新、乾淨，雙床房價位友善。位於多瑙城區，周圍較新穎安靜，但每天進一區老城與市集要多一段通勤。',
    tip: '適合在意新房況、可接受搭地鐵往返市中心的人。',
    mapsQuery: 'Spark by Hilton Vienna Donaustadt',
  },
  {
    id: 'jaz-vienna',
    name: '維也納城市爵士飯店',
    nameEn: 'Jaz in the City Vienna',
    city: 'vienna',
    category: 'hotel',
    intro:
      '2021 年開幕的四星音樂主題飯店，悠音房有設計感與音響氛圍。地鐵可達市中心，比車站飯店更有度假感，也比五星親民。本行程維也納預設住宿。',
    tip: 'Day 9 退房後可先寄放行李，逛完再取行李搭 Bolt 去中央車站趕 15:10 火車。',
    mapsQuery: 'Jaz in the City Vienna',
  },
  {
    id: 'hilton-vienna-park',
    name: '希爾頓維也納公園飯店',
    nameEn: 'Hilton Vienna Park',
    city: 'vienna',
    category: 'hotel',
    intro:
      '五星飯店，2020 年翻新。靠近市政廳公園與聖誕市集，夜間逛完走回飯店很輕鬆。房間寬敞、服務完整，是維也納「位置＋舒適」的頂配，價格也最高。',
    tip: '若預算允許、想把市集當自家後院，這間最對味。',
    mapsQuery: 'Hilton Vienna Park',
  },
  {
    id: 'rathaus-market',
    name: '維也納市政廳聖誕市集',
    nameEn: 'Wiener Christkindlmarkt am Rathausplatz',
    city: 'vienna',
    category: 'market',
    intro:
      '歐洲最著名、規模最大的聖誕市集之一。新哥德市政廳前搭起巨大聖誕樹、燈飾隧道與數十個木屋攤位，賣手工藝、熱紅酒與甜食，夜晚燈飾極華麗。',
    tip: '17:00 後燈光全開最美。人潮多，貴重物品留意一下。可先在市集喝熱飲，再到附近吃正餐。',
    mapsQuery: 'Rathaus Christmas Market Vienna',
  },
  {
    id: 'rathaus',
    name: '維也納市政廳',
    nameEn: 'Wiener Rathaus',
    city: 'vienna',
    category: 'attraction',
    intro:
      '新哥德式市政廳，尖塔與雕像林立，是環城大道 Ringstrasse 上的重要地標。聖誕期間整座建築成為市集背景，白天看建築、晚上看燈。',
    tip: '市集廣場也可溜冰。若想拍少人空景，可清晨再來一次。',
    mapsQuery: 'Wiener Rathaus',
  },
  {
    id: 'stephansdom',
    name: '聖史蒂芬大教堂',
    nameEn: 'Stephansdom',
    city: 'vienna',
    category: 'attraction',
    intro:
      '維也納老城心臟，以彩色菱格屋頂與南塔聞名。周圍是卡恩特納大街、格拉本等核心步行區，晚餐前後散步經過，很能感受舊城夜生活。',
    tip: '教堂本身可進參觀；若只是路過看夜景與屋頂也足夠。附近餐廳多，Figlmüller 就在不遠處。',
    mapsQuery: 'St. Stephen\'s Cathedral Vienna',
  },
  {
    id: 'figlmuller',
    name: 'Figlmüller Wollzeile',
    nameEn: 'Figlmüller Wollzeile',
    city: 'vienna',
    category: 'restaurant',
    intro:
      '維也納炸牛排 Schnitzel 傳奇老店，薄而巨大的炸小牛肉常超出盤子，配馬鈴薯沙拉。Wollzeile 店靠近聖史蒂芬大教堂，是經典觀光美食。',
    tip: '一定要訂位。一份很大，可考慮分享；也可點小份或加配菜。',
    mapsQuery: 'Figlmüller Wollzeile Vienna',
  },
  {
    id: 'cafe-central',
    name: '中央咖啡館',
    nameEn: 'Café Central',
    city: 'vienna',
    category: 'cafe',
    intro:
      '維也納最負盛名的傳統咖啡館之一。拱頂大廳、鋼琴演奏與經典蛋糕，曾是弗洛伊德、托洛茨基、作家與音樂家出沒之地。用來吃一頓從容的早午餐剛剛好。',
    tip: '熱門時段常排隊，可先訂位或稍早到。招牌可點咖啡配蛋糕，或直接當成午餐。',
    mapsQuery: 'Café Central Vienna',
  },
  {
    id: 'schonbrunn',
    name: '美泉宮',
    nameEn: 'Schönbrunn Palace',
    city: 'vienna',
    category: 'attraction',
    intro:
      '哈布斯堡王朝夏宮，也被譯為熊布朗宮。黃牆宮殿、法式花園與背後的凱旋門山丘，是維也納必訪。聖誕期間宮殿前方會舉辦大型聖誕市集。',
    tip: '進宮選 Palace Ticket，官網成人約 €42（含語音導覽，冬季價可能微調）。時間有限至少走前庭、市集與花園軸線。',
    mapsQuery: 'Schönbrunn Palace',
  },
  {
    id: 'schonbrunn-market',
    name: '美泉宮聖誕市集',
    nameEn: 'Schönbrunn Christmas Market',
    city: 'vienna',
    category: 'market',
    intro:
      '以美泉宮為背景的大型聖誕市集，氣氛比市政廳稍緩，攤位品質高，適合邊逛邊拍宮殿與木屋。下午來可同時看宮殿與市集。',
    tip: '13:30–16:00 的行程剛好趕下午光線。想進宮就先排宮殿再逛市集。',
    mapsQuery: 'Schönbrunn Christmas Market',
  },
  {
    id: 'belvedere',
    name: '美景宮',
    nameEn: 'Belvedere Palace',
    city: 'vienna',
    category: 'attraction',
    intro:
      '歐根親王的巴洛克夏宮，分上宮與下宮，中間是幾何花園與水池。上宮收藏克林姆《吻》等奧地利名畫，是藝術迷必訪；花園倒影在冬天也很好拍。',
    tip: '看《吻》要進上宮，官網成人 €23，建議線上購票。看完可直接逛宮前／園區聖誕市集。',
    mapsQuery: 'Belvedere Palace Vienna',
  },
  {
    id: 'the-kiss',
    name: '克林姆《吻》',
    nameEn: 'Gustav Klimt, The Kiss',
    city: 'vienna',
    category: 'attraction',
    intro:
      '維也納分離派大師克林姆的代表作，金箔與圖案包裹一對相擁的戀人，收藏於美景宮上宮。是奧地利最出名的畫作之一，現場尺寸與金光比印刷品震撼。',
    tip: '展廳可能人多，先看畫再慢慢逛其他克林姆與席勒作品。',
    mapsQuery: 'Upper Belvedere The Kiss',
  },
  {
    id: 'belvedere-market',
    name: '美景宮聖誕市集',
    nameEn: 'Belvedere Christmas Market',
    city: 'vienna',
    category: 'market',
    intro:
      '美景宮園區的聖誕市集，規模小於市政廳，但巴洛克宮殿與水池燈飾很有質感，適合看完畫後慢慢逛，作為 Day 6 的收尾。',
    tip: '16:30–18:30 天色漸暗，燈飾會愈來愈好看。',
    mapsQuery: 'Belvedere Christmas Market Vienna',
  },
  {
    id: 'plachutta',
    name: 'Plachutta Wollzeile',
    nameEn: 'Plachutta Wollzeile',
    city: 'vienna',
    category: 'restaurant',
    intro:
      '維也納清燉牛肉 Tafelspitz 的代表餐廳。牛肉與高湯、蘋果辣根、菠菜等配菜分批上桌，吃法講究，是奧地利經典家常菜的精緻版。',
    tip: '務必訂位。兩人可點一份 Tafelspitz 再加前菜或甜點。Wollzeile 店最知名。',
    mapsQuery: 'Plachutta Wollzeile',
  },
  {
    id: 'klook-daytrip',
    name: '薩爾斯堡＆哈修塔特一日遊',
    nameEn: 'Salzburg & Hallstatt Day Trip',
    city: 'salzburg',
    category: 'experience',
    intro:
      '從維也納出發的 Klook 一日遊，約 07:30–20:00，車程長但可一天看完莫札特故鄉與世界遺產湖區小鎮。門票約 $3,733。這是本行程最辛苦的一天。',
    tip: '前一晚早睡，帶水和零食。隔天 Day 8 刻意排成放鬆日。哈修塔特午餐時間有限，看好集合時間。',
    mapsQuery: 'Hallstatt Austria',
  },
  {
    id: 'salzburg',
    name: '薩爾斯堡',
    nameEn: 'Salzburg',
    city: 'salzburg',
    category: 'attraction',
    intro:
      '莫札特出生地，也是《真善美》取景地之一。老城在薩爾察赫河兩岸，有要塞、主教宮殿、巴洛克教堂與精緻街巷。十二月常有聖誕市集，氛圍濃厚。',
    tip: '一日遊停留時間有限，以老城散步、教堂廣場與市集為主，別貪多。',
    mapsQuery: 'Salzburg Old Town',
  },
  {
    id: 'hallstatt',
    name: '哈修塔特',
    nameEn: 'Hallstatt',
    city: 'hallstatt',
    category: 'attraction',
    intro:
      '阿爾卑斯山湖畔的世界遺產小鎮，木屋、教堂尖塔與倒影湖面構成經典明信片畫面。冬天若下雪更美，但也更冷、日照短，人潮仍可能不少。',
    tip: '經典拍照點在湖對岸觀景台或沿湖步道。午餐就在鎮上解決，準時回到集合點。',
    mapsQuery: 'Hallstatt Market Square',
  },
  {
    id: 'naschmarkt',
    name: '納許市場',
    nameEn: 'Naschmarkt',
    city: 'vienna',
    category: 'market',
    intro:
      '維也納最有生活感的長條市場，賣香料、蔬果、起司、中東食材與各國小吃。週末還有跳蚤市場延伸。很適合放鬆日晚起後來吃一頓豐富午餐。',
    tip: 'NENI 在市場裡很受歡迎；也可以逛攤位吃海鮮或沙拉，比較隨性。',
    mapsQuery: 'Naschmarkt Vienna',
  },
  {
    id: 'neni',
    name: 'NENI am Naschmarkt',
    nameEn: 'NENI am Naschmarkt',
    city: 'vienna',
    category: 'restaurant',
    intro:
      '納許市場裡的人氣餐廳，菜色偏中東／地中海：胡姆斯、沙拉、烤菜與香料味濃的熱食，適合多人分食。氛圍輕鬆，是市場午餐的穩妥選擇。',
    tip: '熱門時段建議訂位或稍候。也可改吃市場內海鮮攤，看當天心情。',
    mapsQuery: 'NENI am Naschmarkt',
  },
  {
    id: 'graben',
    name: '格拉本大街',
    nameEn: 'Graben',
    city: 'vienna',
    category: 'shop',
    intro:
      '維也納老城最氣派的步行大街之一，連接聖史蒂芬大教堂與霍夫堡方向。街中央有瘟疫紀念柱 Pestsäule，兩旁是精品店、咖啡與聖誕燈飾。',
    tip: '適合飯前飯後散步逛街，不必強迫消費。冬天傍晚燈飾很好看。',
    mapsQuery: 'Graben Vienna',
  },
  {
    id: 'kohlmarkt',
    name: '科爾市場',
    nameEn: 'Kohlmarkt',
    city: 'vienna',
    category: 'shop',
    intro:
      '連接格拉本與霍夫堡的精品街，聚集珠寶、時裝與傳統店鋪，路面與櫥窗都很精緻，是維也納最「貴氣」的幾條街之一。',
    tip: '以逛櫥窗為主。可一路走到霍夫堡外圍再折返。',
    mapsQuery: 'Kohlmarkt Vienna',
  },
  {
    id: 'ribs-of-vienna',
    name: 'Ribs of Vienna',
    nameEn: 'Ribs of Vienna',
    city: 'vienna',
    category: 'restaurant',
    intro:
      '以地窖空間與超長烤豬排聞名的主題餐廳，氣氛熱鬧，份量驚人。想吃得豪邁、和歌劇院行程形成對比時很適合。',
    tip: '一米長豬排通常是多人分享。若想吃精緻奧地利菜可改選 Lugeck。',
    mapsQuery: 'Ribs of Vienna',
  },
  {
    id: 'lugeck',
    name: 'Lugeck',
    nameEn: 'Lugeck',
    city: 'vienna',
    category: 'restaurant',
    intro:
      '摩登奧地利餐館，把傳統菜做得較清爽精緻，裝潢明亮現代，適合不想太觀光食堂風、又想吃在地味道的一餐。',
    tip: '與 Ribs of Vienna 二選一。看歌劇的話，選離歌劇院較近、用餐節奏可控的那間。',
    mapsQuery: 'Lugeck Vienna',
  },
  {
    id: 'staatsoper',
    name: '維也納國家歌劇院',
    nameEn: 'Wiener Staatsoper',
    city: 'vienna',
    category: 'attraction',
    intro:
      '世界頂尖歌劇院之一，環城大道上的新文藝復興建築。晚上來看歌劇或芭蕾，是維也納最有儀式感的體驗。即使只看外觀與大廳，也值得。',
    tip: '站票官網 €13–18（Parterre €18 視野最好）；座位視劇目。服裝整齊大方即可，預留安檢入場。',
    mapsQuery: 'Vienna State Opera',
  },
  {
    id: 'schwarzer-kameel',
    name: 'Zum Schwarzen Kameel',
    nameEn: 'Zum Schwarzen Kameel',
    city: 'vienna',
    category: 'restaurant',
    intro:
      '開業超過 400 年的維也納老店，就在格拉本旁。以開放式小三明治、冷熱拼盤與簡致熱食聞名，氣氛典雅但不沉重，適合退房後、搭車前的最後一頓維也納午餐。',
    tip: '建議訂位。吃完直接逛格拉本與科爾市場買紀念品，再搭 U1 回中央車站。',
    mapsQuery: 'Zum Schwarzen Kameel Vienna',
  },
  {
    id: 'praha-hlavni',
    name: '布拉格中央車站',
    nameEn: 'Praha hlavní nádraží',
    city: 'prague',
    category: 'transport',
    intro:
      '布拉格主要長途鐵路車站。Day 9 19:23 搭 ÖBB 頭等艙由此抵達，再前往老城希爾頓 check-in。',
    tip: '出站後搭 Bolt 去飯店最省事。大件行李不必先去廣場。',
    mapsQuery: 'Praha hlavní nádraží',
  },
  {
    id: 'botanique',
    name: '布拉格植物園飯店',
    nameEn: 'Botanique Hotel Prague',
    city: 'prague',
    category: 'hotel',
    intro:
      '布拉格四星，房間舒適、價位相對友善。離老城與城堡有一段距離，進出多半搭電車或叫車；適合想省一點住宿、白天再進中心區的人。',
    tip: '周圍偏住宅／商務，夜晚相對安靜。去老城建議直接叫車，比摸電車轉乘輕鬆。',
    mapsQuery: 'Botanique Hotel Prague',
  },
  {
    id: 'hilton-prague',
    name: '布拉格古城希爾頓飯店',
    nameEn: 'Hilton Prague Old Town',
    city: 'prague',
    category: 'hotel',
    intro:
      '五星飯店，2016 年翻新。住在老城範圍內，走路可到廣場、天文鐘與查理大橋方向。晚歸、下雪天都比住郊區省事，是本行程布拉格預設住宿。',
    tip: 'Day 14 早上專車送機約 25 分。老城人多，進出大廳注意行李與隨身物。',
    mapsQuery: 'Hilton Prague Old Town',
  },
  {
    id: 'lokal',
    name: 'Lokál Dlouhááá',
    nameEn: 'Lokál Dlouhááá',
    city: 'prague',
    category: 'restaurant',
    intro:
      '布拉格超人氣在地捷克餐廳，以新鮮生啤酒、炸起司、豬膝與家常菜聞名，店名故意把 Dlouhá 拉得很長。氣氛熱鬧、價格相對親民。',
    tip: '幾乎一定要訂位。適合抵達布拉格第一晚，吃得飽又有在地感。',
    mapsQuery: 'Lokál Dlouhááá Prague',
  },
  {
    id: 'charles-bridge',
    name: '查理大橋',
    nameEn: 'Charles Bridge',
    city: 'prague',
    category: 'attraction',
    intro:
      '1357 年開始興建的石橋，連接老城與小城／城堡方向，橋上有 30 尊巴洛克聖徒雕像，是布拉格最重要的象徵。晨昏與雪景都極美，白天則有畫家與樂手。',
    tip: '11:30 已會有人潮。想拍空橋要起很早；本行程走經典白天路線，重點放在雕像與兩岸景色。',
    mapsQuery: 'Charles Bridge Prague',
  },
  {
    id: 'kampa-park',
    name: 'Kampa Park',
    nameEn: 'Kampa Park Restaurant',
    city: 'prague',
    category: 'restaurant',
    intro:
      '查理大橋旁河岸的景觀餐廳，窗景可看大橋拱圈、河水與城堡方向。適合當成「伏爾塔瓦河景觀午餐」，把吃飯和風景合在一起。',
    tip: '景觀餐廳價格偏高，先確認窗邊座位。也可選附近其他河畔餐廳，原則是「看得到橋或城堡」。',
    mapsQuery: 'Kampa Park Restaurant Prague',
  },
  {
    id: 'old-town-square',
    name: '老城廣場',
    nameEn: 'Old Town Square',
    city: 'prague',
    category: 'attraction',
    intro:
      '布拉格最核心的廣場，周圍是泰恩教堂、老市政廳天文鐘、彩色民居。聖誕期間會豎起常被評為「全歐最美」之一的巨大聖誕樹，並舉辦市集，白天夜晚都值得待。',
    tip: '整點前後去看天文鐘報時。晚上再來一次，樹與市集燈火是布拉格聖誕的高潮。',
    mapsQuery: 'Old Town Square Prague',
  },
  {
    id: 'astronomical-clock',
    name: '天文鐘',
    nameEn: 'Prague Astronomical Clock',
    city: 'prague',
    category: 'attraction',
    intro:
      '安裝於老市政廳的中世紀天文鐘，整點會有使徒小雕像報時表演。鐘面同時顯示時間、星象與曆法，是老城廣場最聚集人潮的點。',
    tip: '表演本身很短，重點是氣氛。站外圈也能看，不必擠最前面。可順便登老市政廳塔俯瞰廣場。',
    mapsQuery: 'Prague Astronomical Clock',
  },
  {
    id: 'prague-christmas-market',
    name: '老城廣場聖誕市集',
    nameEn: 'Old Town Square Christmas Market',
    city: 'prague',
    category: 'market',
    intro:
      '以巨大聖誕樹為中心的市集，攤位賣熱果汁、蜂蜜酒、香腸、甜食與手工藝。夜晚燈光與泰恩教堂雙塔一起入鏡，是本行程聖誕氛圍的最高點之一。',
    tip: '捷克熱紅酒／熱果汁很甜，可當點心。最後一晚 Day 13 再來喝一杯做收尾。',
    mapsQuery: 'Old Town Square Christmas Market Prague',
  },
  {
    id: 'u-fleku',
    name: 'U Fleků',
    nameEn: 'U Fleků',
    city: 'prague',
    category: 'restaurant',
    intro:
      '營業超過 500 年的釀酒廠餐廳，只供應自家黑啤酒，配烤鴨、豬膝、酸菜與麵糰。大廳有民歌與啤酒館氣氛，是很「捷克」的一餐。',
    tip: '觀光成分高但體驗獨特。啤酒只賣自家黑啤，接受再去。可訂位或提早到。',
    mapsQuery: 'U Fleků Prague',
  },
  {
    id: 'prague-castle',
    name: '布拉格城堡區',
    nameEn: 'Prague Castle',
    city: 'prague',
    category: 'attraction',
    intro:
      '據稱是世界上最大的古城堡建築群，包含聖維特大教堂、舊皇宮、聖喬治教堂、黃金巷等。建議搭車到頂，再一路往下走回小城與查理大橋，最省力。',
    tip: '主迴路成人 450 CZK，含聖維特、舊皇宮、黃金巷。安檢要一點時間，11:30 出發剛剛好。',
    mapsQuery: 'Prague Castle',
  },
  {
    id: 'st-vitus',
    name: '聖維特大教堂',
    nameEn: 'St. Vitus Cathedral',
    city: 'prague',
    category: 'attraction',
    intro:
      '城堡區核心的哥德式大教堂，尖塔主宰布拉格天際線。內部有彩繪玻璃、聖溫塞斯拉斯禮拜堂與王室墓室，是捷克最重要的教堂。',
    tip: '外觀免費看，進入主要中殿通常需城堡票。彩繪玻璃值得抬頭慢慢看。',
    mapsQuery: 'St. Vitus Cathedral Prague',
  },
  {
    id: 'old-royal-palace',
    name: '舊皇宮',
    nameEn: 'Old Royal Palace',
    city: 'prague',
    category: 'attraction',
    intro:
      '城堡內的古老王宮，最著名的是弗拉迪斯拉夫大廳：巨大無柱的晚期哥德廳堂，曾舉辦加冕、宴會甚至室內騎士比武。',
    tip: '走馬看花 20–30 分鐘即可，重點看大廳尺度與窗外景色。',
    mapsQuery: 'Old Royal Palace Prague Castle',
  },
  {
    id: 'golden-lane',
    name: '黃金巷',
    nameEn: 'Golden Lane',
    city: 'prague',
    category: 'attraction',
    intro:
      '城堡牆邊一排迷你彩色小屋，曾住過砲手、金匠與僕役，卡夫卡也曾在此住過短時間。巷弄很窄很上相，現多為小博物館與商店。',
    tip: '通常需門票。人多時單向移動，別逆行。走到尾端可順勢下山。',
    mapsQuery: 'Golden Lane Prague',
  },
  {
    id: 'terasa',
    name: 'Terasa U Zlaté studně',
    nameEn: 'Terasa U Zlaté studně',
    city: 'prague',
    category: 'restaurant',
    intro:
      '城堡山下著名景觀餐廳，露台／窗邊可俯瞰紅瓦屋頂、聖維特與城市全景。適合城堡行程中的午餐，把「看風景」變成一餐。',
    tip: '價位高，需訂位並指定景觀座位。時間不夠也可選城堡區其他簡餐，原則是往下走、別再爬回去。',
    mapsQuery: 'Terasa U Zlaté studně',
  },
  {
    id: 'cafe-imperial',
    name: '帝國咖啡館',
    nameEn: 'Café Imperial',
    city: 'prague',
    category: 'cafe',
    intro:
      '布拉格最華麗的咖啡館之一，以馬賽克磁磚、陶飾與新藝術／裝飾藝術大廳聞名。下午茶、蛋糕與咖啡都很適合當成城堡日的收尾儀式。',
    tip: '建議訂下午茶時段。結束後可步行或短程車去買菠丹妮等伴手禮。',
    mapsQuery: 'Café Imperial Prague',
  },
  {
    id: 'botanicus',
    name: '菠丹妮',
    nameEn: 'Botanicus',
    city: 'prague',
    category: 'shop',
    intro:
      '捷克知名天然保養與香氛品牌，產品有草本、玫瑰、薰衣草等氣味，包裝有手作感，是常見伴手禮。老城有多家門市。',
    tip: '乳液、皂、室內香氛都好帶。注意液體安檢與托運重量。',
    mapsQuery: 'Botanicus Prague Old Town',
  },
  {
    id: 'mlynec',
    name: 'Mlynec Restaurant',
    nameEn: 'Mlýnec Restaurant',
    city: 'prague',
    category: 'restaurant',
    intro:
      '查理大橋橋頭附近的現代精緻捷克菜餐廳，夜晚可欣賞大橋燈飾與河景，氣氛比啤酒館更正式，適合城堡日的晚餐。',
    tip: '務必訂窗邊或橋景座位。晚餐 19:00 開始，天已黑，夜景是重點。',
    mapsQuery: 'Mlýnec Restaurant Prague',
  },
  {
    id: 'vysehrad',
    name: '高堡區',
    nameEn: 'Vyšehrad',
    city: 'prague',
    category: 'attraction',
    intro:
      '比布拉格城堡更早的傳說王城所在，現為公園化的城堡遺址。有聖彼得與保羅教堂、城牆步道與俯瞰伏爾塔瓦河、紅瓦屋頂的開闊視野，在地人愛來，觀光客相對少。',
    tip: '冬天若下雪，這裡的空曠感與遠景特別美。搭 Uber/Bolt 約 10 分鐘，回程可散步回城。',
    mapsQuery: 'Vyšehrad Prague',
  },
  {
    id: 'municipal-house',
    name: '市民會館',
    nameEn: 'Municipal House (Obecní dům)',
    city: 'prague',
    category: 'attraction',
    intro:
      '布拉格新藝術風格代表建築，外觀馬賽克與雕塑華麗，內部有音樂廳、餐廳與咖啡館。在此喝下午茶，等於同時參觀一棟藝術品。',
    tip: '可只去咖啡館／餐廳，不一定要買導覽票。鄰近粉末塔與共和廣場，逛完可走向瓦茨拉夫廣場。',
    mapsQuery: 'Municipal House Prague',
  },
  {
    id: 'wenceslas',
    name: '瓦茨拉夫廣場',
    nameEn: 'Wenceslas Square',
    city: 'prague',
    category: 'market',
    intro:
      '其實是一條寬闊的林蔭大道式廣場，國家博物館在頂端，聖溫塞斯拉斯騎馬像是地標。聖誕期間常有市集，空間比老城廣場開闊，適合散步消化下午茶。',
    tip: '17:00–18:30 逛一圈即可，不必久留。注意扒手，大馬路比較觀光。',
    mapsQuery: 'Wenceslas Square Christmas Market',
  },
  {
    id: 'v-zatisi',
    name: 'V Zátiší',
    nameEn: 'V Zátiší',
    city: 'prague',
    category: 'restaurant',
    intro:
      '老城附近的精緻捷克創意料理，曾獲米其林相關推薦，服務細緻、空間溫馨，把傳統食材做得精緻而不冰冷。適合高堡漫活日的晚餐。',
    tip: '建議訂位。若想更輕鬆也可當天再決定，但這類餐廳週末容易滿。',
    mapsQuery: 'V Zátiší Prague',
  },
  {
    id: 'cafe-louvre',
    name: '羅浮咖啡館',
    nameEn: 'Café Louvre',
    city: 'prague',
    category: 'cafe',
    intro:
      '1902 年開業的歷史咖啡館，愛因斯坦、卡夫卡都曾來過。空間寬敞、有撞球室與傳統糕點，適合最後一天中午輕食，感受老布拉格文人氣息。',
    tip: '不必趕預約下午的高級晚餐，這裡當輕鬆午餐剛剛好。',
    mapsQuery: 'Café Louvre Prague',
  },
  {
    id: 'bellevue',
    name: 'Restaurant Bellevue',
    nameEn: 'Restaurant Bellevue',
    city: 'prague',
    category: 'restaurant',
    intro:
      '河畔高級餐廳，面對查理大橋與城堡夜景，是本行程的歡送晚宴首選。浪漫、正式、風景極佳，用來替 14 天畫下句點。',
    tip: '務必提前訂位並要求河景／橋景桌。18:30 用餐，之後可再走去老城廣場看最後一次夜景。',
    mapsQuery: 'Restaurant Bellevue Prague',
  },
  {
    id: 'old-town-shopping',
    name: '老城精品與紀念品街',
    nameEn: 'Prague Old Town shopping streets',
    city: 'prague',
    category: 'shop',
    intro:
      '老城廣場周圍巷弄有水晶、石榴石飾品、木偶、巧克力、菠丹妮與各種紀念品店。最後一天補貨最合適，買完回飯店秤重，避免超重。',
    tip: '捷克石榴石與波希米亞水晶是傳統伴手禮；比價後再買，主要街道較貴。',
    mapsQuery: 'Celetná Street Prague',
  },
  {
    id: 'prg-airport',
    name: '布拉格機場',
    nameEn: 'Václav Havel Airport Prague',
    city: 'prague',
    category: 'transport',
    intro:
      '布拉格國際機場，華航 CI68 由此直飛台北。市區專車約 25 分鐘，建議預留塞車與晨間報到時間。',
    tip: '07:30 退房出發，專車每人 $1,000、車程約 25 分。10:30 班機，國際線建議提早 3 小時到。',
    mapsQuery: 'Václav Havel Airport Prague',
  },
]

export const placeMap = Object.fromEntries(places.map((p) => [p.id, p])) as Record<
  string,
  Place
>

export function getPlace(id: string): Place | undefined {
  return placeMap[id]
}

export function placeImage(place: Place | string): string {
  const id = typeof place === 'string' ? place : place.id
  return `${import.meta.env.BASE_URL}places/${id}.jpg`
}
