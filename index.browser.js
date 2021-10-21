window.onceWheel = function onceWheel(scrollDownHandler, scrolUpHandler) {
  let wheelPower = 0
  let wheelLock = false
  let wheelTimeStamp = 0
  let wheelLockTimer = null
  const deltaThreshold = 50
  const noiseThreshold = 20
  const wheelEvent =
    'onwheel' in document
      ? 'wheel'
      : 'onmousewheel' in document
      ? 'mousewheel'
      : 'DOMMouseScroll'

  document.addEventListener(wheelEvent, event => {
    const delta = event.wheelDelta !== undefined ? event.wheelDelta : event.deltaY * -1
    const absDelta = Math.abs(delta)

    if (absDelta < noiseThreshold) return
    if (event.timeStamp - wheelTimeStamp < 300 && wheelLock) return

    wheelTimeStamp = event.timeStamp

    if (wheelPower < absDelta && !wheelLock) {
      if (delta < -deltaThreshold) scrollDownHandler()
      else if (delta > deltaThreshold) scrolUpHandler()

      lock(absDelta)

      clearTimeout(wheelLockTimer)
      wheelLockTimer = setTimeout(() => {
        if (wheelPower !== absDelta) return
        unlock()
      }, 1000)
    } else if (absDelta < deltaThreshold && wheelLock) {
      unlock()
    }
  })

  function lock(absDelta) {
    wheelPower = absDelta
    wheelLock = true
  }

  function unlock() {
    wheelPower = deltaThreshold
    wheelLock = false
  }
}