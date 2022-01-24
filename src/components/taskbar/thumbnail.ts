import createElement, { appendChilds } from "../../createElement";
import { IWindow, WindowBounds } from "../../interfaces/window";
import { taskbarHeight, titlebarHeight } from "../constant";
import { triggerEvent } from "../../event";
import { closeIcon } from "../icons/icons";
import eventNames from "../../eventNames";

let thumbnailElement: HTMLDivElement | undefined
let thumbnailHideTimeout: NodeJS.Timeout

export function getThumbnailElement() {
  return thumbnailElement
}

export function TaskBarAppThumbnails(instances: Array<IWindow>, iconBounds: WindowBounds) {

  if (thumbnailElement instanceof HTMLDivElement) {
    thumbnailElement.innerHTML = ''

    init()

    return
  }

  function getThumbnails() {
    return instances.map(win => {
      const winWidth = parseInt(win.element.style.width)
      const winHeight = parseInt(win.element.style.height)

      const thumbnail = win.element.cloneNode(true) as HTMLDivElement
      thumbnail.classList.add('taskbar-app-thumbnail-content')

      let thumbnailScale = 120 / winHeight

      if (thumbnailScale * winWidth > 200) {
        thumbnailScale = 200 / winWidth
      }

      if (thumbnail.className.indexOf('fluid') === -1) {
        thumbnail.style.height = (winHeight - titlebarHeight) + 'px'
      }

      thumbnail.style.transform = `scale(${thumbnailScale})`

      return {
        container: createElement('div', {
          title: win.getTitle(),
          className: 'taskbar-app-thumbnail' + (win.isFocused() ? ' active' : ''),
          onmouseover: onmouseover.bind(null, win.id),
          onmouseout: onmouseout.bind(null, win.id)
        },
          [
            createElement('div', {
              className: 'taskbar-app-thumbnail-inner relative w-full h-full fade-in',
              onclick: onThumbnailClick.bind(null, win)
            },
              [
                createElement('div', {
                  className: 'taskbar-app-thumbnail-heading flex items-center'
                },
                  [
                    createElement('div', {
                      className: 'taskbar-app-thumbnail-icon image-cover flex-shrink-0',
                      style: {
                        backgroundImage: `url("${win.icon}")`
                      }
                    }),
                    createElement('div', {
                      className: 'taskbar-app-thumbnail-title'
                    },
                      createElement('div', {
                        className: 'text-ellipsis'
                      }, win.getTitle())
                    ),
                    createElement('div', {
                      title: 'Close',
                      className: 'taskbar-app-thumbnail-close-button flex content-center items-center flex-shrink-0',
                      innerHTML: closeIcon,
                      onclick: () => {
                        win.close()
                        closeThumbnails()
                        restoreView()
                      }
                    })
                  ]
                ),
                createElement('div', {
                  className: 'taskbar-app-thumbnail-container'
                }, thumbnail)
              ]
            )
          ]
        ),
        thumbnail
      }
    })
  }

  function onmouseover(id: string) {
    //To Window Manager
    triggerEvent(eventNames.viewWindow, { id })

    //To Popup
    triggerEvent(eventNames.hidePopup)
  }

  function onmouseout(id: string) {
    restoreView(id)

    //To Popup
    triggerEvent(eventNames.showPopup)
  }

  function restoreView(id?: string) {
    //To Window Manager
    triggerEvent(eventNames.restoreView, { id })
  }

  function onThumbnailClick(win: IWindow) {
    win.show()

    win.focus()

    closeThumbnails()

    restoreView()
  }

  function setBounds(height: number) {
    if (thumbnailElement) {
      const thumbnailBounds = thumbnailElement.getBoundingClientRect()
      const left = Math.round(iconBounds.left + iconBounds.width / 2 - thumbnailBounds.width / 2)

      thumbnailElement.style.bottom = (taskbarHeight + 10) + 'px'
      thumbnailElement.style.left = left + 'px'

      thumbnailElement.style.height = (height + 62) + 'px'
    }
  }

  function init() {
    const thumbnails = getThumbnails()

    if (thumbnailElement) {
      appendChilds(thumbnailElement, thumbnails.map(t => t.container))
    }

    let thumbnailHeight = 0

    thumbnails.forEach(t => {
      const bounds = t.thumbnail.getBoundingClientRect()

      t.container.style.width = bounds.width + 'px'
      t.container.style.height = (bounds.height + 32) + 'px'

      if (bounds.height > thumbnailHeight) {
        thumbnailHeight = bounds.height
      }
    })

    setBounds(thumbnailHeight)
  }

  thumbnailElement = createElement('div', {
    className: 'taskbar-app-thumbnails flex',
    onmouseover: preventHidden,
    onmouseleave: hideThumbnail
  })

  document.body.appendChild(thumbnailElement)

  init()
}

export function preventHidden() {
  if (thumbnailHideTimeout) clearTimeout(thumbnailHideTimeout)
}

export function hideThumbnail() {
  if (thumbnailHideTimeout) clearTimeout(thumbnailHideTimeout)

  thumbnailHideTimeout = setTimeout(() => {
    closeThumbnails()
  }, 500)
}

export function closeThumbnails() {
  thumbnailElement?.remove()
  thumbnailElement = undefined
}
