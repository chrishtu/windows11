import createElement, { appendChild } from "../createElement"
import { triggerEvent } from "../event"
import eventNames from "../eventNames"
import { getState, setState } from "../store"
import { round } from "../utils"

function DesktopScreen() {
  let { nightlight } = getState('nightlight')

  let screenBrightOverlayElem: HTMLDivElement
  let screenNightlightElem: HTMLDivElement

  let screenElem = createElement('div', {
    className: 'screen'
  },
    [
      screenBrightOverlayElem = createElement('div', {
        className: 'screen-bright-overlay w-full h-full'
      }),
      screenNightlightElem = createElement('div', {
        className: 'screen-nightlight w-full h-full' + (nightlight ? ' active' : '')
      }),
    ]
  )

  appendChild(document.body, screenElem)

  function setBrightness(percent: number) {
    let value = round(0.7 - (percent / 100) * 0.7, 2)

    screenBrightOverlayElem.style.opacity = value.toString()

    triggerEvent(eventNames.brightnessChange, percent)
  }

  function setNightLight(enabled: boolean) {
    nightlight = enabled

    screenNightlightElem.classList[nightlight ? 'add' : 'remove']('active')

    setState({ nightlight })

    triggerEvent(eventNames.nightLightChange, nightlight)
  }

  function toogleNightLight() {
    setNightLight(!nightlight)
  }

  return {
    setBrightness,
    setNightLight,
    toogleNightLight
  }
}

export default DesktopScreen()
