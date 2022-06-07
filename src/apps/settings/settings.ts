import { chevronRightIcon } from "../../components/icons/icons";
import Window from "../../components/window/window";
import createElement, { removeChildren } from "../../createElement";
import { IWindow } from "../../interfaces/window";
import { IAppInfo } from "../appInfo";
import { ISettingContent, ISettingContentMap, settingsInfo } from "./common";
import { SettingNavCallback } from "./contents/system/settingNav";
import SettingContentMap from "./settingContent";
import { SettingSidebar } from "./settingSidebar";

interface SettingRouteHeading {
  text: string
  path: string
}

function SettingContentHeading(onClick: SettingNavCallback) {
  let headingContentElem: HTMLDivElement

  const element = createElement('div', {
    className: 'setting-content-heading flex-shrink-0 flex items-center'
  },
    headingContentElem = createElement('div', {
      className: 'setting-content-heading-item'
    }, 'System')
  )

  function setRoute(routes: Array<SettingRouteHeading>) {
    const routeElems = createElement('div', {
      className: 'w-full flex items-center'
    },
      routes.map((route, index) => {
        let routeItem = createElement('div', {
          className: 'setting-content-heading-route flex items-center' + (index === routes.length - 1 && index > 0 ? ' disabled' : ''),
          onclick: routes.length - 1 ? onClick.bind(null, route.path) : null
        },
          route.text
        )

        if (index > 0) {
          routeItem.prepend(createElement('div', {
            className: 'setting-content-heading-route-divider flex-center',
            innerHTML: chevronRightIcon
          }))
        }

        return routeItem
      })
    )

    headingContentElem.innerHTML = ''
    headingContentElem.appendChild(routeElems)
  }

  return {
    element,
    setRoute
  }
}

function SettingContent(onNavItemClick: SettingNavCallback) {
  let lastContent: ISettingContent

  const settingContentHeading = SettingContentHeading(onNavItemClick)

  let mainContent: HTMLDivElement

  let element = createElement('div', {
    className: 'setting-content standard-content w-full h-full'
  },
    createElement('div', {
      className: 'setting-content-inner w-full h-full flex flex-col'
    },
      [
        settingContentHeading.element,
        mainContent = createElement('div', {
          tabIndex: 0,
          className: 'setting-content-main scrollable scroll-y'
        })
      ]
    )
  )

  function update(route: string) {
    const routes = route.split('/')
    const routeLen = routes.length

    if (routeLen === 0) {
      return
    }

    let parent: ISettingContentMap = SettingContentMap[routes[0]]

    if (!parent) return

    if (lastContent) {
      lastContent.dispose()
    }

    let content: ISettingContent

    if (routeLen === 1) {
      content = parent.content(onNavItemClick)
    } else if (routeLen === 2) {
      content = parent.children[routes[1]].content(onNavItemClick)
    }

    lastContent = content

    const routesHeading = routes.reduce((s, t, i) => {
      s.path += t

      s.currentSetting = i === 0 ? settingsInfo[t] : s.currentSetting.items[t]

      s.routes.push({
        text: s.currentSetting.text,
        path: s.path
      })

      if (i < routeLen - 1) {
        s.path += '/'
      }

      return s
    }, { routes: [], path: '', currentSetting: Object.create(null) })

    settingContentHeading.setRoute(routesHeading.routes)

    removeChildren(mainContent)
    mainContent.scrollTop = 0
    mainContent.appendChild(content.element)
  }

  return {
    element,
    update
  }
}

const Settings = (appInfo: IAppInfo, args?: any) => {
  const settings = function (_window: IWindow) {
    let settingSidebar = SettingSidebar(onNavItemClick)
    let settingContent = SettingContent(onNavItemClick)

    function updateRoute(route: string) {
      settingSidebar.setRoute(route)
      settingContent.update(route)
    }

    if (args) {
      updateRoute(args)
    } else {
      settingContent.update('system')
    }

    _window.addEventListener('secondInstance', ($args: any) => {
      if (!_window.isVisible()) {
        _window.show()
      }

      _window.focus()

      if ($args) {
        updateRoute($args)
      }
    })

    function onNavItemClick(info: any) {
      settingContent.update(info)
    }

    return createElement('div', {
      className: 'app-settings w-full h-full'
    },
      createElement('div', {
        className: 'setting-inner flex w-full h-full'
      },
        [
          settingSidebar.element,
          settingContent.element
        ]
      )
    )
  }

  Window({
    args,
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    singleInstance: true,
    top: 200,
    left: 300,
    minWidth: 800,
    minHeight: 540,
    width: 1000,
    height: 540,
    center: true,
    fluidContent: true,
    transprencyContent: true,
    content: settings
  })
}

export default Settings
