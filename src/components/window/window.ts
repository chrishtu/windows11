import createElement, { appendChild } from "../../createElement";
import { Cordinate, IWindow, Position, Size, WindowBounds, WindowOptions } from "../../interfaces/window";
import { generateID } from "../../utils";
import TitleBar from "./titlebar";
import { dragElement, resizeElem } from "./utils";
import * as WindowManager from '../../windowManager'
import { taskbarHeight, titlebarHeight } from "../constant";
import { ResizeEvents } from "../../interfaces/events";
import Taskbar from "../taskbar/taskbar";

const maxZIndex = 100000

interface WindowBoundsStyle {
  top?: string | number,
  left?: string | number,
  width?: string | number,
  height?: string | number,
  zIndex: string
}

interface WindowListeners {
  [key: string]: Array<any>
}

interface IResizeHandle {
  setAspectRatio(ratio: number): void
  setKeepAspectRatio(keep: boolean): void
}

export default function Window(options: WindowOptions) {
  const listeners: WindowListeners = {}

  if (options.singleInstance) {
    let instance = WindowManager.getWindowByName(options.name)

    if (instance) {
      instance.window.executeListeners('secondInstance', options.args)

      return instance.window
    }
  }

  let windowInfo: IWindow
  let zIndex = maxZIndex

  const id = generateID(32)

  // let windowInner: HTMLDivElement
  let windowContent: HTMLElement

  let isTransparent = false
  let maximized = false
  let minimized = false
  let focused = false
  let isShow = false
  let isFullScreen = false

  let dragTop = false

  let _autoHideTitleBar: boolean = false

  let resizeHanders: IResizeHandle

  function addEventListener(name: string, listener: Function) {
    if (!listeners[name]) {
      listeners[name] = []
    }

    listeners[name].push(listener)
  }

  function executeListeners(name: string, args?: any) {
    const currentListeners = listeners[name]

    if (!currentListeners) return

    for (let index = 0; index < currentListeners.length; index++) {
      currentListeners[index](args)
    }
  }

  let title: string = options.title || ''

  let titlebar = TitleBar({
    icon: options.icon,
    title: options.title,
    disableMaximize: options.disableMaximize,
    maximized: options.maximized,
    autoHide: options.autoHideTitleBar
  }, {
    onDoubleClick,
    onMinimizeButtonClick,
    onMaximizeButtonClick,
    onCloseButtonClick,
    onVisible: () => executeListeners('ontitlebarshow'),
    onHidden: () => executeListeners('ontitlebarhide')
  })

  let lastBounds: WindowBounds = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  }

  const style: WindowBoundsStyle = {
    zIndex: zIndex.toString()
  }

  let _top = 0,
    _left = 0,
    _width = 300,
    _height = 200

  let keepAspectRatio: boolean = false
  let aspectRatio = 0

  if (options.keepAspectRatio) {
    keepAspectRatio = options.keepAspectRatio
  }

  if (options.top) {
    _top = Number(options.top)
  }

  if (options.left) {
    _left = Number(options.left)
  }

  if (options.width) {
    _width = Number(options.width)
  }

  if (options.height) {
    _height = Number(options.height)
  }

  if (options.center) {
    _top = Math.round((window.innerHeight - _height - taskbarHeight) / 2)
    _left = Math.round((window.innerWidth - _width) / 2)
  }

  if (keepAspectRatio) {
    aspectRatio = _width / _height
  }

  style.top = _top + 'px'
  style.left = _left + 'px'
  style.width = _width + 'px'
  style.height = _height + 'px'

  let className = ''

  let windowContentClassName = 'window-content'

  if (options.fluidContent) {
    windowContentClassName += ' fluid'
  }
  if (!options.transprencyContent) {
    windowContentClassName += ' theme-background'
  }

  let resizeTop: HTMLElement,
    resizeLeft: HTMLElement,
    resizeBottom: HTMLElement,
    resizeRight: HTMLElement,
    resizeTopLeftV: HTMLElement,
    resizeTopLeftH: HTMLElement,
    resizeBottomLeftV: HTMLElement,
    resizeBottomLeftH: HTMLElement,
    resizeBottomRightV: HTMLElement,
    resizeBottomRightH: HTMLElement,
    resizeTopRightV: HTMLElement,
    resizeTopRightH: HTMLElement

  let _window: HTMLDivElement

  const resizeDisabledClassName = (options.disableResize ? ' disabled' : '')

  _window = createElement('div', {
    tabIndex: -1,
    className: 'window' + className,
    style
  },
    [
      createElement('div', {
        className: 'window-background absolute w-full h-full'
      }),

      createElement('div', {
        className: 'window-inner relative w-full h-full'
      },
        [
          titlebar.element,
          createElement('div', {
            className: windowContentClassName
          },
            windowContent = createElement('div', {
              className: 'relative w-full h-full'
            })
          )
        ]
      ),
      resizeTop = createElement('div', {
        'data-resize': 't',
        className: 'window-resize-handle window-resize-horizontal window-resize-top' + resizeDisabledClassName
      }),
      resizeBottom = createElement('div', {
        'data-resize': 'b',
        className: 'window-resize-handle window-resize-horizontal window-resize-bottom' + resizeDisabledClassName
      }),
      resizeLeft = createElement('div', {
        'data-resize': 'l',
        className: 'window-resize-handle window-resize-vertical window-resize-left' + resizeDisabledClassName
      }),
      resizeRight = createElement('div', {
        'data-resize': 'r',
        className: 'window-resize-handle window-resize-vertical window-resize-right' + resizeDisabledClassName
      }),
      //Corner
      // TopLeft
      resizeTopLeftV = createElement('div', {
        'data-resize': 'tl',
        className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-tl window-resize-tl-v' + resizeDisabledClassName
      }),
      resizeTopLeftH = createElement('div', {
        'data-resize': 'tl',
        className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-tl window-resize-tl-h' + resizeDisabledClassName
      }),
      // BottomRight
      resizeBottomRightV = createElement('div', {
        'data-resize': 'br',
        className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-br window-resize-br-v' + resizeDisabledClassName
      }),
      resizeBottomRightH = createElement('div', {
        'data-resize': 'br',
        className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-br window-resize-br-h' + resizeDisabledClassName
      }),
      // BottomLeft
      resizeBottomLeftV = createElement('div', {
        'data-resize': 'bl',
        className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-bl window-resize-bl-v' + resizeDisabledClassName
      }),
      resizeBottomLeftH = createElement('div', {
        'data-resize': 'bl',
        className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-bl window-resize-bl-h' + resizeDisabledClassName
      }),
      // TopRight
      resizeTopRightV = createElement('div', {
        'data-resize': 'tr',
        className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-tr window-resize-tr-v' + resizeDisabledClassName
      }),
      resizeTopRightH = createElement('div', {
        'data-resize': 'tr',
        className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-tr window-resize-tr-h' + resizeDisabledClassName
      })
    ]
  )

  appendChild(document.body, _window)

  let mouseTimeout: NodeJS.Timeout

  if (options.autoHideTitleBar) {
    _window.addEventListener('mouseover', onmouseover, false)
    _window.addEventListener('mouseout', onmouseout, false)
    _window.addEventListener('mousemove', onmousemove, false)
  }

  function onmouseover() {
    if (mouseTimeout) clearTimeout(mouseTimeout)

    titlebar.setAutoHide(false)

    if (_autoHideTitleBar) titlebar.setAutoHide(true)
  }

  function onmousemove() {
    if (mouseTimeout) clearTimeout(mouseTimeout)

    titlebar.setAutoHide(false)

    mouseTimeout = setTimeout(() => {
      if (_autoHideTitleBar) titlebar.setAutoHide(true)
    }, 100)
  }

  function onmouseout() {
    if (mouseTimeout) clearTimeout(mouseTimeout)

    if (_autoHideTitleBar) titlebar.setAutoHide(true)
  }

  function setAutoHideTitleBar(autoHide: boolean) {
    _autoHideTitleBar = autoHide
    titlebar.setAutoHide(autoHide)
  }

  function setContent(content: any) {
    appendChild(windowContent, content)
  }

  function _resizeElems(elem: HTMLElement, events: ResizeEvents): IResizeHandle {
    let resizeHandlers = [
      resizeElem(elem, resizeTop, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeBottom, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeLeft, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeRight, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeTopLeftV, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeTopLeftH, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeBottomLeftV, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeBottomLeftH, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeBottomRightV, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeBottomRightH, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeTopRightV, keepAspectRatio, aspectRatio, events),
      resizeElem(elem, resizeTopRightH, keepAspectRatio, aspectRatio, events)
    ]

    function setAspectRatio(ratio: number) {
      for (let index = 0; index < resizeHandlers.length; index++) {
        resizeHandlers[index].setAspectRatio(ratio)
      }
    }

    function setKeepAspectRatio(keep: boolean) {
      for (let index = 0; index < resizeHandlers.length; index++) {
        resizeHandlers[index].setKeepAspectRatio(keep)
      }
    }

    return {
      setAspectRatio,
      setKeepAspectRatio
    }
  }

  function onResizeEnd() {
    executeListeners('resizeend')

    onDragEnd()
  }

  if (!options.disableResize) {
    resizeHanders = _resizeElems(_window, {
      onResizeStart: () => executeListeners('resizestart'),
      onResize: () => executeListeners('resize'),
      onResizeEnd
    })
  }

  document.addEventListener('mousedown', onDocumentMouseDown, false)

  function onDocumentMouseDown(e: MouseEvent) {
    const target = e.target as Node

    if (_window.contains(target)) {
      focus()
    } else {
      blur()
    }
  }

  function onMinimizeButtonClick() {
    hide()
  }

  function _onMinimize() {
    executeListeners('minimize')
  }

  function _onMaximize() {
    executeListeners('maximize')
  }

  function _onRestore() {
    void _window.offsetWidth

    if (!maximized) {
      _window.classList.remove('window-maximized')
    }

    executeListeners('restore')
  }

  function onMaximizeButtonClick() {
    toggleMaximize()
  }

  dragElement(_window, titlebar.titleElem, {
    onDragStart: () => executeListeners('dragstart'),
    onDrag,
    onDragEnd
  })

  function onDrag(cordinate: Cordinate) {
    setTimeout(() => {
      if (maximized) {
        const leftDelta = Math.round(cordinate.x / window.innerWidth * lastBounds.width)
        const left = cordinate.x - leftDelta

        setBounds({ ...lastBounds, top: 0, left })
        maximized = false
        titlebar.setMaximize(maximized)
        _window.classList.remove('window-maximized')
      }

    }, 0)

    dragTop = cordinate.y <= 0

    executeListeners('drag', cordinate)
  }

  function onRestoreDown() {
    _window.classList.add('window-restore-down')
    setTimeout(() => {
      _window.classList.remove('window-restore-down')
    }, 100)

  }

  function onDragEnd() {
    if (!maximized) {
      if (dragTop && !options.disableMaximize) {
        toggleMaximize()

        dragTop = false
      } else {
        if (_window.offsetTop < 0) {
          _window.style.top = 0 + 'px';
        }
        if (window.innerHeight - _window.offsetTop < (taskbarHeight + titlebarHeight)) {
          _window.style.top = (window.innerHeight - (taskbarHeight + titlebarHeight)) + 'px';
        }
        if (_window.offsetLeft + _window.offsetWidth < 30) {
          _window.style.left = (-100) + 'px';
        }
        if (window.innerWidth - _window.offsetLeft < 30) {
          _window.style.left = (window.innerWidth - 100) + 'px';
        }
      }
    }

    executeListeners('dragend')
  }

  function maximize() {
    if (!options.disableMaximize) {
      setBounds({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight - taskbarHeight })
      _window.classList.add('window-maximized')
      _onMaximize()
    }
  }

  function unMaximize() {
    if (!options.disableMaximize) {
      setBounds(lastBounds)
      _window.classList.remove('window-maximized')
      onRestoreDown()
    }
  }

  function toggleMaximize() {
    if (!options.disableMaximize) {
      maximized = !maximized

      if (maximized) {
        lastBounds = getBounds()

        maximize()
      } else {
        unMaximize()
      }

      titlebar.setMaximize(maximized)
    }
  }

  function onDoubleClick() {
    toggleMaximize()
  }

  function setBounds(bounds: WindowBounds) {
    _top = bounds.top
    _left = bounds.left
    _width = bounds.width
    _height = bounds.height

    _window.style.top = bounds.top + 'px'
    _window.style.left = bounds.left + 'px'
    _window.style.width = bounds.width + 'px'
    _window.style.height = bounds.height + 'px'

    if (!options.disableResize) resizeHanders.setAspectRatio(_width / _height)
  }

  function getBounds(): WindowBounds {
    const bounds = _window.getBoundingClientRect()

    return {
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height
    }
  }

  function setSize(size: Size) {
    _width = size.width
    _height = size.height

    _window.style.width = size.width + 'px'
    _window.style.height = size.height + 'px'

    if (!options.disableResize) resizeHanders.setAspectRatio(_width / _height)
  }

  function setZIndex() {
    _window.style.zIndex = zIndex.toString()
  }

  function decrementZIndex() {
    zIndex -= 1
    setZIndex()
  }

  function restoreZIndex() {
    zIndex = maxZIndex
    setZIndex()
  }

  function removeTopView() {
    _window.classList.remove('top-view')
  }

  function focus() {
    _window.focus()

    _window.classList.add('focus')
    removeTopView()

    if (!focused) {
      WindowManager.focus(windowInfo.name, id, windowInfo)
    }

    focused = true

    Taskbar.setActiveWindow(windowInfo.name, id)

    executeListeners('focus')
  }

  function blur() {
    focused = false
    _window.classList.remove('focus')

    WindowManager.blur(windowInfo)

    Taskbar.removeActiveWindow(windowInfo.name, id)

    executeListeners('blur')
  }

  function makeTransparent() {
    _window.classList.add('transparent')
    isTransparent = true
  }

  function removeTransparent() {
    _window.classList.remove('transparent')
    isTransparent = false
  }

  function toggleTransprent() {
    isTransparent ? removeTransparent() : makeTransparent()
  }

  function toggleFullscreen() {
    isFullScreen = !isFullScreen

    if (isFullScreen) {
      lastBounds = getBounds()

      setBounds({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      })

      _window.classList.add('fullscreen')

      titlebar.setVisible(false)
    } else {
      setBounds(lastBounds)

      titlebar.setVisible(true)

      _window.classList.remove('fullscreen')
    }

    executeListeners('fullscreen', isFullScreen)
  }

  function isMaximized() {
    return maximized
  }

  function onShowEnd() {
    _window.classList.remove('show')
    _window.removeEventListener('animationend', onShowEnd, false)
  }

  function show() {
    _window.classList.remove('minimized')
    removeTopView()

    if (minimized) {
      _window.classList.add('window-restored')
      _window.style.transform = 'translate3d(0px,0px,0px)'

      setTimeout(() => {
        _window.classList.remove('window-restored')
        _window.style.removeProperty('transform')
      }, 300)
    } else {
      if (!isShow) {
        _window.classList.add('show')
        _window.addEventListener('animationend', onShowEnd, false)
      }
    }

    isShow = true
    minimized = false

    restoreZIndex()

    if (maximized) {
      maximize()
    }

    WindowManager.show(windowInfo)

    _onRestore()
  }

  function hide() {
    removeTopView()

    const taskbarItemBounds = Taskbar.getAppItemBounds(options.name)

    _window.classList.remove('window-restored')
    _window.classList.remove('show')
    _window.classList.remove('focus')
    _window.classList.add('minimized')

    const bounds = getBounds()

    setTimeout(() => {
      _window.style.transform = `translate3d(${taskbarItemBounds.left - bounds.left}px, ${taskbarItemBounds.top}px, 0) scale(0.2)`
    }, 0)

    isShow = false
    focused = false
    minimized = true

    WindowManager.minimize(options.name, id)

    Taskbar.removeActiveWindow(options.name, id)

    _onMinimize()
  }

  function toggleShow() {
    if (isShow) {
      hide()
    } else {
      show()
    }
  }

  function onCloseButtonClick() {
    close()
  }

  function close() {
    document.removeEventListener('mousedown', onDocumentMouseDown, false)

    _window.className = 'window closing'

    _window.addEventListener('animationend', () => {
      titlebar.element.remove()
      _window.remove()

      _window = undefined

      WindowManager.removeWindow(options.name, id)

      executeListeners('close')
    })
  }

  function isVisible() {
    return isShow
  }

  function isFocused() {
    return focused
  }

  function setTitle(text: string) {
    title = text

    titlebar.setTitle(text)
  }

  function getTitle() {
    return title
  }

  function setPosition(position: Position) {
    _window.style.top = position.top + 'px'
    _window.style.left = position.left + 'px'
  }

  function makeCenter() {
    let _top = Math.round((window.innerHeight - _height - taskbarHeight) / 2)
    let _left = Math.round((window.innerWidth - _width) / 2)

    setPosition({ top: _top, left: _left })
  }

  windowInfo = {
    id,
    name: options.name,
    element: _window,
    setContent,
    show,
    hide,
    titlebar,
    setAutoHideTitleBar,
    setIcon: titlebar.setIcon,
    setTitle,
    getTitle,
    setMaximize: titlebar.setMaximize,
    toggleMaximize,
    maximize,
    decrementZIndex,
    restoreZIndex,
    focus,
    blur,
    makeTransparent,
    removeTransparent,
    toggleTransprent,
    toggleFullscreen,
    isMaximized,
    close,
    toggleShow,
    isVisible,
    isFocused,
    setBounds,
    setSize,
    makeCenter,
    addEventListener,
    executeListeners
  }

  if (typeof options.content === 'function') {
    setContent(options.content(windowInfo))
  }

  WindowManager.addWindow(options.name, id, windowInfo)

  show()
  focus()

  return windowInfo
}
