import createElement from "../../createElement";
import getLocale from "../../locale/locale";
import { closeIcon, maximizeDownIcon, maximizeIcon, minimizeIcon } from "./icon";

export interface TitleBarButtonsEvents {
  onMinimizeButtonClick?: () => void,
  onMaximizeButtonClick?: () => void,
  onCloseButtonClick?: () => void
}

interface TitleBarButtonsOptions {
  isMaximized?: boolean
  disableMaximize?: boolean
}

export default function TitleBarButtons(options: TitleBarButtonsOptions, events: TitleBarButtonsEvents) {
  const locale = getLocale('en-us')
  // const locale = getLocale('vi-vn')

  let maximizeState = getMaximizeState(options.isMaximized)

  let maximizeButton = createElement('div', {
    title: maximizeState.title,
    className: 'window-titlebar-button window-titlebar-maximize-button flex items-center content-center' + (options.disableMaximize ? ' disabled' : ''),
    innerHTML: maximizeState.icon,
    onclick: events.onMaximizeButtonClick
  })

  let buttons = createElement('div', {
    className: 'window-titlebar-buttons flex items-center',
  },
    [
      createElement('div', {
        title: locale.window.titlebar.buttons.minimize,
        className: 'window-titlebar-button window-titlebar-minimize-button flex items-center content-center',
        innerHTML: minimizeIcon,
        onclick: events.onMinimizeButtonClick
      }),
      maximizeButton,
      createElement('div', {
        title: locale.window.titlebar.buttons.close,
        className: 'window-titlebar-button window-titlebar-close-button flex items-center content-center',
        innerHTML: closeIcon,
        onclick: events.onCloseButtonClick
      }),
    ]
  )

  function setMaximize(maximized?: boolean) {
    let maximizeState = getMaximizeState(maximized)

    maximizeButton.title = maximizeState.title

    maximizeButton.innerHTML = maximized ? maximizeIcon : maximizeDownIcon
  }

  function getMaximizeState(maximized?: boolean) {
    return {
      title: maximized ? locale.window.titlebar.buttons.maximize : locale.window.titlebar.buttons.maximizeDown,
      icon: maximized ? maximizeIcon : maximizeDownIcon
    }
  }

  return {
    element: buttons,
    setMaximize
  }
}
