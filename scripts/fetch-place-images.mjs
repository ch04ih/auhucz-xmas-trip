import { mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'places')
const UA = 'AuhuczChristmasTrip/1.0 (personal travel webapp; Wikimedia images)'

/** @type {Record<string, { wiki?: string, commons?: string }>} */
const sources = {
  'tpe-airport': { wiki: 'Taiwan Taoyuan International Airport' },
  ci63: { wiki: 'China Airlines', commons: 'China Airlines Boeing 777' },
  ci68: { wiki: 'Boeing 777', commons: 'China Airlines aircraft' },
  obb: { wiki: 'Railjet' },
  'wien-hbf': { wiki: 'Wien Hauptbahnhof' },
  'hotel-vision': { wiki: 'Danube', commons: 'Budapest Parliament night Danube' },
  basiliq: { wiki: "St. Stephen's Basilica (Budapest)" },
  kempinski: { wiki: 'Kempinski Hotel Corvinus Budapest' },
  'ibis-wien': { wiki: 'Wien Hauptbahnhof' },
  'spark-hilton': { wiki: 'Donaustadt', commons: 'Vienna Donau City' },
  'jaz-vienna': { wiki: 'Jaz in the City Vienna' },
  'hilton-vienna-park': { wiki: 'Hilton Vienna' },
  'hilton-prague': { wiki: 'Hilton Prague Old Town' },
  'vaci-utca': { wiki: 'Váci Street' },
  'st-stephen-market': {
    wiki: "St. Stephen's Basilica",
    commons: 'Budapest Christmas market Basilica',
  },
  'st-stephen-basilica': { wiki: "St. Stephen's Basilica (Budapest)" },
  'bors-gastrobar': { wiki: 'Goulash' },
  'new-york-cafe': { wiki: 'New York Café (Budapest)' },
  parliament: { wiki: 'Hungarian Parliament Building' },
  'fishermans-bastion': { wiki: "Fisherman's Bastion" },
  'buda-castle': { wiki: 'Buda Castle' },
  funicular: { wiki: 'Budapest Castle Hill Funicular' },
  kiskakukk: { wiki: 'Goulash', commons: 'goulash soup Hungary' },
  'great-market-hall': { wiki: 'Great Market Hall (Budapest)' },
  langos: { wiki: 'Lángos' },
  szechenyi: { wiki: 'Széchenyi thermal bath' },
  'vajdahunyad-market': { wiki: 'Vajdahunyad Castle', commons: 'Vajdahunyad Castle winter' },
  vajdahunyad: { wiki: 'Vajdahunyad Castle' },
  menza: { wiki: 'Hungarian cuisine', commons: 'roast duck Hungary' },
  'danube-cruise': { wiki: 'Hungarian Parliament Building', commons: 'Parliament Budapest night river' },
  'metro-m1': { wiki: 'Millennium Underground Railway' },
  andrassy: { wiki: 'Andrássy Avenue' },
  'heroes-square': { wiki: 'Heroes Square (Budapest)' },
  'rathaus-market': { wiki: 'Vienna City Hall', commons: 'Rathausplatz Christmas market Vienna' },
  rathaus: { wiki: 'Vienna City Hall' },
  stephansdom: { wiki: "St. Stephen's Cathedral, Vienna" },
  figlmuller: { wiki: 'Wiener schnitzel' },
  'cafe-central': { wiki: 'Café Central' },
  schonbrunn: { wiki: 'Schönbrunn Palace' },
  'schonbrunn-market': { wiki: 'Schönbrunn Palace', commons: 'Schönbrunn Christmas market' },
  belvedere: { wiki: 'Belvedere, Vienna' },
  'the-kiss': { wiki: 'The Kiss (Klimt)' },
  'belvedere-market': { wiki: 'Belvedere, Vienna', commons: 'Belvedere Christmas market' },
  plachutta: { wiki: 'Tafelspitz' },
  'klook-daytrip': { wiki: 'Hallstatt', commons: 'Hallstatt winter' },
  salzburg: { wiki: 'Salzburg Old Town' },
  hallstatt: { wiki: 'Hallstatt' },
  naschmarkt: { wiki: 'Naschmarkt' },
  neni: { wiki: 'Naschmarkt', commons: 'Naschmarkt stall' },
  graben: { wiki: 'Graben, Vienna' },
  kohlmarkt: { wiki: 'Kohlmarkt, Vienna' },
  'ribs-of-vienna': { wiki: 'Pork ribs', commons: 'barbecued pork ribs' },
  lugeck: { wiki: 'Innere Stadt', commons: 'Vienna old town street' },
  staatsoper: { wiki: 'Vienna State Opera' },
  'schwarzer-kameel': { wiki: 'Zum schwarzen Kameel' },
  'praha-hlavni': { wiki: 'Praha hlavní nádraží' },
  botanique: { wiki: 'Vinohrady', commons: 'Vinohrady Prague architecture' },
  lokal: { wiki: 'Beer in the Czech Republic', commons: 'Czech beer glass' },
  'charles-bridge': { wiki: 'Charles Bridge' },
  'kampa-park': { wiki: 'Kampa Island' },
  'old-town-square': { wiki: 'Old Town Square (Prague)' },
  'astronomical-clock': { wiki: 'Prague astronomical clock' },
  'prague-christmas-market': {
    wiki: 'Old Town Square (Prague)',
    commons: 'Prague Christmas market Old Town Square',
  },
  'u-fleku': { wiki: 'U Fleků' },
  'prague-castle': { wiki: 'Prague Castle' },
  'st-vitus': { wiki: 'St. Vitus Cathedral' },
  'old-royal-palace': { wiki: 'Vladislav Hall' },
  'golden-lane': { wiki: 'Golden Lane' },
  terasa: { wiki: 'Prague Castle', commons: 'Prague rooftops from castle' },
  'cafe-imperial': { wiki: 'Art Nouveau in Prague', commons: 'Hotel Imperial Prague cafe' },
  botanicus: { wiki: 'Herbal medicine', commons: 'herbal soap' },
  mlynec: { wiki: 'Charles Bridge', commons: 'Charles Bridge at night' },
  vysehrad: { wiki: 'Vyšehrad' },
  'municipal-house': { wiki: 'Municipal House' },
  wenceslas: { wiki: 'Wenceslas Square' },
  'v-zatisi': { wiki: 'Czech cuisine' },
  'cafe-louvre': { wiki: 'Café Louvre' },
  bellevue: { wiki: 'Charles Bridge', commons: 'Prague Castle Charles Bridge night' },
  'old-town-shopping': { wiki: 'Celetná' },
  'prg-airport': { wiki: 'Václav Havel Airport Prague' },
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchJson(url, attempt = 1) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  })
  if (res.status === 429 && attempt <= 6) {
    const wait = 8000 * attempt
    console.log(`  rate limited, wait ${wait / 1000}s…`)
    await sleep(wait)
    return fetchJson(url, attempt + 1)
  }
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function exists(path) {
  try {
    const s = await stat(path)
    return s.size > 8000
  } catch {
    return false
  }
}

