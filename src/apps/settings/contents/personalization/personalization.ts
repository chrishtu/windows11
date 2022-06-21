import Toggle from "../../../../components/controls/Toggle"
import createElement from "../../../../createElement"
import { appStore } from "../../../../store"
import { setBorder, setRoundedCorner } from "../../../../utils/common"
import { ISettingContent, settingsInfo, SystemNavItemInfo } from "../../common"
import SettingNav, { SettingNavCallback, SettingNavItem } from "../system/settingNav"
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

  const { roundedCorner, useBorder } = appStore.getState(['roundedCorner', 'useBorder'])

  setRoundedCorner(roundedCorner)

  const roundedCornerItem: SystemNavItemInfo = {
    isNav: false,
    name: 'roundedCorner',
    icon: '',
    text: 'Rounded Corner',
    desc: 'Atjust window and controls corner radius',
    path: 'personalization/roundedCorner',
    control: Toggle({
      label: 'Rounded Corner',
      checked: roundedCorner,
      onChange: (checked: boolean) => {
        setRoundedCorner(checked)
        appStore.setState({ roundedCorner: checked })
      }
    }).element
  }

  const borderItem: SystemNavItemInfo = {
    isNav: false,
    name: 'useBorder',
    icon: '',
    text: 'Window Border',
    desc: 'Show window border',
    path: 'personalization/useBorder',
    control: Toggle({
      checked: useBorder,
      onChange: (checked: boolean) => {
        setBorder(checked)
        appStore.setState({ useBorder: checked })
      }
    }).element
  }



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
            SettingNavItem(roundedCornerItem, onNavItemClick).element,
            SettingNavItem(borderItem, onNavItemClick).element,
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
