import { triggerEvent } from "./event";
import eventNames from "./eventNames";
import { getState, setState } from "./store";

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateID(len = 8) {
  var text = '';
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const isWebkit = /webkit/.test(navigator.userAgent.toLowerCase())


export function getExt(path: string) {
  return path.substring(path.lastIndexOf('.'), path.length)
}

type FileCallback = (text: string) => void

export function readFile(path: string, cb: FileCallback) {
  const req = new XMLHttpRequest()
  req.onreadystatechange = () => {
    if (req.readyState === 4)
      cb(req.responseText)
  }
  req.open('get', path)
  req.send()
}

export function getFileName(path: string) {
  return path.substring(path.lastIndexOf('/') + 1, path.length)
}

export function enableDarkTheme(darktheme: boolean) {
  document.documentElement.classList[darktheme ? 'add' : 'remove']('dark')

  setState({ darktheme })

  triggerEvent(eventNames.themeChange, darktheme)
}

export function toggleTheme(cb?: (isDark: boolean) => void) {
  let { darktheme } = getState('darktheme')

  enableDarkTheme(!darktheme)

  if (typeof cb === 'function') {
    cb(!darktheme)
  }
}

export function setTransparencyEffect(transparency: boolean) {
  document.documentElement.classList[transparency ? 'add' : 'remove']('glass')

  setState({ transparency })

  triggerEvent(eventNames.transparentChange, transparency)
}

export function toggleTransparency() {
  const { transparency } = getState('transparency')

  setTransparencyEffect(!transparency)
}

export function debounce(func: Function, delay: number) {
  let inDebounce: NodeJS.Timeout

  return function _debounce() {
    const context = _debounce
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

interface ThrottleOptions {
  limit: number
  debounceDelay: number,
  onDebounce?: Function
  onFrame?: Function
}

export function throttle(func: Function, options: ThrottleOptions) {
  let lastFunc: NodeJS.Timeout
  let lastRan: number
  let inDebounce: NodeJS.Timeout
  let inFrame: number

  return function _throttle() {
    const context = _throttle
    const args = arguments

    cancelAnimationFrame(inFrame)
    inFrame = requestAnimationFrame(() => {
      if (typeof options.onFrame === 'function') {
        options.onFrame.apply(context, args)
      }
    })

    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => {
      if (typeof options.onDebounce === 'function') {
        options.onDebounce.apply(context, args)
      }
    }, options.debounceDelay)

    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= options.limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, options.limit - (Date.now() - lastRan))
    }
  }
}

export function round(value: number, decimals: number) {
  return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals);
}
