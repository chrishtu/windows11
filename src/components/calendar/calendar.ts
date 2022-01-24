import createElement from "../../createElement";
import { shortDayNames, longMonthNames } from "../constant";
import Popup from "../popup/popup";
import { Calendar as CalendarBase } from './base'

function Calendar() {
  let calendarMonthElem: HTMLDivElement,
    calendarItemsElem: HTMLDivElement

  let currentDate = new Date().getDate()

  let intervalId: NodeJS.Timeout

  const calendar = new CalendarBase({
    siblingMonths: true
  })

  function init() {
    calendarItemsElem.innerHTML = ''

    const today = new Date()

    calendarMonthElem.innerHTML = longMonthNames[today.getUTCMonth()]

    const days = shortDayNames.map(t => t.substring(0, 2))

    for (let index = 0; index < days.length; index++) {
      const dayName = days[index]
      calendarItemsElem.appendChild(createElement('div', {
        className: 'calendar-day -weekday'
      },
        createElement('div', {
          className: 'w-full h-full flex items-center content-center'
        }, dayName)
      ))
    }

    calendar.getCalendar(today.getUTCFullYear(), today.getUTCMonth()).forEach(date => {
      const div = createElement('div', {
        className: 'calendar-day' + (date && date.siblingMonth ? ' -sibling-month' : '')
      },
        createElement('div', {
          'data-date': date ? date.day : '',
          className: 'calendar-day-inner w-full h-full flex items-center content-center' + (date && (today.getDate() === date.day) && !date.siblingMonth ? ' active' : '')
        }, date ? date.day.toString() : '')
      )

      calendarItemsElem.appendChild(div)
    })
  }

  function update() {
    const date = new Date()
    const todayDate = date.getDate()

    if (currentDate !== todayDate) {
      const currentActiveItem = calendarItemsElem.querySelector(`[data-date="${currentDate}"`)

      if (currentActiveItem instanceof HTMLDivElement) {
        currentActiveItem.classList.remove('active')
      }

      const newActiveElement = calendarItemsElem.querySelector(`[data-date="${todayDate}"`)

      if (newActiveElement instanceof HTMLDivElement) {
        newActiveElement.classList.add('active')
      }

      currentDate = todayDate

      calendarMonthElem.innerHTML = longMonthNames[date.getUTCMonth()]
    }
  }

  function onShow() {
    init()

    intervalId = setInterval(() => {
      update()
    }, 1000)
  }

  function onHide() {
    clearInterval(intervalId)
  }

  return Popup({
    className: 'calendar-popup'
  },
    createElement('div', {
      className: 'calendar-content'
    },
      [
        calendarMonthElem = createElement('div', {
          className: 'calendar-month'
        }),
        calendarItemsElem = createElement('div', {
          className: 'calendar-items'
        })
      ]
    ),
    {
      onShow,
      onHide
    }
  )
}

export default Calendar()
