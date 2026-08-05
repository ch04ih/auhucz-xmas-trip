export async function shareLink(title: string, text?: string) {
  const url = window.location.href
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url })
      return
    }
  } catch {
    return
  }
  try {
    await navigator.clipboard.writeText(url)
    window.alert('連結已複製，可貼到 LINE 傳給同行。')
  } catch {
    window.prompt('複製這個連結傳給同行：', url)
  }
}
