import createElement, { appendChild } from "../../createElement";
import { listenEvent, triggerEvent } from "../../event";
import eventNames from "../../eventNames";
import { generateID } from "../../utils";

interface PopupOptions {
  width?: number
  height?: number
  className?: string
}

interface Popup {
  element: HTMLDivElement
  id: string
  show: () => void
  hide: () => void
  visible: () => void
  close(): void
  toggleShow: () => void
}

interface PopupStyle {
  width?: string,
  height?: string
}

interface PopupEvents {
  onShow?: () => void,
  onHide?: () => void
}

export default function Popup(options: PopupOptions, content: any, events?: PopupEvents): Popup {
  const id = 'popup' + generateID(32)
  let className = 'popup dropdown-box'
  let isShow = false
  let style: PopupStyle = {}

  if (options.className) {
    className += ' ' + options.className
  }

  if (options.width) {
    style.width = options.width + 'px'
    style.height = options.height + 'px'
  }

  let popup: HTMLDivElement = createElement('div')

  function createPopup(_content: any) {
    popup = createElement('div', {
      tabIndex: -1,
      className,
      style
    },
      createElement('div', {
        className: 'popup-inner relative w-full h-full'
      },
        _content
      )
    )

    appendChild(document.body, popup)

    // To Index
    triggerEvent(eventNames.blurAllWindow)

    popup.focus()

    document.addEventListener('mousedown', onDocumentMouseDown1, false)
  }

  function show() {
    createPopup(content)
    isShow = true
    if (events && events.onShow) {
      events.onShow()
    }
  }

  function close() {
    popup.remove()
    document.removeEventListener('mousedown', onDocumentMouseDown1, false)
    isShow = false
    if (events && events.onHide) {
      events.onHide()
    }
  }

  function toggleShow() {
    isShow ? close() : show()
  }

  function onDocumentMouseDown1(e: MouseEvent) {
    const target = e.target as Node

    if (!popup.contains(target)) {
      close()
    }
  }

  function hide() {
    if (popup) {
      popup.classList.add('hidden')
    }
  }

  function visible() {
    if (popup) {
      popup.classList.remove('hidden')
    }
  }

  listenEvent(eventNames.closePopup, id, (triggerId: string) => {
    if (isShow) {
      if (id !== triggerId) {
        close()
      }
    }
  })

  listenEvent(eventNames.showPopup, id, () => {
    visible()
  })

  listenEvent(eventNames.hidePopup, id, () => {
    hide()
  })

  return {
    element: popup,
    id,
    show,
    close,
    visible,
    hide,
    toggleShow
  }
}
