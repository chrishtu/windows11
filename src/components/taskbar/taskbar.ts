import createElement, { appendChild } from "../../createElement";
import { taskbarHeight } from "../constant";
import { batteryIcon, chevronUpIcon, volumeIcon2, wifiIcon, windowIcon } from "../icons/icons";
import { ITaskbarAppItem, ITaskbarSystemAppItem, TaskbarAppItem, TaskbarSystemAppItem } from "./appItem";
import TaskBarDate from "./date";
import TaskBarTime from "./time";
import { IWindow } from "../../interfaces/window";
import { triggerEvent } from "../../event";
import { AppInfo } from "../../apps/appInfo";
import ActionCenter from "../actionCenter/actionCenter";
import eventNames from "../../eventNames";
import startMenu from "../../apps/startMenu";

function onmouseover() {
  //To Window Manager
  triggerEvent(eventNames.showDesktopHover)
}

function onmouseout() {
  //To Window Manager
  triggerEvent(eventNames.showDesktopOut)
}

function showDesktop() {
  //To Window Manager
  triggerEvent(eventNames.showDesktop)
}

interface ITaskbarSystemAppItemData {
  name: string,
  item: ITaskbarSystemAppItem
}

interface ITaskbarAppItemData {
  name: string,
  item: ITaskbarAppItem,
  pinned?: boolean
}

function TaskbarSystemApp() {
  function onStartMenuAppItemClick() {
    triggerEvent(eventNames.closePopup, startMenu.id)
    startMenu.toggleShow()
  }

  const taskbarSystemAppItems: Array<ITaskbarSystemAppItemData> = [
    {
      name: 'startMenu',
      item: TaskbarSystemAppItem({ isSystemApp: true, name: 'start-menu', productName: 'Start', icon: windowIcon, iconType: 'svg' }, {
        onclick: onStartMenuAppItemClick
      })
    }
  ]

  const taskbarSystemAppItemsElem = taskbarSystemAppItems.map(t => t.item.element)

  return createElement('div', {
    className: 'taskbar-app-items h-full flex flex-shrink-0 items-center content-center'
  }, taskbarSystemAppItemsElem)
}

function TaskbarAppItems() {
  let taskbarAppItems: Array<ITaskbarAppItemData> = []

  let savedItems: any = localStorage.getItem('taskbarItems')

  if (typeof savedItems === 'undefined' || savedItems === null) {
    taskbarAppItems = [
      {
        name: 'explorer', item: TaskbarAppItem(AppInfo.explorer, {
          onRemove: onAppItemInstanceRemove
        }),
        pinned: true
      },
      {
        name: 'settings', item: TaskbarAppItem(AppInfo.settings, {
          onRemove: onAppItemInstanceRemove
        }),
        pinned: true
      },
      {
        name: 'notepad', item: TaskbarAppItem(AppInfo.notepad, {
          onRemove: onAppItemInstanceRemove
        }),
        pinned: true
      }
    ]
  } else {
    try {
      if (savedItems) {
        savedItems = JSON.parse(savedItems)

        if (savedItems instanceof Array) {
          taskbarAppItems = savedItems.map((itemName: string): ITaskbarAppItemData => ({
            name: itemName,
            item: TaskbarAppItem(AppInfo[itemName], {
              onRemove: onAppItemInstanceRemove
            }),
            pinned: true
          }))
        }
      }
    } catch (_error) {

    }
  }

  let taskbarAppItemsElem: HTMLDivElement

  // let lastActiveApp: string

  const taskbarAppItemsContainerElem = createElement('div', {
    className: 'w-full h-full flex content-center'
  },
    [
      // System
      TaskbarSystemApp(),

      // Apps
      taskbarAppItemsElem = createElement('div', {
        className: 'taskbar-app-items h-full flex items-center content-center'
      }, taskbarAppItems.map(t => t.item.element))
    ]
  )

  function onAppItemInstanceRemove() {

  }

  function getItemByName(appName: string) {
    return taskbarAppItems.find(t => t.name === appName)
  }

  function addItem(appName: string, appItem: ITaskbarAppItem) {
    const item = { name: appName, item: appItem }
    taskbarAppItems.push(item)
    taskbarAppItemsElem.appendChild(appItem.element)
    return item
  }

  function removeAppItem(appName: string) {
    taskbarAppItems = taskbarAppItems.filter(t => t.name !== appName)
  }

  function _addInstance(appItem: ITaskbarAppItemData, id: string, win: IWindow) {
    if (appItem.item.addInstance) {
      appItem.item.addInstance(id, win)
    }
  }

  function addInstance(appName: string, id: string, win: IWindow) {
    const appItem = getItemByName(appName)

    if (!appItem) {
      let newTaskbarAppItem = TaskbarAppItem(AppInfo[appName])
      const newInstance = addItem(appName, newTaskbarAppItem)
      _addInstance(newInstance, id, win)
      taskbarAppItems.push({ name: appName, item: newTaskbarAppItem })
    } else {
      _addInstance(appItem, id, win)
    }
  }

  function removeInstance(appName: string, id: string) {
    const appItem = getItemByName(appName)

    if (appItem) {
      appItem.item.removeInstance(id)

      if (!appItem.item.getInstances().length) {
        if (!appItem.pinned) {
          appItem.item.remove()

          removeAppItem(appName)
        } else {
          appItem.item.removeActive(id)
        }
      }
    }
  }

  function setActiveWindow(appName: string, id: string) {
    const appItem = getItemByName(appName)

    if (appItem) {
      appItem.item.setActive(id)
    }
  }

  function removeActiveWindow(appName: string, id: string) {
    const appItem = getItemByName(appName)

    if (appItem) {
      appItem.item.removeActive(id)
    }
  }

  function getAppItemBounds(appName: string) {
    const appItem = getItemByName(appName)

    return appItem.item.element.getBoundingClientRect()
  }

  return {
    element: taskbarAppItemsContainerElem,
    addInstance,
    removeAppItem,
    removeInstance,
    setActiveWindow,
    removeActiveWindow,
    getAppItemBounds
  }
}

