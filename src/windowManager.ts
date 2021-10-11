import Taskbar from "./components/taskbar/taskbar"
import { listenEvent } from "./event"
import eventNames from "./eventNames"
import { IWindow } from "./interfaces/window"

export interface WindowManagerInfo {
  appName: string
  id: string
  window: IWindow
}

const windows: Array<WindowManagerInfo> = []

const focusedWindows: Array<IWindow> = []

let visibleWindows: Array<WindowManagerInfo> = []

let isShowDesktop: boolean = false

function removeVisibleWindow(id: string) {
  const winInfoIndex = visibleWindows.findIndex(t => t.window.id === id)

  if (winInfoIndex > -1) {
    visibleWindows.splice(winInfoIndex, 1)
  }
}

function addFocusedWindow(win: IWindow) {
  const winIndex = focusedWindows.findIndex(t => t.id === win.id)

  if (winIndex > -1) {
    focusedWindows.splice(winIndex, 1)
  }

  focusedWindows.push(win)
}

function removeFocusedWindow(id: string) {
  const winIndex = focusedWindows.findIndex(t => t.id === id)

  if (winIndex > -1) {
    focusedWindows.splice(winIndex, 1)

    if (focusedWindows.length > 0) {
      const lastActiveApp = focusedWindows[focusedWindows.length - 1]

      if (lastActiveApp.isVisible()) {
        lastActiveApp.focus()
      }
    }
  }
}

function loopWindows(cb: (win: WindowManagerInfo) => void) {
  const winLen = windows.length

  for (let index = 0; index < winLen; index++) {
    cb(windows[index])
  }
}

export function getWindowByName(appName: string) {
  return windows.find(t => t.appName === appName)
}

export function addWindow(appName: string, id: string, win: IWindow) {
  isShowDesktop = false

  const winLen = windows.length

  for (let index = 0; index < winLen; index++) {
    const curWinInfo = windows[index]
    curWinInfo.window.decrementZIndex()
    curWinInfo.window.blur()
  }

  windows.push({ appName, id, window: win })

  Taskbar.addInstance(appName, id, win)
}

export function removeWindow(appName: string, id: string) {
  const windowIndex = windows.findIndex((t: WindowManagerInfo) => t.id === id)

  if (windowIndex > -1) {
    windows.splice(windowIndex, 1)
    Taskbar.removeInstance(appName, id)
  }

  removeFocusedWindow(id)

  removeVisibleWindow(id)
}

export function show(_win: IWindow) {

}

export function minimize(_appName: string, _id: string) {

}

export function blur(_win: IWindow) {

}

export function focus(_appName: string, id: string, win: IWindow) {
  win.restoreZIndex()

  addFocusedWindow(win)

  const winLen = windows.length

  for (let index = 0; index < winLen; index++) {
    const curWin = windows[index]
    if (curWin.id !== id) {
      curWin.window.decrementZIndex()
      curWin.window.blur()
    }
  }
}

export function toggleTransprent() {
  const winLen = windows.length

  for (let index = 0; index < winLen; index++) {
    const curWin = windows[index]
    curWin.window.toggleTransprent()
  }
}

export function viewWindow(id: string) {
  const winLen = windows.length

  for (let index = 0; index < winLen; index++) {
    const curWin = windows[index]
    if (curWin.id !== id) {
      if (curWin.window.isVisible()) {
        curWin.window.makeTransparent()
      }
    } else {
      curWin.window.element.classList.add('top-view')
    }
  }
}

export function restoreView(id?: string) {
  if (id) {
    const winLen = windows.length

    for (let index = 0; index < winLen; index++) {
      const curWin = windows[index]
      if (curWin.id !== id) {
        if (curWin.window.isVisible()) {
          curWin.window.removeTransparent()
        }
      } else {
        curWin.window.element.classList.remove('top-view')
      }
    }
  } else {
    const winLen = windows.length

    for (let index = 0; index < winLen; index++) {
      const curWin = windows[index]
      if (curWin.window.isVisible()) {
        curWin.window.removeTransparent()
      }
    }
  }
}

export function blurAll() {
  loopWindows(winInfo => {
    winInfo.window.blur()
  })
}

window.addEventListener('resize', () => {
  const winLen = windows.length

  for (let index = 0; index < winLen; index++) {
    const curWin = windows[index]
    if (curWin.window.isMaximized()) {
      curWin.window.maximize()
    }
  }
}, false)

function showDesktop() {
  if (!isShowDesktop) {
    visibleWindows = windows.filter(win => win.window.isVisible())
    visibleWindows.forEach(win => {
      win.window.removeTransparent()
      win.window.hide()
    })
  } else {
    visibleWindows.forEach(win => {
      win.window.removeTransparent()
      win.window.show()
    })

    const lastFocusWindow = focusedWindows[focusedWindows.length - 1]

    if (lastFocusWindow) {
      if (lastFocusWindow.isVisible()) {
        lastFocusWindow.focus()
      }
    }
  }

  isShowDesktop = !isShowDesktop
}

//From Taskbar Thumbnail
listenEvent(eventNames.viewWindow, 'window-manager', data => {
  viewWindow(data.id)
})

listenEvent(eventNames.restoreView, 'window-manager', data => {
  restoreView(data.id)
})

listenEvent(eventNames.showDesktopHover, 'window-manager', () => {
  loopWindows(winInfo => {
    if (winInfo.window.isVisible()) {
      winInfo.window.makeTransparent()
    }
  })
})

listenEvent(eventNames.showDesktopOut, 'window-manager', () => {
  loopWindows(winInfo => {
    if (winInfo.window.isVisible()) {
      winInfo.window.removeTransparent()
    }
  })
})

listenEvent(eventNames.showDesktop, 'window-manager', () => {
  showDesktop()
})

listenEvent(eventNames.blurAllWindow, 'window-manager', () => {
  blurAll()
})
