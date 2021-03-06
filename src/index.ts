import { listenEvent } from "./event";
import { AppInfo } from "./apps/appInfo";
import { Apps } from "./apps/app";
import { appStore } from "./store";
import desktop from "./components/desktop/desktop";
import { getExt, isWebkit } from "./utils";
import { ProcessInfo } from "./proceduce";
import { FileMapping } from "./apps/fileMapping";
import eventNames from "./eventNames";
import DesktopScreen from "./components/DesktopScreen";
import { enableDarkTheme, isNotNullOrUndifined, setBorder, setRoundedCorner, setTransparencyEffect } from "./utils/common";
import { taskbarHeight } from "./components/constant";

if (isWebkit) {
  document.documentElement.classList.add('isWebkit')
}

document.documentElement.style.setProperty('--taskbar-height', taskbarHeight.toString() + 'px')

document.addEventListener('contextmenu', e => {
  e.preventDefault()
})

const state = appStore.getStates()

if (state.darktheme) {
  enableDarkTheme(state.darktheme)
}

if (state.transparency) {
  setTransparencyEffect(state.transparency)
}

if (state.backgroundImage) {
  desktop.setBackgroundImage(state.backgroundImage)
}

if (isNotNullOrUndifined(state.brightness)) {
  DesktopScreen.setBrightness(state.brightness)
}

if (state.nightlight) {
  DesktopScreen.setNightLight(state.nightlight)
}

setRoundedCorner(state.roundedCorner)

setBorder(state.useBorder)

function createWindow(appName: string, args?: any) {
  const appInfo = AppInfo[appName]

  Apps[appName](appInfo, args)
}

function startProcess(processInfo: ProcessInfo) {
  if (processInfo.type === 'link') {
    window.open(processInfo.args, '_blank')
  }
  else if (processInfo.type === 'app') {
    createWindow(processInfo.name, processInfo.args)
  }
  else if (processInfo.type === 'file') {
    const fileInfo = FileMapping[getExt(processInfo.args)]
    createWindow(fileInfo.appName, processInfo.args)
  }
}

// From Proceduce
listenEvent(eventNames.createWindow, 'index', ({ appName, args }) => {
  createWindow(appName, args)
})

listenEvent(eventNames.startProcess, 'index', (processInfo: ProcessInfo) => {
  startProcess(processInfo)
})
