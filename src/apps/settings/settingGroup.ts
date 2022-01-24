import createElement from "../../createElement";
import { SystemNavItemInfo } from "./common";
import SettingNav, { SettingNavCallback } from "./contents/system/settingNav";

export function SettingGroup(label: string, items: Array<SystemNavItemInfo>, onClick: SettingNavCallback) {
  return createElement('div', {
    className: 'setting-group'
  },
    [
      createElement('div', {
        className: 'setting-label'
      }, label),
      createElement('div', {
        className: 'setting-items'
      },
        SettingNav(items, onClick)
      )
    ]
  )
}
