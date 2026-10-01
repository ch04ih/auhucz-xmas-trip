import { mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'images-src', 'places')
const outDir = join(root, 'public', 'places')
const thumbDir = join(outDir, 'thumb')

/** Covers and modal photos span the phone width (~430pt at 2–3x). */
const LARGE_WIDTH = 1200
/**
 * Every large slot (day cover, modal) is wider than 3:2 and center-cropped by object-fit,
 * so taller photos can be pre-cropped to 3:2 without changing what's visible.
 */
const LARGE_HEIGHT = 800
/** List and hotel thumbnails render at 52–64pt; 200px stays sharp on 3x screens. */
const THUMB_SIZE = 200

async function mtime(path) {
  try {
    return (await stat(path)).mtimeMs
  } catch {
    return 0
  }
}

sharp.simd(false)
await mkdir(thumbDir, { recursive: true })

const files = (await readdir(srcDir)).filter((f) => f.endsWith('.jpg'))
const force = process.argv.includes('--force')
let built = 0
let before = 0
let after = 0

for (const file of files) {
  const src = join(srcDir, file)
  const large = join(outDir, file)
  const thumb = join(thumbDir, file)
  const srcTime = await mtime(src)
  if (!force && (await mtime(large)) >= srcTime && (await mtime(thumb)) >= srcTime) continue

  const { width = 0, height = 0 } = await sharp(src).rotate().metadata()
  const tallerThan3by2 = height * 3 > width * 2
  await sharp(src)
    .rotate()
    .resize(
      tallerThan3by2
        ? { width: LARGE_WIDTH, height: LARGE_HEIGHT, fit: 'cover', withoutEnlargement: true }
        : { width: LARGE_WIDTH, withoutEnlargement: true },
    )
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(large)

  await sharp(src)
    .rotate()
    .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover' })
    .jpeg({ quality: 74, mozjpeg: true, progressive: true })
    .toFile(thumb)

  before += (await stat(src)).size
  after += (await stat(large)).size + (await stat(thumb)).size
  built += 1
}

const kb = (n) => `${Math.round(n / 1024)} KB`
console.log(
  built
    ? `Built ${built} photos: ${kb(before)} originals → ${kb(after)} (large + thumb).`
    : 'All photos up to date.',
)
