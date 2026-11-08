import { useEffect, useMemo, useState } from 'react'
import { Holly } from '../components/Festive'
import type { StayPlanId } from '../data/stayPlans'
import { useStayPlan } from '../lib/StayPlanContext'

const BOOKING_DONE_KEY = 'auhucz-booking-done'

type BookingItem = { name: string; note: string; food?: boolean }

function getBookingGroups(planId: StayPlanId): { when: string; hint: string; items: BookingItem[] }[] {
  const is444 = planId === '4-4-4'
  return [
    {
      when: '出發前 2–3 個月',
      hint: '聖誕旺季最容易搶光，能早訂就早訂',
      items: [
        {
          name: '維也納國家歌劇院',
          note: is444
            ? '已購 · 12/18 19:00《魔笛》2 張'
            : '熱門劇目／週末場常提前售完；站票也建議提早盯',
        },
        {
          name: '飯店',
          note: is444
            ? '三城皆已訂 · 時光飯店、城市爵士飯店、Hotel Cube'
            : 'BasiliQ、Jaz、希爾頓待訂；聖誕旺季建議提早',
        },
        { name: '華航豪經艙', note: '已訂 · 12/10 去程、12/23 回程' },
        {
          name: 'Mlynec',
          note: is444
            ? '12/21 19:00 城堡日晚餐，橋景／窗邊位'
            : '12/20 19:00 城堡日晚餐，橋景／窗邊位',
          food: true,
        },
      ],
    },
    {
      when: '出發前 3–4 週',
      hint: '門票場次與一日遊，愈早愈穩',
      items: [
        { name: '國會大廈內部導覽', note: '官網先訂場次，選中文語音' },
        { name: 'Klook 薩爾斯堡＆哈修塔特', note: '一日遊名額有限' },
        { name: 'ÖBB 頭等艙車票', note: '維也納⇄布達佩斯、維也納→布拉格' },
        {
          name: 'Figlmüller',
          note: is444
            ? '12/15 19:30 維也納第一晚炸牛排'
            : '12/14 約 19:00 維也納第一晚炸牛排',
          food: true,
        },
        {
          name: 'Plachutta',
          note: is444
            ? '12/16 18:00 美泉宮旁 Hietzing 分店 Tafelspitz 晚餐'
            : '12/15 19:00 Tafelspitz 晚餐',
          food: true,
        },
      ],
    },
    {
      when: '出發前 1–2 週',
      hint: '多數餐廳與預購票',
      items: [
        {
          name: '美景宮上宮（《吻》）',
          note: is444 ? '12/18 14:15 時段票，官網預購' : '官網預購較省排隊',
        },
        ...(is444
          ? [
              {
                name: '茜茜套票 Sisi Pass',
                note: '12/16 美泉宮選 15:00 時段；霍夫堡茜茜博物館不用預約，官網預購',
              } satisfies BookingItem,
            ]
          : []),
        { name: '布拉格城堡套票', note: '若進主迴路建議線上買' },
        {
          name: 'Lokál Dlouhááá',
          note: is444
            ? '12/20 19:00 逛完老城廣場後'
            : '12/18 20:15 抵達布拉格第一晚',
          food: true,
        },
        ...(is444
          ? [
              {
                name: 'U Fleků',
                note: '12/19 20:15 抵達布拉格第一晚，飯店同條街；週六晚建議訂位',
                food: true,
              } satisfies BookingItem,
            ]
          : []),
        {
          name: '帝國咖啡館下午茶',
          note: is444
            ? '12/21 約 15:30–16:30 城堡日下午茶'
            : '12/20 約 14:30–17:00 城堡日下午茶',
          food: true,
        },
        ...(is444
          ? []
          : [
              {
                name: 'V Zátiší',
                note: '12/21 19:00 高堡日晚餐',
                food: true,
              } satisfies BookingItem,
            ]),
      ],
    },
    {
      when: '出發前幾天～當天早上',
      hint: '多數仍建議訂，臨時也常有位',
      items: [
        { name: '多瑙河夜航', note: '12/13 20:30；可現場買，旺季先訂較安心' },
        {
          name: 'Café Central',
          note: is444
            ? '12/16 13:15 午餐；整修中，先確認是否重開'
            : '12/15 11:30 早午餐；整修中，先確認是否重開',
          food: true,
        },
        ...(is444
          ? [
              {
                name: 'Demel',
                note: '12/15 約 16:30 皇帝煎餅；不能訂位，現場排隊或外帶',
                food: true,
              } satisfies BookingItem,
            ]
          : []),
        ...(is444
          ? []
          : [
              {
                name: 'Zum Schwarzen Kameel',
                note: '12/18 12:20 轉布拉格當日午餐',
                food: true,
              } satisfies BookingItem,
            ]),
        {
          name: 'Kiskakukk',
          note: '12/12 19:00 國會與城堡日晚餐',
          food: true,
        },
        {
          name: 'NENI',
          note: is444
            ? '12/18 12:30 納許市場午餐'
            : '12/17 12:30 納許市場午餐',
          food: true,
        },
      ],
    },
    {
      when: '不用預約（walk-in）',
      hint: '直接去即可，尖峰可能稍候',
      items: [
        { name: '各大聖誕市集', note: '免票入場，攤位現金方便' },
        { name: '塞切尼溫泉', note: '現場買票；平日較不擠' },
        { name: '布達城堡纜車', note: '現場買；排隊長可改搭巴士' },
        { name: '查理大橋／老城廣場', note: '戶外免費逛' },
        ...(is444
          ? [
              {
                name: '慕夏博物館',
                note: '12/20 15:25 現場買票，認明 Panská 7',
              } satisfies BookingItem,
            ]
          : []),
        { name: '中央市場／納許市場', note: '小吃與採買隨到隨吃' },
        { name: '漁人堡／高堡區外圍', note: '散步即可' },
        ...(is444
          ? []
          : [
              {
                name: 'U Fleků',
                note: '12/19 約 19:00 可現場候位或提早到',
                food: true,
              } satisfies BookingItem,
            ]),
        {
          name: 'Café Louvre',
          note: is444
            ? '12/22 約 12:30 打包前午餐，通常免訂'
            : '12/22 約 11:30 最後一天輕食，通常免訂',
          food: true,
        },
      ],
    },
  ]
}

