export default function onceWheel(scrollDownHandler, scrolUpHandler) {
  let wheelPower = 0
  let wheelLock = false
  const wheelEvent =
    'onwheel' in document
      ? 'wheel'
      : 'onmousewheel' in document
      ? 'mousewheel'
      : 'DOMMouseScroll'

  document.addEventListener(wheelEvent, event => {
    const delta = event.wheelDelta !== undefined ? event.wheelDelta : event.deltaY * -1
    const absDelta = Math.abs(delta)
    if (wheelPower < absDelta && !wheelLock) {
      if (delta < -50) scrollDownHandler()
      else if (delta > 50) scrolUpHandler()

      wheelPower = absDelta
      wheelLock = true
    } else if (absDelta < 50) {
      wheelPower = 50
      wheelLock = false
    }
  })
}