import createElement from "../../createElement"
import { triggerEvent } from "../../event"
import eventNames from "../../eventNames"
import clock from "../clock/clock"
import { formatAMPM } from "./utils"

export default function TaskBarTime() {
  const taskbarTime = createElement('div', {
    className: 'taskbar-item taskbar-date-time taskbar-time h-full flex items-center',
    onclick: () => {
      triggerEvent(eventNames.closePopup, clock.id)
      clock.toggleShow()
    },
    onmousedown: e => e.stopPropagation()
  }, formatAMPM(new Date()))

  setInterval(() => {
    taskbarTime.textContent = formatAMPM(new Date())
  }, 500)

  return {
    element: taskbarTime
  }
}
