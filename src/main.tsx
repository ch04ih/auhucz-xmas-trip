import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if ('serviceWorker' in navigator && import.meta.env.DEV) {
  // 開發時 SW 會快取原始碼模組，讓預覽卡在舊版
  void navigator.serviceWorker.getRegistrations().then((regs) => {
    if (regs.length === 0) return
    void Promise.all([
      ...regs.map((r) => r.unregister()),
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
    ]).then(() => window.location.reload())
  })
} else if ('serviceWorker' in navigator) {
  const hadController = Boolean(navigator.serviceWorker.controller)
  let reloaded = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloaded) return
    reloaded = true
    window.location.reload()
  })
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: 'none' })
      .catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
