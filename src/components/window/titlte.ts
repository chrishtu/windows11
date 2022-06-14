import createElement from "../../createElement";
import { isNotNullOrUndifined } from "../../utils/common";

interface WindowTitleTextOptions {
  title: string
  disableMaximize?: boolean,
  content?: any
}

export default function Title(options: WindowTitleTextOptions, onDoubleClick?: Function, onContextMenu?: Function, onFocus?: Function) {
  let textElem: HTMLDivElement,
    titlebarDragElement: HTMLDivElement

  let title = createElement('div', {
    tabIndex: -1,
    className: 'window-title w-full h-full',
    onfocus: onFocus,
    oncontextmenu: onContextMenu,
    ondblclick: !options.disableMaximize ? onDoubleClick : null
  },
    [
      titlebarDragElement = createElement('div', {
        className: 'absolute top left w-full h-full'
      }),
      createElement('div', {
        className: 'window-title-inner w-full h-full flex items-center'
      },
        [
          createElement('div', {
            className: 'window-title-text h-full flex items-center'
          },
            textElem = createElement('div', {
              title: options.title,
              className: 'text-ellipsis'
            }, options.title)
          ),
          isNotNullOrUndifined(options.content) ?
            createElement('div', {
              oncontextmenu: e => {
                e.preventDefault()
                e.stopPropagation()
              },
              className: 'window-titlebar-content'
            }, options.content) : null,
        ]
      )
    ]
  )

  function setTitle(text: string) {
    textElem.title = text
    textElem.textContent = text
  }

  return {
    element: title,
    titlebarDragElement,
    setTitle
  }
}
