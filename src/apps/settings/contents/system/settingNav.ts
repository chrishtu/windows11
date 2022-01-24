import { chevronRightIcon } from "../../../../components/icons/icons";
import createElement from "../../../../createElement";
import { SystemNavItemInfo } from "../../common";

export type SettingNavCallback = (path: string) => void

export default function SettingNav(items: Array<SystemNavItemInfo>, onClick: SettingNavCallback) {
  return createElement('div', {
    className: 'setting-nav-list'
  },
    items.map(item => {
      return createElement('div', {
        className: 'setting-nav-item flex',
        onclick: onClick.bind(null, item.path)
      },
        [
          createElement('div', {
            className: 'setting-nav-item-icon flex items-center content-center flex-shrink-0',
            innerHTML: item.icon
          }),
          createElement('div', {
            className: 'setting-nav-item-info flex-1'
          },
            [
              createElement('div', {
                className: 'setting-nav-item-name'
              }, item.text),
              createElement('div', {
                className: 'setting-nav-item-desc'
              }, item.desc)
            ]
          ),
          item.optional,
          createElement('div', {
            className: 'setting-nav-item-icon setting-nav-item-icon-more flex items-center content-center flex-shrink-0',
            innerHTML: chevronRightIcon
          }),
        ]
      )
    })
  )
}
