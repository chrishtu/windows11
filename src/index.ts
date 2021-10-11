import { listenEvent } from "./event";
import { AppInfo } from "./apps/appInfo";
import { Apps } from "./apps/app";
import { getState } from "./store";
import desktop from "./components/desktop/desktop";
import { enableDarkTheme, getExt, isWebkit, setTransparencyEffect } from "./utils";
import { ProcessInfo } from "./proceduce";
import { FileMapping } from "./apps/fileMapping";
import eventNames from "./eventNames";
import DesktopScreen from "./components/DesktopScreen";

if (isWebkit) {
  document.documentElement.classList.add('isWebkit')
}

const state = getState(['darktheme', 'transparency', 'backgroundImage', 'brightness', 'nightlight'])

if (state.darktheme) {
  enableDarkTheme(state.darktheme)
}

if (state.transparency) {
  setTransparencyEffect(state.transparency)
}

if (state.backgroundImage) {
  desktop.setBackgroundImage(state.backgroundImage)
}

if (state.brightness) {
  DesktopScreen.setBrightness(state.brightness || 100)
}

if (state.nightlight) {
  DesktopScreen.setNightLight(state.nightlight)
}

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
