import createElement from "../../createElement"
import { dayNames, monthNames } from "../constant"
import { formatAMPM } from "./utils"

function formatDate(date: Date) {
  return `${formatAMPM(date)} ${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]}-${date.getDate()}-${date.getFullYear()}`
}

export default function TaskBarDateTime() {
  const taskbarDateTime = createElement('div', {
    className: 'taskbar-date-time h-full flex items-center'
  }, formatDate(new Date()))

  setInterval(() => {
    taskbarDateTime.textContent = formatDate(new Date())
  }, 500)

  return {
    element: taskbarDateTime
  }
}
