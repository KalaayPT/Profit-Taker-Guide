export default defineNuxtPlugin(() => {
  if ((window as { __ptIframeResizeBound?: boolean }).__ptIframeResizeBound) {
    return
  }

  window.addEventListener('message', (e) => {
    if (e.data?.type !== 'arsenyx-embed-resize') return
    document.querySelectorAll<HTMLIFrameElement>('iframe').forEach((f) => {
      if (f.contentWindow === e.source) f.height = String(e.data.height)
    })
  })

  window.__ptIframeResizeBound = true
})
