import createElement from "../../createElement";
import Popup from "../popup/popup";
import { formatAMPM } from "../taskbar/utils";

function Clock() {
  let secondHand: HTMLDivElement,
    minsHand: HTMLDivElement,
    hourHand: HTMLDivElement,
    clockTime: HTMLDivElement

  let intervalId: NodeJS.Timeout

  function setDate() {
    const now = new Date()

    const seconds = now.getSeconds()
    const secondsDegrees = ((seconds / 60) * 360) + 90
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`

    const mins = now.getMinutes()
    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90
    minsHand.style.transform = `rotate(${minsDegrees}deg)`

    const hour = now.getHours()
    const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90
    hourHand.style.transform = `rotate(${hourDegrees}deg)`

    clockTime.textContent = formatAMPM(now, true)
  }

  function onShow() {
    setDate()

    setInterval(setDate, 500)
  }

  function onHide() {
    clearInterval(intervalId)
  }

  return Popup({
    className: 'clock-popup'
  },
    createElement('div', {
      className: 'clock-container flex'
    },
      [
        createElement('div', {
          className: 'clock-inner'
        },
          [
            createElement('div', {
              className: 'clock'
            },
              [
                createElement('div', { className: 'outer-clock-face' },
                  [
                    createElement('div', { className: 'clock-marking clock-marking-one' }),
                    createElement('div', { className: 'clock-marking clock-marking-two' }),
                    createElement('div', { className: 'clock-marking clock-marking-three' }),
                    createElement('div', { className: 'clock-marking clock-marking-four' }),
                    createElement('div', { className: 'inner-clock-face' },
                      [
                        hourHand = createElement('div', { className: 'clock-hand clock-hour-hand' }),
                        minsHand = createElement('div', { className: 'clock-hand clock-min-hand' }),
                        secondHand = createElement('div', { className: 'clock-hand clock-second-hand' }),
                      ]
                    )
                  ]
                )
              ]
            ),
            clockTime = createElement('div', {
              className: 'clock-time'
            })
          ]
        ),
        createElement('div', {
          className: 'clock-divider'
        }),
        createElement('div', {
          className: 'alarm-container flex flex-col flex-1 w-full'
        },
          [
            createElement('div', {
              className: 'alarm-heading'
            }, 'Alarms'),
            createElement('div', {
              className: 'alarm-items flex items-center content-center flex-1'
            }, 'No alarms')
          ]
        )
      ]
    )
    ,
    {
      onShow,
      onHide
    }
  )
}

export default Clock()
