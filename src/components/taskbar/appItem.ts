import createElement, { IDropElement } from "../../createElement";
import { triggerEvent } from "../../event";
import eventNames from "../../eventNames";
import { IWindow } from "../../interfaces/window";
import { createWindow } from "../../proceduce";
import { closeThumbnails, getThumbnailElement, hideThumbnail, preventHidden, TaskBarAppThumbnails } from "./thumbnail";
import { closeContextMenu } from "./utils";

export interface AppInfo {
  name: string,
  active: boolean,
  app: IWindow
}

export interface TaskBarAppInfo {
  name: string
  productName: string
  isSystemApp?: boolean
  icon?: string
  iconType?: string
}

export interface ITaskbarSystemAppItem {
  element: HTMLDivElement
}

export interface ITaskbarAppItem {
  element: HTMLDivElement
  addInstance: (id: string, win: IWindow) => void
  removeInstance: (id: string) => void
  setActive: (winId: string) => void
  removeActive: (winId: string) => void
  remove: () => void
  getInstances: () => Array<AppInfo>
}

interface ITaskbarAppItemEvents {
  onclick?: Function,
  oncontextmenu?: Function,
  onmousedown?: Function,
  onRemove?: Function
}

function getIconProps(icon?: string, iconType?: string) {
  const iconProps = Object.create(null)
  iconProps.className = 'taskbar-app-item-icon w-full h-full flex items-center content-center'

  if (iconType === 'svg') {
    iconProps.innerHTML = icon
  } else {
    iconProps.className += ' image-icon'
    if (!iconProps.style) {
      iconProps.style = Object.create(null)
    }

    iconProps.style.backgroundImage = `url("${icon}")`
    iconProps.style.pointerEvents = 'none'
  }

  return iconProps
}

export function TaskbarSystemAppItem(appInfo: TaskBarAppInfo, events?: ITaskbarAppItemEvents): ITaskbarSystemAppItem {
  let appItem: HTMLDivElement
  const props = Object.create(null)
  props.title = appInfo.productName
  props.className = 'taskbar-app-item'

  const iconProps = getIconProps(appInfo.icon, appInfo.iconType)

  props.onmousedown = (e: MouseEvent) => e.stopImmediatePropagation()
  props.onclick = events?.onclick
  props.oncontextmenu = events?.oncontextmenu

  appItem = createElement('div', props, createElement('div', iconProps))

  return {
    element: appItem
  }
}

export function TaskbarAppItem(appInfo: TaskBarAppInfo, events?: ITaskbarAppItemEvents): ITaskbarAppItem {
  let appItem: IDropElement

  const instances: Array<AppInfo> = []

  const props = Object.create(null)

  // props.title = appInfo.productName
  props.className = 'taskbar-app-item'

  const iconProps = getIconProps(appInfo.icon, appInfo.iconType)

  let showTimeout: NodeJS.Timeout

  props.onmousedown = (e: MouseEvent) => {
    closeContextMenu()
    e.stopPropagation()
    triggerEvent(eventNames.closePopup)

    if (showTimeout) clearTimeout(showTimeout)
  }

  props.oncontextmenu = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    closeContextMenu()
    if (typeof events.oncontextmenu === 'function') {
      events.oncontextmenu(e)
    }
  }

  function showThumbnail() {
    const wins = instances.map(t => t.app)
    TaskBarAppThumbnails(wins, appItem.getBoundingClientRect())
  }

  props.onmouseover = () => {
    if (instances.length) {
      preventHidden()

      if (showTimeout) clearTimeout(showTimeout)

      const thumbnailElem = getThumbnailElement()

      if (!thumbnailElem) {
        showTimeout = setTimeout(() => {
          showThumbnail()
        }, 500)
      } else {
        showThumbnail()
      }
    }
  }

  props.onmouseleave = () => {
    if (showTimeout) clearTimeout(showTimeout)

    if (instances.length) {
      hideThumbnail()
    }
  }

  props.onclick = onAppItemClick

  function onAppItemClick() {
    if (instances.length === 0) {
      // To Index
      createWindow(appInfo.name)
    }

    else if (instances.length === 1) {
      closeThumbnails()

      const currentInstance = instances[0]

      if (currentInstance.app.isVisible()) {
        if (currentInstance.app.isFocused()) {
          currentInstance.app.hide()
        } else {
          currentInstance.app.focus()
        }
      } else {
        currentInstance.app.show()
        currentInstance.app.focus()
      }
    }
  }

  let taskbarAppItemStatusElem: HTMLDivElement

  appItem = createElement('div', props,
    [
      createElement('div', iconProps),
      taskbarAppItemStatusElem = createElement('div', {
        className: 'taskbar-app-item-status'
      })
    ]
  )

  appItem.addEventListener('customdragover', oncustomdragover, false)
  appItem.addEventListener('customdrop', oncustomdrop, false)

  function oncustomdragover(_e: MouseEvent) {
    
  }
  function oncustomdrop(_e: MouseEvent) {
    
  }

  function checkAppOpen() {
    if (instances.length) {
      taskbarAppItemStatusElem.classList.add('active')
    } else {
      taskbarAppItemStatusElem.classList.remove('active')
    }
  }

  function addInstance(id: string, win: IWindow) {
    instances.push({
      name: id,
      active: true,
      app: win
    })

    checkAppOpen()
  }

  function removeInstance(id: string) {
    const instanceIndex = instances.findIndex(t => t.name === id)

    if (instanceIndex > -1) {
      instances.splice(instanceIndex, 1)

      if (instances.length === 0) {
        if (events?.onRemove) {
          events.onRemove()
        }
      }
    }

    checkAppOpen()
  }

  function setActive(_winId: string) {
    setTimeout(() => {
      appItem.classList.add('active')
    }, 10)
  }

  function removeActive(_windId: string) {
    setTimeout(() => {
      appItem.classList.remove('active')
    }, 0)
  }

  function getInstances() {
    return instances
  }

  function remove() {
    appItem.remove()
  }

  return {
    element: appItem as HTMLDivElement,
    addInstance,
    removeInstance,
    getInstances,
    setActive,
    removeActive,
    remove
  }
}
