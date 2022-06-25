import Toggle from "../../../../../components/controls/Toggle"
import createElement from "../../../../../createElement"
import { listenEvent, removeEvent } from "../../../../../event"
import eventNames from "../../../../../eventNames"
import { appStore } from "../../../../../store"
import { toggleTheme, toggleTransparency } from "../../../../../utils/common"
import { SettingNavItem } from "../../system/settingNav"

const settingId = 'setting-color'

export default function Colors() {
  let { darktheme, transparency } = appStore.getState(['darktheme', 'transparency'])

  let darkThemeToggle = Toggle({
    label: 'Dark Theme',
    checked: darktheme,
    onChange: () => {
      toggleTheme()
    }
  })

  let transparencyToggle = Toggle({
    label: 'Dark Theme',
    checked: transparency,
    onChange: () => {
      toggleTransparency()
    }
  })

  let element = createElement('div', {
    className: 'setting-personalization-colors'
  },
    [
      SettingNavItem({
        name: 'darktheme',
        text: 'Dark Theme',
        icon: '',
        desc: 'Dark theme for all windows',
        path: 'personalization/colors/darktheme',
        control: darkThemeToggle.element
      }).element,
      SettingNavItem({
        name: 'transparency',
        text: 'Transparency',
        icon: '',
        desc: 'Transparency for all windows',
        path: 'personalization/colors/transparency',
        control: transparencyToggle.element
      }).element
    ]
  )

  listenEvent(eventNames.themeChange, settingId, isDark => {
    darkThemeToggle.checked = isDark
  })

  listenEvent(eventNames.transparentChange, settingId, enabled => {
    transparencyToggle.checked = enabled
  })

  function dispose() {
    element.remove()
    element = null

    removeEvent(eventNames.themeChange, settingId)
    removeEvent(eventNames.transparentChange, settingId)
    removeEvent(eventNames.nightLightChange, settingId)
  }

  return {
    element,
    dispose
  }
}
