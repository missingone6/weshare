export const sieneseOut = (t, b, c, d) => {
  return c * ((t = t / d - 1) * t * t + 1) + b
}
export const scrollToView = (value, scroller = document.documentElement) => {
  const scroll = value
  const scrollStart = 0
  let start = null

  const step = (timestamp) => {
    if (!start) {
      start = timestamp
    }
    let stepScroll = sieneseOut(timestamp - start, 0, scroll, 500)
    let total = scroller.scrollTop = scrollStart + stepScroll
    if (total < scrollStart + scroll) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}
