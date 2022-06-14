import createElement from "../../createElement";
import { IWindowTitleBarOptions } from "../../interfaces/window";
import WindowIcon from "./icon";
import TitleBarButtons, { TitleBarButtonsEvents } from "./titlebarButtons";
import Title from "./titlte";

interface TitleBarEvents extends TitleBarButtonsEvents {
  onDoubleClick: () => void
  onVisible?(): void
  onHidden?(): void
  onContextMenu?(e?: MouseEvent | PointerEvent): void
  onTitleFocus?(): void
}

export interface ITitleBar {
  element: HTMLDivElement
  titleElem: HTMLDivElement
  titlebarDragElement: HTMLDivElement
  setIcon(): void
  setTitle(text: string): void
  setVisible(visible: boolean): void
  setMaximize(maximize: boolean): void
  setAutoHide(autoHide: boolean): void
  setPreventHide(autoHide: boolean): void
}

export default function TitleBar(options: IWindowTitleBarOptions, events: TitleBarEvents): ITitleBar {
  let windowIcon = WindowIcon(options.icon)
  let windowTitle = Title({
    title: options.title,
    disableMaximize: options.disableMaximize,
    content: options.content
  },
    events.onDoubleClick,
    events.onContextMenu,
    events.onTitleFocus
  )
  let windowButtons = TitleBarButtons(
    {
      isMaximized: options.maximized,
      disableMaximize: options.disableMaximize
    },
    {
      onMinimizeButtonClick: events.onMinimizeButtonClick,
      onMaximizeButtonClick: events.onMaximizeButtonClick,
      onCloseButtonClick: events.onCloseButtonClick,
    })

  let titlebar: HTMLDivElement
  let mouseOver: boolean = false

  titlebar = createElement('div', {
    className: 'window-titlebar flex items-center' + (options.hideIcon ? ' no-icon' : '')
  },
    [
      windowIcon.element,
      windowTitle.element,
      windowButtons.element
    ]
  )

  if (options.autoHide) {
    titlebar.addEventListener('mouseover', () => {
      mouseOver = true
    }, false)

    titlebar.addEventListener('mouseout', () => {
      mouseOver = false
    }, false)
  }

  function setAutoHide(autoHide: boolean) {
    if (autoHide) {
      titlebar.classList.remove('titlebar-fade-in')

      if (!mouseOver) {
        titlebar.classList.add('titlebar-fade-out')
        events.onHidden && events.onHidden()
      }
    } else {
      titlebar.classList.add('titlebar-fade-in')
      titlebar.classList.remove('titlebar-fade-out')
      events.onVisible && events.onVisible()
    }
  }

  function setPreventHide(hide: boolean) {
    mouseOver = hide
  }

  function setVisible(visible: boolean) {
    visible ? titlebar.classList.remove('hidden') : titlebar.classList.add('hidden')
  }

  return {
    element: titlebar,
    titleElem: windowTitle.element,
    titlebarDragElement: windowTitle.titlebarDragElement,
    setIcon: windowIcon.setWindowIcon,
    setTitle: windowTitle.setTitle,
    setMaximize: windowButtons.setMaximize,
    setVisible,
    setAutoHide,
    setPreventHide
  }
}
