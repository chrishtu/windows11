import createElement from "../../../../createElement"
import { ISettingContent, settingsInfo, SystemNavItemInfo } from "../../common"
import SettingNav, { SettingNavCallback } from "../system/settingNav"
import QuickTheme from "./childrens/quickTheme"

export default function Personalization(onNavItemClick: SettingNavCallback): ISettingContent {
  let navItems = settingsInfo.personalization.items
  let navItemsInfo: Array<SystemNavItemInfo>

  navItemsInfo = Object.keys(navItems).map(key => {
    const item = navItems[key]

    return {
      isNav: true,
      name: key,
      text: item.text,
      icon: item.icon,
      desc: item.desc,
      path: 'personalization/' + key
    }
  })

  let element = createElement('div', {
    className: 'setting-system flex flex-wrap'
  },
    [
      createElement('div', {
        className: 'flex-1'
      },
        createElement('div', {
          className: 'setting-system-main-content'
        },
          [
            QuickTheme(),
            // SettingSystemDesktop(),
            SettingNav(navItemsInfo, onNavItemClick),
          ]
        )
      )
    ]
  )

  return {
    element,
    dispose: () => { }
  }
}
