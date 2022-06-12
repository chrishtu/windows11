import Toggle from "../../../../../components/controls/Toggle";
import DesktopScreen from "../../../../../components/DesktopScreen";
import createElement from "../../../../../createElement";
import { listenEvent } from "../../../../../event";
import eventNames from "../../../../../eventNames";
import { getState } from "../../../../../store";
import { SystemNavItemInfo } from "../../../common";
import { SettingHelp } from "../../settingHelp";
import { SettingNavItem, SettingNavRow } from "../settingNav";

export default function Display() {

  function onNavItemClick(_path: string) {
    console.log(_path)
  }

  const basePath = () => 'settings/system/'

  const { nightlight } = getState('nightlight')

  const nightlightToggle = Toggle({
    checked: nightlight,
    onChange: () => {
      DesktopScreen.toogleNightLight()
    }
  })

  listenEvent(eventNames.nightLightChange, 'settings-display-nightlight', (checked: boolean) => {
    nightlightToggle.checked = checked
  })

  const items: Array<SystemNavItemInfo> = [
    {
      path: '',
      text: 'Night light',
      desc: 'Use warmer colors to help block blue light',
      icon: '',
      name: 'nightlight',
      control: nightlightToggle.element,
      content: SettingNavRow({
        itemsCenter: true,
        contentLeft: 'Atjust the color of the screen to help block blue light'
      }),
    },
    {
      path: '',
      text: 'HDR',
      desc: 'More about HDR',
      icon: '',
      name: 'nightlight'
    }
  ]

  const settingNightLight = SettingNavItem(items[0], onNavItemClick)
  const settingHDR = SettingNavItem(items[1], onNavItemClick)

  let element = createElement('div', {
    className: 'setting-system-display flex flex-wrap'
  },
    [
      createElement('div', {
        className: 'flex-1'
      },
        createElement('div', {
          className: 'setting-system-main-content'
        },
          [
            settingNightLight.element,
            settingHDR.element,
          ]
        )
      ),
      SettingHelp({
        relates: [
          {
            name: basePath() + 'nightlight',
            text: 'Sleep better',
            desc: 'Nightlight can help you get to sleep by displaying warmer colors at night. Select Night light settings to set things up.'
          }
        ],
        actions: [
          {
            name: '',
            text: 'Changing screen brightness',
            desc: ''
          },
          {
            name: '',
            text: 'Adjusting font size',
            desc: ''
          }
        ]
      })
    ]
  )

  function dispose() {
    element.remove()
    element = null
  }

  return {
    element,
    dispose
  }
}
