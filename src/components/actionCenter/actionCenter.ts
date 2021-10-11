import createElement from "../../createElement";
import { listenEvent } from "../../event";
import eventNames from "../../eventNames";
import { getState, setState } from "../../store";
import { toggleTransparency, toggleTheme } from "../../utils";
import DesktopScreen from "../DesktopScreen";
import { airplaneModeIcon, bluetoothIcon, castIcon, darkThemeIcon, locationIcon, moonIcon, nightLightIcon, sunIcon, transparencyIcon, volumeIcon2, wifiIcon } from "../icons/icons";
import Popup from "../popup/popup";
import Slider from "../Slider";

interface ActionCenterButtonOptions {
  active?: boolean
  icon: string
  text: string
  disableActiveOnClick?: boolean
  onclick?(): void
}

function ActionCenterButton(options: ActionCenterButtonOptions) {
  let _active = options.active

  let buttonElem = createElement('div', {
    className: 'action-center-button' + (_active ? ' active' : '')
  },
    [
      createElement('div', {
        className: 'action-center-button-icon',
        innerHTML: options.icon,
        onclick
      }),
      createElement('div', {
        className: 'action-center-button-text'
      }, options.text),
    ]
  )

  function onclick() {
    if (options.disableActiveOnClick) return

    _active = !_active

    if (typeof options.onclick === 'function') {
      options.onclick()
    }
  }

  function _setActive(active: boolean) {
    buttonElem.classList[active ? 'add' : 'remove']('active')
  }

  function setActive(active: boolean) {
    _active = active
    _setActive(active)
  }

  return {
    element: buttonElem,
    setActive
  }
}

function ActionCenter() {
  const { darktheme, nightlight, brightness, volume, transparency } = getState(['darktheme', 'nightlight', 'brightness', 'volume', 'transparency'])

  const wifiButton = ActionCenterButton({
    icon: wifiIcon,
    text: 'Wifi'
  })

  const bluetoothButton = ActionCenterButton({
    icon: bluetoothIcon,
    text: 'Bluetooth'
  })

  const airPlaneModeButton = ActionCenterButton({
    icon: airplaneModeIcon,
    text: 'Airplan Mode'
  })

  const darkThemeButton = ActionCenterButton({
    active: darktheme,
    icon: darkThemeIcon,
    text: 'Dark Theme',
    onclick: () => {
      toggleTheme()
    }
  })

  const focusAssistButton = ActionCenterButton({
    icon: moonIcon,
    text: 'Focus Assist'
  })

  const locationButton = ActionCenterButton({
    icon: locationIcon,
    text: 'Location'
  })

  const nightLightButton = ActionCenterButton({
    active: nightlight,
    icon: nightLightIcon,
    text: 'Night Light',
    onclick: () => {
      DesktopScreen.toogleNightLight()
    }
  })

  const connectButton = ActionCenterButton({
    icon: castIcon,
    text: 'Connect'
  })

  // const projectButton = ActionCenterButton({
  //   icon: projectIcon,
  //   text: 'Project'
  // })

  const transparencyButton = ActionCenterButton({
    active: transparency,
    icon: transparencyIcon,
    text: 'Transparency',
    onclick: () => {
      toggleTransparency()
    }
  })

  listenEvent(eventNames.themeChange, 'actionCenter', darkTheme => {
    darkThemeButton.setActive(darkTheme)
  })

  let brightnessCaptured = false
  const brightnessSlider = Slider({
    showBagde: true,
    onHoding: () => {
      brightnessCaptured = true
    },
    onChange: ((percent: number, cb: Function) => {
      DesktopScreen.setBrightness(percent)

      cb(Math.round(percent))
    }),
    onRelease: (value: number) => {
      brightnessCaptured = false
      setState({
        brightness: Math.round(value)
      })
    }
  })

  brightnessSlider.update(brightness || 100)

  const volumeSlider = Slider({
    showBagde: true,
    onRelease: (percent: number) => {
      setState({ volume: Math.round(percent) })
    }
  })

  volumeSlider.update(volume)

  listenEvent(eventNames.nightLightChange, 'actionCenter', nightlight => {
    nightLightButton.setActive(nightlight)
  })

  listenEvent(eventNames.brightnessChange, 'actionCenter', percent => {
    if (!brightnessCaptured) {
      brightnessSlider.update(percent)
    }
  })

  listenEvent(eventNames.transparentChange, 'actionCenter', enabled => {
    transparencyButton.setActive(enabled)
  })

  return Popup({
    className: 'action-center'
  },
    [
      createElement('div', {
        className: 'action-center-buttons'
      },
        [
          wifiButton.element,
          bluetoothButton.element,
          airPlaneModeButton.element,
          darkThemeButton.element,
          focusAssistButton.element,
          locationButton.element,
          nightLightButton.element,
          connectButton.element,
          // projectButton.element,
          transparencyButton.element,
        ]
      ),

      createElement('div', {
        className: 'action-center-sliders'
      },
        [
          createElement('div', {
            className: 'action-center-slider w-full flex items-center'
          },
            [
              createElement('div', {
                className: 'action-center-slider-icon',
                innerHTML: sunIcon
              }),
              brightnessSlider.element
            ]
          ),
          createElement('div', {
            className: 'action-center-slider w-full flex items-center'
          },
            [
              createElement('div', {
                className: 'action-center-slider-icon',
                innerHTML: volumeIcon2
              }),
              volumeSlider.element
            ]
          )
        ]
      )
    ]
  )
}

export default ActionCenter()
