import { AppInfo } from "../../apps/appInfo";
import { FileMapping } from "../../apps/fileMapping";
import createElement, { appendChild, setStyle } from "../../createElement";
import { triggerEvent } from "../../event";
import eventNames from "../../eventNames";
import { WindowBounds } from "../../interfaces/window";
import { ProcessInfo, startProcess } from "../../proceduce";
import { setState } from "../../store";
import { getExt, getFileName } from "../../utils";
import { taskbarHeight } from "../constant";
import screenInfo from "../screenInfo";

interface Desktop {
  element: HTMLDivElement
  setBackgroundImage(path: string): void
  showShape(position: string, winBound: WindowBounds): void
  removeShape(): void
}

function DesktopItems() {
  const appItems: Array<ProcessInfo> = [
    {
      icon: 'imgs/icons/Trash Empty.png',
      name: 'explorer',
      productName: 'Recycle Bin',
      args: '/trash',
      type: "app"
    },
    {
      ...AppInfo.settings,
      type: "app"
    },
    {
      ...AppInfo.notepad,
      type: "app"
    },
    {
      ...AppInfo.explorer,
      type: "app"
    },
    {
      ...AppInfo.photos,
      type: "app"
    },
    {
      ...AppInfo.github,
      type: "link",
      args: 'https://github.com/chrishtu/windows11'
    },
    {
      type: "file",
      args: 'videos/The Church of a Mountain Valley Town.mp4'
    },
    {
      type: "file",
      args: 'videos/Clouds Over Rocky Mountains.mp4'
    },
    {
      type: "file",
      args: 'videos/newyork city at night.mp4'
    },
    {
      type: "file",
      args: 'videos/Area Of NewYork City At Night.mp4'
    },
    {
      type: "file",
      args: 'documents/about.txt'
    },
  ]

  function onDesktopItemDblClick(appItem: ProcessInfo) {
    startProcess(appItem)
  }

  const desktopItemsElem = createElement('div', {
    className: 'desktop-app-items fixed top w-full flex flex-col flex-wrap',
    style: {
      height: `calc(100% - ${taskbarHeight}px)`
    }
  },
    appItems.map((currentAppInfo: ProcessInfo, index: number) => {
      const iconProps = Object.create(null)

      iconProps.className = 'desktop-app-item-icon'

      let itemContent: string = currentAppInfo.productName

      iconProps.style = Object.create(null)

      if (currentAppInfo.icon) {
        if (currentAppInfo.iconType === 'svg') {
          iconProps.innerHTML = currentAppInfo.icon
        } else {
          iconProps.style.backgroundImage = `url("${currentAppInfo.icon}")`
        }
      }

      if (currentAppInfo.type === 'file') {
        const fileInfo = FileMapping[getExt(currentAppInfo.args)]

        if (fileInfo.icon) {
          if (fileInfo.iconType === 'svg') {
            iconProps.innerHTML = fileInfo.icon
          } else {
            iconProps.style.backgroundImage = `url("${fileInfo.icon}")`
          }
        } else {
          iconProps.style.backgroundImage = `url("imgs/icons/Blank.png")`
        }

        itemContent = getFileName(currentAppInfo.args)
      }

      return createElement('div', {
        key: 'd-i' + index,
        className: 'desktop-app-item',
        ondblclick: onDesktopItemDblClick.bind(null, currentAppInfo)
      },
        [
          createElement('div', iconProps),
          createElement('div', {
            title: itemContent,
            className: 'desktop-app-item-label'
          },
            createElement('div', {
              className: 'text-ellipsis line-clamp-2'
            }, itemContent)
          )
        ]
      )
    })
  )

  return desktopItemsElem
}