function _Taskbar() {
  const taskbarAppItems = TaskbarAppItems()

  const taskbar = createElement('div', {
    className: 'taskbar fixed bottom w-full',
    style: {
      height: taskbarHeight + 'px'
    }
  },
    createElement('div', {
      className: 'taskbar-innner flex h-full'
    },
      [
        createElement('div', {
          className: 'taskbar-left h-full flex-1 flex-shrink-0 flex items-center'
        },
          [
            TaskBarTime().element
          ]
        ),
        createElement('div', {
          className: 'taskbar-center flex-2 w-full h-full'
        },
          taskbarAppItems.element
        ),
        createElement('div', {
          className: 'taskbar-right h-full flex-1 flex-shrink-0 relative flex items-center content-end',
          style: {
            paddingRight: '6px'
          }
        },
          [
            createElement('div', {
              title: 'Show hidden icons',
              className: 'taskbar-item flex items-center content-center flex-shrink-0 taskbar-item-more',
              innerHTML: chevronUpIcon
            }),
            createElement('div', {
              className: 'taskbar-item flex items-center content-center flex-shrink-0',
              onmousedown: e => e.stopPropagation(),
              onclick: () => {
                triggerEvent(eventNames.closePopup, ActionCenter.id)
                ActionCenter.toggleShow()
              }
            },
              [
                createElement('div', {
                  className: 'flex items-center content-center h-full flex-shrink-0',
                  style: {
                    width: taskbarHeight + 'px'
                  },
                  innerHTML: volumeIcon2
                }),
                createElement('div', {
                  className: 'flex items-center content-center h-full flex-shrink-0',
                  style: {
                    width: taskbarHeight + 'px'
                  },
                  innerHTML: wifiIcon
                }),
                createElement('div', {
                  className: 'flex items-center content-center h-full flex-shrink-0',
                  style: {
                    width: taskbarHeight + 'px'
                  },
                  innerHTML: batteryIcon
                })
              ]
            ),
            TaskBarDate().element,
            createElement('div', {
              className: 'show-desktop flex-shrink-0',
              onmouseover,
              onmouseout,
              onclick: showDesktop
            })
          ]
        )
      ]
    )
  )

  appendChild(document.body, taskbar)

  return taskbarAppItems
}

const Taskbar = _Taskbar()

export default Taskbar