export function BookingView() {
  const { planId } = useStayPlan()
  const bookingGroups = useMemo(() => getBookingGroups(planId), [planId])
  const [doneBookings, setDoneBookings] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(BOOKING_DONE_KEY)
      if (!raw) return new Set()
      const parsed = JSON.parse(raw) as unknown
      return Array.isArray(parsed) ? new Set(parsed.filter((x) => typeof x === 'string')) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(BOOKING_DONE_KEY, JSON.stringify([...doneBookings]))
    } catch {
      /* ignore */
    }
  }, [doneBookings])

  const toggleBookingDone = (name: string) => {
    setDoneBookings((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }
  return (
    <div className="page info-page">
      <header className="page-head">
        <p className="eyebrow">Bookings</p>
        <h1>訂位與預約清單</h1>
        <p className="hero-sub">
          點一下可劃掉已完成；再點可取消。進度會存在這台裝置。聖誕旺季建議盡量提早。
        </p>
      </header>

      <section className="section corner-wrap">
        <Holly className="holly holly-card" />
        <div className="booking-stack">
          {bookingGroups.map((group) => (
            <div key={group.when} className="booking-group">
              <div className="booking-group-head">
                <strong>{group.when}</strong>
                <span>{group.hint}</span>
              </div>
              <div className="booking-list">
                {group.items.map((item) => {
                  const done = doneBookings.has(item.name)
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={done ? 'booking-row done' : 'booking-row'}
                      aria-pressed={done}
                      onClick={() => toggleBookingDone(item.name)}
                    >
                      <span className="booking-check" aria-hidden="true">
                        {done ? '✓' : ''}
                      </span>
                      <span className="booking-row-body">
                        <strong>
                          {item.food ? '🍴 ' : ''}
                          {item.name}
                        </strong>
                        <span>{item.note}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
