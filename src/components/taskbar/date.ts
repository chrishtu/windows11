import createElement from "../../createElement"
import { triggerEvent } from "../../event"
import eventNames from "../../eventNames"
import calendar from "../calendar/calendar"
import { dayNames, monthNames } from "../constant"

function formatDate(date: Date) {
  return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export default function TaskBarDate() {
  function onclick() {
    triggerEvent(eventNames.closePopup, calendar.id)
    calendar.toggleShow()
  }

  const taskbarDate = createElement('div', {
    className: 'taskbar-item taskbar-date-time taskbar-date h-full flex items-center flex-shrink-0',
    onclick,
    onmousedown: e => e.stopPropagation()
  }, formatDate(new Date()))

  setInterval(() => {
    taskbarDate.textContent = formatDate(new Date())
  }, 500)

  return {
    element: taskbarDate
  }
}
