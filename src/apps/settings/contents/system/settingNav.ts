import { chevronRightIcon } from "../../../../components/icons/icons";
import createElement, { appendChilds, removeChildren } from "../../../../createElement";
import { isNotNullOrUndifined } from "../../../../utils/common";
import { SystemNavItemInfo } from "../../common";

export type SettingNavCallback = (path: string) => void

export interface ISettingNavItem {
  element: HTMLElement
  setContent(content: any): void
}

interface ISettingNavRow {
  hasIcon?: boolean
  contentLeft?: any
  contentRight?: any
  itemsCenter?: boolean
  contentCenter?: boolean
}

export function SettingNavRow(props?: ISettingNavRow) {
  return createElement('div', {
    className: 'setting-nav-row flex flex-wrap' + (props.hasIcon ? ' has-icon' : '')
  },
    [
      createElement('div', {
        className: 'setting-nav-row-left flex-1' + (((isNotNullOrUndifined(props.contentCenter) || isNotNullOrUndifined(props.itemsCenter))) ? ' flex' : '') + (props.contentCenter ? ' content-center' : '') + (props.itemsCenter ? ' items-center' : '')
      }, props?.contentLeft),
      createElement('div', {
        className: 'setting-nav-row-right flex-shrink-0'
      }, props?.contentRight)
    ]
  )
}

export function SettingNavItem(item: SystemNavItemInfo, onClick?: SettingNavCallback) {
  let isExpanded = false
  let expandedContentElem: HTMLElement
  let settingNavItemIcon: HTMLElement

  function onArrowClick() {
    if (item.isNav) return

    isExpanded = !isExpanded

    expandedContentElem.classList[isExpanded ? 'add' : 'remove']('show')

    settingNavItemIcon.classList[isExpanded ? 'add' : 'remove']('rotate')

    expandedContentElem.scrollIntoView()
  }

  let element = createElement('div', {
    className: 'setting-nav-item',
    onclick: item.isNav ? onClick.bind(null, item.path) : null
  },
    [
      createElement('div', {
        className: 'setting-nav-item-header flex'
      },
        [
          item.icon
            ? createElement('div', {
              className: 'setting-nav-item-icon flex items-center content-center flex-shrink-0',
              innerHTML: item.icon
            }) : null,
          createElement('div', {
            className: 'setting-nav-item-info flex-1 flex flex-col content-center'
          },
            [
              createElement('div', {
                className: 'setting-nav-item-name flex items-center'
              }, item.text),
              item.desc
                ? createElement('div', {
                  className: 'setting-nav-item-desc flex items-center'
                }, item.desc)
                : null
            ]
          ),
          item.control ?
            createElement('div', {
              className: 'setting-nav-item-control flex items-center'
            },
              item.control
            )
            : null,
          settingNavItemIcon = createElement('div', {
            className: 'setting-nav-item-icon setting-nav-item-icon-more flex items-center content-center flex-shrink-0',
            innerHTML: chevronRightIcon,
            onclick: (e: MouseEvent) => {
              e.stopPropagation()
              onArrowClick()
            }
          }),
        ]
      ),
      item.isNav
        ? null
        : expandedContentElem = createElement('div', {
          className: 'setting-nav-item-content'
        }, item.content)
    ]
  )

  if (item.expanded) {
    onArrowClick()
  }

  function setContent(content: any) {
    removeChildren(expandedContentElem)
    appendChilds(expandedContentElem, content)
  }

  return {
    element,
    setContent
  }
}

export default function SettingNav(items: Array<SystemNavItemInfo>, onClick?: SettingNavCallback) {
  return createElement('div', {
    className: 'setting-nav-list'
  },
    items.map(item => SettingNavItem(item, onClick).element)
  )
}
