# 奧匈捷 14 天聖誕市集

給 2026/12/7–12/21 奧地利、匈牙利、捷克聖誕市集行程用的旅遊 web app。

- 總覽：路線、航班、每日列表
- 行程：14 天時間軸、餐飲、交通與住宿
- 預算：機票艙等切換、住宿、火車／專車、一日遊
- 景點：點名稱即可看中文簡介，並可開 Google 地圖

畫面以手機直式為主，也可加到手機主畫面當 App 用。

## 手機使用與分享給同行

電腦上的 `localhost` 只有你自己的電腦看得到。要給手機、同行用，需要一個**公開網址**。

### 方法 A：Netlify Drop（最快，建議）

1. 在專案資料夾執行：

```bash
npm run build
```

2. 用瀏覽器打開 [https://app.netlify.com/drop](https://app.netlify.com/drop)
3. 把專案裡的 `dist` 資料夾拖進網頁
4. 會得到類似 `https://random-name-123.netlify.app` 的網址
5. 用 LINE / 訊息把網址傳給同行即可

之後若更新照片或行程，再 build 一次，把新的 `dist` 拖上去覆蓋（或用同一個 Netlify 網站重新部署）。

### 方法 B：本機暫時給同一 Wi‑Fi 的手機看

只適合人在旁邊、同一個無線網路時：

```bash
npm run dev -- --host
```

終端機會顯示 `Network: http://192.168.x.x:5173/`，手機連同一個 Wi‑Fi 後打開這個網址。

### 加到手機主畫面（比較像 App）

**iPhone**
1. 用 **Safari** 打開網址（不要用 LINE 內建瀏覽器）
2. 點底下「分享」
3. 選「加入主畫面」

**Android**
1. 用 **Chrome** 打開網址
2. 右上選單 → 「加入主畫面」／「安裝應用程式」

加到主畫面後，離線時仍可先看已經開過的行程與圖片。

## 本機開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
npm run preview
```

## 使用提示

- 行程裡的米色膠囊（景點／餐廳／飯店）都可點
- 景點頁可依城市篩選或搜尋
- 網址支援 `#/itinerary/3`、`#/budget`、`#/places` 這類連結，可直接傳某一天給同伴
