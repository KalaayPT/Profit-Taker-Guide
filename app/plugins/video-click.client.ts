export default defineNuxtPlugin(() => {
  if ((window as { __ptVideoClickBound?: boolean }).__ptVideoClickBound) {
    return
  }

  const toggleVideoPlayback = async (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return
    }

    const video = event.target.closest('video:not([controls])') as HTMLVideoElement | null
    if (!video) {
      return
    }

    event.preventDefault()

    if (video.paused) {
      try {
        await video.play()
      }
      catch {
        // Ignore autoplay / playback rejections and leave the video paused.
      }
      return
    }

    video.pause()
  }

  document.addEventListener('click', toggleVideoPlayback)
  window.__ptVideoClickBound = true
})
