import { triggerEvent } from "./event";
import eventNames from "./eventNames";

export function createWindow(appName: string, args?: any) {
  //To Index
  triggerEvent(eventNames.createWindow, { appName, args })
}

type ProcessItemType = 'app' | 'link' | 'file'

export interface ProcessInfo {
  icon?: string
  iconType?: string
  name?: string
  productName?: string
  type: ProcessItemType
  args?: any
}

export function startProcess(processInfo: ProcessInfo) {
  triggerEvent(eventNames.startProcess, processInfo)
}
