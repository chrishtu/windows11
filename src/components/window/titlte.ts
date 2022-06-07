import createElement from "../../createElement";

interface WindowTitleTextOptions {
  title: string
  disableMaximize?: boolean
}

export default function Title(options: WindowTitleTextOptions, onDoubleClick?: Function, onContextMenu?: Function, onFocus?: Function) {
  let textElem: HTMLDivElement

  let title = createElement('div', {
    tabIndex: -1,
    className: 'window-title flex items-center',
    onfocus: onFocus,
    oncontextmenu: onContextMenu,
    ondblclick: !options.disableMaximize ? onDoubleClick : null
  },
    textElem = createElement('div', {
      className: 'text-ellipsis'
    }, options.title)
  )

  function setTitle(text: string) {
    textElem.textContent = text
  }

  return {
    element: title,
    setTitle
  }
}
