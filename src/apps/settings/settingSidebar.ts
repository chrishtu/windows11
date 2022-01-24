import { userProfileImage } from "../../components/constant"
import SearchBox from "../../components/controls/SearchBox"
import createElement from "../../createElement"
import { NavItemInfo, navItems } from "./common"
import { SettingNavCallback } from "./contents/system/settingNav"

function SettingSidebarNavItem(navItem: NavItemInfo, itemIndex: number, onclick: Function) {
  let element: HTMLDivElement = createElement('div', {
    className: 'setting-sidebar-nav-item flex items-center' + (navItem.active ? ' active' : ''),
    onclick: () => onclick(navItem, element, itemIndex)
  },
    [
      createElement('div', {
        className: 'setting-sidebar-nav-item-icon flex-shrink-0',
        style: {
          backgroundImage: `url("${navItem.icon}")`
        }
      }),
      createElement('div', {
        className: 'setting-sidebar-nav-item-text'
      }, navItem.text)
    ]
  )

  return element
}

export function SettingSidebar(onItemClick: SettingNavCallback) {
  const navItemElems = navItems.map((navItem, index) => SettingSidebarNavItem(navItem, index, onNavItemClick))

  let lastActiveIndex = 0
  let lastActiveItem = navItemElems[0]

  lastActiveItem.classList.add('active')

  let searchBox = SearchBox({
    placeholder: 'Find a Setting'
  })

  let element = createElement('div', {
    className: 'setting-sidebar h-full flex-shrink-0'
  },
    createElement('div', {
      className: 'setting-sidebar-inner standard-content w-full h-full flex flex-col'
    },
      [
        createElement('div', {
          className: 'setting-sidebar-user-info p-20 flex-shrink-0 flex items-center'
        },
          [
            createElement('div', {
              className: 'setting-sidebar-user-info-avatar',
              style: {
                backgroundImage: `url("${userProfileImage}")`
              }
            }),
            createElement('div', {
              className: 'setting-sidebar-user-info-name'
            }, 'chrishtu')
          ]
        ),
        createElement('div', {
          className: 'setting-sidebar-search flex-shrink-0'
        },
          searchBox.element
        ),
        createElement('div', {
          tabIndex: 0,
          className: 'setting-sidebar-nav scrollable scroll-y'
        },
          navItemElems
        )
      ]
    )
  )

  function onNavItemClick(_navItem: NavItemInfo, element: HTMLDivElement, itemIndex: number) {
    if (itemIndex === lastActiveIndex) return

    lastActiveItem.classList.remove('active')

    element.classList.add('active')

    lastActiveIndex = itemIndex
    lastActiveItem = element

    onItemClick(_navItem.name)
  }

  function setRoute(route: string) {
    const parent = route.split('/')[0]

    if (parent) {
      const routeIndex = navItems.findIndex(t => t.name === parent)

      if (routeIndex > - 1) {
        lastActiveItem.classList.remove('active')

        let newActiveElem = navItemElems[routeIndex]

        newActiveElem.classList.add('active')
        lastActiveItem = newActiveElem
      }
    }
  }

  return {
    element,
    setRoute
  }
}
