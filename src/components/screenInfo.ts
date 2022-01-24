function ScreenInfo() {
  let screenWidth = 0
  let screenHeight = 0

  function getScreenSize() {
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight
  }

  getScreenSize()

  window.addEventListener('resize', getScreenSize, false)

  return {
    get width() { return screenWidth },
    get height() { return screenHeight }
  }
}

let screenInfo = ScreenInfo()

export default screenInfo
