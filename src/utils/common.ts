import { setStyle } from "../createElement"
import { triggerEvent } from "../event"
import eventNames from "../eventNames"
import { appStore } from "../store"

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

  appStore.setState({ darktheme })

  triggerEvent(eventNames.themeChange, darktheme)
}

export function toggleTheme(cb?: (isDark: boolean) => void) {
  let { darktheme } = appStore.getState('darktheme')

  enableDarkTheme(!darktheme)

  if (typeof cb === 'function') {
    cb(!darktheme)
  }
}

export function setTransparencyEffect(transparency: boolean) {
  document.documentElement.classList[transparency ? 'add' : 'remove']('glass')

  appStore.setState({ transparency })

  triggerEvent(eventNames.transparentChange, transparency)
}

export function toggleTransparency() {
  const { transparency } = appStore.getState('transparency')

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

export function setRoundedCorner(checked: boolean) {
  document.documentElement.classList.toggle('no-border-radius', !checked)
}

export function setBorder(useBorder: boolean) {
  document.documentElement.classList.toggle('use-border', useBorder)
}

export function dragItem(element: HTMLElement, detail?: any) {
  element.addEventListener('mousedown', onmousedown, false)

  let elementCopy: HTMLElement, target: Element
  let deltaX = 0, deltaY = 0
  let firstBound = {
    x: 0,
    y: 0
  }
  let isDragStart = false

  function onmousedown(e: MouseEvent) {
    document.addEventListener('mousemove', onmousemove, false)
    document.addEventListener('mouseup', onmouseup, false)

    firstBound.x = e.clientX
    firstBound.y = e.clientY
  }

  function onmousemove(e: MouseEvent) {
    if (Math.abs(e.clientX - firstBound.x) > 1 || Math.abs(e.clientY - firstBound.y) > 1) {
      if (!isDragStart) {
        isDragStart = true

        const targetBound = element.getBoundingClientRect()
        deltaX = e.clientX - targetBound.left
        deltaY = e.clientY - targetBound.top

        elementCopy = element.cloneNode(true) as HTMLElement
        elementCopy.classList.add('drag-item')

        document.body.appendChild(elementCopy)

        element.dispatchEvent(new CustomEvent('customdragstart', { bubbles: true, detail }))
      }
    }

    if (isNotNullOrUndifined(elementCopy)) {
      setStyle(elementCopy, {
        top: (e.clientY - deltaY) + 'px',
        left: (e.clientX - deltaX) + 'px',
      })
    }

    const _target = document.elementFromPoint(e.clientX, e.clientY)

    if (_target instanceof Element) {
      if (target !== _target) {
        target = _target
        target.dispatchEvent(new CustomEvent('customdragover', { bubbles: true, detail }))
      } else {
        target.dispatchEvent(new CustomEvent('customdrag', { bubbles: true, detail }))
      }
    }
  }

  function onmouseup(_e: MouseEvent) {
    if (isDragStart) {
      target.dispatchEvent(new CustomEvent('customdrop', { bubbles: true, detail }))
      document.body.removeChild(elementCopy)
      isDragStart = false
    }

    document.removeEventListener('mousemove', onmousemove, false)
    document.removeEventListener('mouseup', onmouseup, false)
  }
}
