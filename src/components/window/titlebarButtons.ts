import createElement from "../../createElement";
import getLocale from "../../locale/locale";

const minimizeIcon = `
<svg aria-hidden="true" version="1.1" width="10" height="10">
<path d="M 0,5 10,5 10,6 0,6 Z"></path>
</svg>
`

const maximizeIcon = `
<svg aria-hidden="true" version="1.1" width="10" height="10">
<path d="m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"></path>
</svg>
`

const maximizeDownIcon = `
<svg aria-hidden="true" version="1.1" width="10" height="10">
<path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path>
</svg>
`

const closeIcon = `
<svg aria-hidden="true" version="1.1" width="10" height="10">
<path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path>
</svg>
`

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
