import { triggerEvent } from "../event"
import eventNames from "../eventNames"
import { getState, setState } from "../store"

export function getImageThumbnail(src: string, cb: (src: string) => void) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  const height = 200

  img.src = src

  img.onload = () => {
    const ratio = img.naturalWidth / img.naturalHeight
    const width = Math.round(200 * ratio)

    canvas.width = width
    canvas.height = height

    ctx.drawImage(img, 0, 0, width, height)
    const dataUrl = canvas.toDataURL('image/png')
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const src = URL.createObjectURL(blob)
        cb(src)
      })
  }
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

export function isNotNullOrUndifined(value: any) {
  return value !== null && value !== undefined
}

export function setBackgroundImageStyle(element: HTMLElement, style: string) {
  element.style.backgroundColor = 'transparent'
  element.style.backgroundRepeat = 'no-repeat'
  element.style.backgroundPosition = 'center'

  switch (style) {
    case 'fill':
      element.style.backgroundSize = 'cover'
      break
    case 'fit':
      element.style.backgroundSize = 'contain'
      break
    case 'stretch':
      element.style.backgroundSize = '100% 100%'
      break
    case 'center':
      element.style.backgroundSize = 'cover'
      break
    case 'tile':
      element.style.backgroundSize = 'contain'
      element.style.backgroundRepeat = 'repeat'
      break
    case 'span':
      element.style.backgroundSize = 'cover'
      element.style.backgroundPosition = 'left top'
      break
    default:
      element.style.backgroundSize = 'cover'
      break

  }
}