async function wikiThumbs(titles) {
  /** @type {Record<string, string>} */
  const map = {}
  const unique = [...new Set(titles)]
  for (let i = 0; i < unique.length; i += 40) {
    const chunk = unique.slice(i, i + 40)
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${chunk.map(encodeURIComponent).join('|')}&prop=pageimages&format=json&pithumbsize=1200&origin=*&redirects=1`
    const data = await fetchJson(url)
    const pages = data.query?.pages ?? {}
    const normalized = data.query?.normalized ?? []
    const redirects = data.query?.redirects ?? []
    /** @type {Record<string, string>} */
    const alias = {}
    for (const n of normalized) alias[n.from] = n.to
    for (const r of redirects) alias[r.from] = r.to

    const titleToThumb = {}
    for (const page of Object.values(pages)) {
      if (page.thumbnail?.source) titleToThumb[page.title] = page.thumbnail.source
    }

    const resolve = (title) => {
      let cur = title
      const seen = new Set()
      while (alias[cur] && !seen.has(cur)) {
        seen.add(cur)
        cur = alias[cur]
      }
      return titleToThumb[cur] || titleToThumb[title] || null
    }

    for (const title of chunk) {
      const thumb = resolve(title)
      if (thumb) map[title] = thumb
    }
    await sleep(1200)
  }
  return map
}

async function commonsImage(query) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`${query} filetype:bitmap -filemime:pdf`)}&srnamespace=6&srlimit=5&format=json&origin=*`
  const search = await fetchJson(searchUrl)
  const hits = search.query?.search ?? []
  for (const hit of hits) {
    if (/\.(pdf|svg|djvu)$/i.test(hit.title)) continue
    await sleep(800)
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(hit.title)}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json&origin=*`
    const info = await fetchJson(infoUrl)
    const page = Object.values(info.query?.pages ?? {})[0]
    const ii = page?.imageinfo?.[0]
    const mime = ii?.mime ?? ''
    if (!ii || !mime.startsWith('image/') || mime.includes('svg')) continue
    return ii.thumburl || ii.url
  }
  return null
}

async function download(url, dest, attempt = 1) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (res.status === 429 && attempt <= 6) {
    const wait = 8000 * attempt
    console.log(`  download limited, wait ${wait / 1000}s…`)
    await sleep(wait)
    return download(url, dest, attempt + 1)
  }
  if (!res.ok) throw new Error(`download ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 8000) throw new Error(`too small ${buf.length}`)
  await writeFile(dest, buf)
}

await mkdir(outDir, { recursive: true })

const wikiTitles = Object.values(sources)
  .map((s) => s.wiki)
  .filter(Boolean)
console.log('Batch lookup Wikipedia thumbnails…')
const wikiMap = await wikiThumbs(wikiTitles)
console.log(`Got ${Object.keys(wikiMap).length} Wikipedia images.`)

let ok = 0
let skip = 0
let fail = 0

for (const [id, src] of Object.entries(sources)) {
  const dest = join(outDir, `${id}.jpg`)
  if (await exists(dest)) {
    skip += 1
    console.log(`SKIP ${id}`)
    continue
  }

  try {
    let imageUrl = src.wiki ? wikiMap[src.wiki] : null
    let via = imageUrl ? `wiki:${src.wiki}` : ''

    if (!imageUrl && src.commons) {
      await sleep(1000)
      imageUrl = await commonsImage(src.commons)
      via = `commons:${src.commons}`
    }
    if (!imageUrl && src.wiki && !wikiMap[src.wiki]) {
      await sleep(1000)
      imageUrl = await commonsImage(src.wiki)
      via = `commons-fallback:${src.wiki}`
    }
    if (!imageUrl) throw new Error('no image found')

    await sleep(900)
    await download(imageUrl, dest)
    ok += 1
    console.log(`OK   ${id}  ← ${via}`)
  } catch (err) {
    fail += 1
    console.error(`FAIL ${id}  ${err.message || err}`)
  }
}

console.log(`\nSaved ${ok}, skipped ${skip}, failed ${fail}.`)