function Desktop(): Desktop {
  let shapeElem = createElement('div', {
    className: 'desktop-shape-presentation'
  })

  let desktop = createElement('div', {
    className: 'desktop fade-in'
  })

  let showTimeout: NodeJS.Timeout
  let isShow = false

  appendChild(document.body, desktop)
  appendChild(document.body, shapeElem)

  setTimeout(() => {
    appendChild(desktop, DesktopItems())
  }, 500)

  function setBackgroundImage(path: string) {
    setTimeout(() => {
      desktop.classList.remove('fade-in')

      void desktop.offsetWidth

      const image = new Image()
      image.onload = () => {
        desktop.classList.add('fade-in')
        desktop.style.backgroundImage = `url("${path}")`

        triggerEvent(eventNames.backgroundImageChange, path)
      }
      image.src = path
    }, 250)

    setState({ backgroundImage: path })
  }

  function showShape(position: string, _winBound: WindowBounds) {
    if (showTimeout) {
      clearTimeout(showTimeout)
    }

    const halfAvailableWidth = Math.floor(screenInfo.width / 2)
    const availableHeight = screenInfo.height - taskbarHeight
    const halfAvailableHeight = Math.floor(availableHeight / 2)

    if (!isShow) {
      if (position === 'top') {
        setStyle(shapeElem, {
          top: '10px',
          left: halfAvailableWidth + 'px'
        })
      }
      else if (position === 'left') {
        setStyle(shapeElem, {
          top: halfAvailableHeight + 'px',
          left: '10px'
        })
      }
      else if (position === 'right') {
        setStyle(shapeElem, {
          top: halfAvailableHeight + 'px',
          left: screenInfo.width + 'px'
        })
      }
      else if (position === 'topLeft') {
        setStyle(shapeElem, {
          top: '10px',
          left: '10px'
        })
      }
      else if (position === 'topRight') {
        setStyle(shapeElem, {
          top: '10px',
          left: screenInfo.width + 'px',
        })
      }
      else if (position === 'bottomLeft') {
        setStyle(shapeElem, {
          top: availableHeight + 'px',
          left: '10px',
        })
      }
      else if (position === 'bottomRight') {
        setStyle(shapeElem, {
          top: availableHeight + 'px',
          left: screenInfo.width + 'px'
        })
      }

      isShow = true
    }

    showTimeout = setTimeout(() => {
      if (position === 'top') {
        setStyle(shapeElem, {
          top: '10px',
          left: '10px',
          height: (availableHeight - 20) + 'px',
          width: (screenInfo.width - 20) + 'px',
          transformOrigin: 'top'
        })
      }
      else if (position === 'left') {
        setStyle(shapeElem, {
          top: '10px',
          left: '10px',
          height: (availableHeight - 20) + 'px',
          width: (halfAvailableWidth - 10) + 'px',
          transformOrigin: 'left'
        })
      }
      else if (position === 'right') {
        setStyle(shapeElem, {
          top: '10px',
          left: halfAvailableWidth + 'px',
          height: (availableHeight - 20) + 'px',
          width: (halfAvailableWidth - 10) + 'px',
          transformOrigin: 'center right'
        })
      }
      else if (position === 'topLeft') {
        setStyle(shapeElem, {
          top: '10px',
          left: '10px',
          height: (halfAvailableHeight - 10) + 'px',
          width: (halfAvailableWidth - 10) + 'px',
          transformOrigin: 'left top'
        })
      }
      else if (position === 'topRight') {
        setStyle(shapeElem, {
          top: '10px',
          left: halfAvailableWidth + 'px',
          height: (halfAvailableHeight - 10) + 'px',
          width: (halfAvailableWidth - 10) + 'px',
          transformOrigin: 'right top'
        })
      }
      else if (position === 'bottomLeft') {
        setStyle(shapeElem, {
          top: halfAvailableHeight + 'px',
          left: '10px',
          height: (halfAvailableHeight - 10) + 'px',
          width: (halfAvailableWidth - 10) + 'px',
          transformOrigin: 'left bottom'
        })
      }
      else if (position === 'bottomRight') {
        setStyle(shapeElem, {
          top: halfAvailableHeight + 'px',
          left: halfAvailableWidth + 'px',
          height: (halfAvailableHeight - 10) + 'px',
          width: (halfAvailableWidth - 10) + 'px',
          transformOrigin: 'right bottom',
        })
      }

      shapeElem.classList.add('show')
    }, 150)
  }

  function removeShape() {
    isShow = false

    if (showTimeout) {
      clearTimeout(showTimeout)
    }

    shapeElem.classList.remove('show')
    shapeElem.style.top = '0'
    shapeElem.style.left = '0'
    shapeElem.style.width = '0'
    shapeElem.style.height = '0'
  }

  return {
    element: desktop,
    setBackgroundImage,
    showShape,
    removeShape
  }
}

const desktop = Desktop()

export default desktop
