export default function hoverHold(elem: Node, cb: () => void) {
  let timerID: number

  elem.addEventListener("mouseenter", onMouseEnter, false)

  function onMouseEnter() {
    timerID = requestAnimationFrame(timer)

    elem.addEventListener("mouseleave", onMouseLeave, false)
  }

  function onMouseLeave() {
    cancelAnimationFrame(timerID)
    setTimeout(() => {
      cancelAnimationFrame(timerID)
    }, 50)
    elem.removeEventListener("mouseleave", onMouseLeave, false)
  }

  function timer() {
    timerID = requestAnimationFrame(timer)
    if (typeof cb === 'function') cb()
  }
}

export const menuPadding = 10
