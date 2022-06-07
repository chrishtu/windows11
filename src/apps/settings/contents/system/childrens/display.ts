import createElement from "../../../../../createElement";
import { SystemNavItemInfo } from "../../../common";
import { SettingGroup } from "../../../settingGroup";
import { SettingHelp } from "../../settingHelp";

export default function Display() {

  function onNavItemClick(_path: string) {
    // console.log(path)
  }

  const basePath = () => 'settings/system/'

  const items: Array<SystemNavItemInfo> = [
    {
      isNav: true,
      path: '',
      text: 'Night light',
      desc: 'Use warmer colors to help block blue light',
      icon: '',
      name: 'nightlight'
    },
    {
      isNav: true,
      path: '',
      text: 'HDR',
      desc: 'More about HDR',
      icon: '',
      name: 'nightlight'
    }
  ]

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
            SettingGroup('Brightness & color', items, onNavItemClick)
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
