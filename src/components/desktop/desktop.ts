import { AppInfo } from "../../apps/appInfo";
import { FileMapping } from "../../apps/fileMapping";
import createElement, { appendChild, setStyle } from "../../createElement";
import { IWallpaerImageInfo } from "../../data/wallpapers";
import { triggerEvent } from "../../event";
import eventNames from "../../eventNames";
import { WindowBounds } from "../../interfaces/window";
import { ProcessInfo, startProcess } from "../../proceduce";
import { appStore } from "../../store";
import { getExt, getFileName } from "../../utils";
import { setBackgroundImageStyle } from "../../utils/common";
import { taskbarHeight } from "../constant";
import ContextMenu from "../contextMenu/menu";
import screenInfo from "../screenInfo";
import { getDesktopContextMenuItems } from "./contextMenuItems";

interface Desktop {
  element: HTMLDivElement
  setBackgroundImage(imageInfo: IWallpaerImageInfo, temp?: boolean): void
  setBackgroundStyle(style: string): void
  showShape(position: string, winBound: WindowBounds): void
  removeShape(): void
  showDesktopIcons(show: boolean): void
}

function DesktopItems() {
  let selectedItems: Array<Element> = []
  let notSelectedItems: Array<Element> = []

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

  function onmousedown(_e: MouseEvent) {
    // const target = e.currentTarget as Element
    // const isSelected = selectedItems.includes(target)


  }

  const desktopItemsElem = createElement('div', {
    className: 'desktop-app-items absolute top flex flex-col flex-wrap'
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
        ondblclick: onDesktopItemDblClick.bind(null, currentAppInfo),
        onmousedown,
        onclick: e => {
          const target = e.currentTarget as Element
          if (!e.shiftKey) {
            removeSelection()
          }
          target.classList.add('desktop-app-item-selected')
          selectedItems.push(target)
        }
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

  function selectItems(position: { x1: number, x2: number, y1: number, y2: number }, shiftKey: boolean = false) {
    const items = Array.from(desktopItemsElem.children)

    items.forEach((item: Element) => {
      const itemRect = item.getBoundingClientRect()

      if (itemRect.left + itemRect.width < position.x1
        || itemRect.left > position.x2
        || itemRect.top + itemRect.height < position.y1
        || itemRect.top > position.y2
      ) {
        if (!shiftKey) {
          item.classList.remove('desktop-app-item-selected')
        }
      } else {
        item.classList.add('desktop-app-item-selected')
      }
    })
  }

  function getItems() {
    const items = Array.from(desktopItemsElem.children)

    selectedItems = items.filter((item: Element) => item.classList.contains('desktop-app-item-selected'))

    notSelectedItems = items.filter((item: Element) => !item.classList.contains('desktop-app-item-selected'))

    return {
      items,
      selectedItems,
      notSelectedItems
    }
  }

  function removeSelection() {
    selectedItems.forEach((item: Element) => {
      item.classList.remove('desktop-app-item-selected')
    })
    selectedItems = []
  }

  function setShowDesktopIcons(show: boolean) {
    desktopItemsElem.classList.toggle('hidden', !show)
  }

  function toggleDesktopIcons() {
    const { showDesktopIcons } = appStore.getState('showDesktopIcons')

    setShowDesktopIcons(!showDesktopIcons)
    appStore.setState({ showDesktopIcons: !showDesktopIcons })
  }

  return {
    element: desktopItemsElem,
    selectItems,
    getItems,
    removeSelection,
    setShowDesktopIcons,
    toggleDesktopIcons
  }
}

function Desktop(): Desktop {
  const { backgroundImageStyle, showDesktopIcons } = appStore.getState(['backgroundImageStyle', 'showDesktopIcons'])

  const desktopItems = DesktopItems()

  function onDesktopContextMenu(e: MouseEvent) {
    e.preventDefault()

    ContextMenu({ top: e.y, left: e.x }, e.currentTarget as HTMLElement, getDesktopContextMenuItems({
      onShowDesktopIconsClick: desktopItems.toggleDesktopIcons
    }))
  }

  let shapeElem = createElement('div', {
    className: 'desktop-shape-presentation'
  })

  let selectionElem = createElement('div', {
    className: 'desktop-selection-presentation'
  })

  let desktop = createElement('div', {
    className: 'desktop fade-in',
  },
    [
      createElement('div', {
        className: 'desktop-selection',
        oncontextmenu: onDesktopContextMenu,
        onmousedown
      }),
      selectionElem
    ]
  )

  let isMouseDown = false
  let firstMouseDownPos: { x: number, y: number } = null

  function onmousedown(e: MouseEvent) {
    const state = appStore.getState('showDesktopIcons')

    if (!state.showDesktopIcons) return

    if (!e.shiftKey) {
      desktopItems.removeSelection()
    }

    if (e.button === 0) {
      isMouseDown = true
      firstMouseDownPos = { x: e.x, y: e.y }

      document.onmousemove = onmousemove
      document.onmouseup = onmouseup
    }
  }

  function onmousemove(e: MouseEvent) {
    if (!isMouseDown || (Math.abs(e.x - firstMouseDownPos.x) < 2 && Math.abs(e.y - firstMouseDownPos.y) < 2)) {
      return
    }

    let top = 0,
      left = 0,
      width = 0,
      height = 0

    if (e.x > firstMouseDownPos.x) {
      left = firstMouseDownPos.x
      width = e.x - firstMouseDownPos.x
    } else {
      left = e.x
      width = firstMouseDownPos.x - e.x
    }

    if (e.y > firstMouseDownPos.y) {
      top = firstMouseDownPos.y
      height = e.y - firstMouseDownPos.y
    }
    else {
      top = e.y
      height = firstMouseDownPos.y - e.y
    }

    setStyle(selectionElem, {
      visibility: 'visible',
      top: top + 'px',
      left: left + 'px',
      width: width + 'px',
      height: height + 'px'
    })

    desktopItems.selectItems({ x1: left, x2: left + width, y1: top, y2: top + height }, e.shiftKey)
  }

  function onmouseup() {
    isMouseDown = false

    setStyle(selectionElem, {
      visibility: 'hidden',
      width: '0px',
      height: '0px'
    })

    desktopItems.getItems()
  }

  let showTimeout: NodeJS.Timeout
  let isShow = false

  setBackgroundStyle(backgroundImageStyle)

  appendChild(document.body, desktop)
  appendChild(document.body, shapeElem)

  setTimeout(() => {
    appendChild(desktop, desktopItems.element)

    desktopItems.setShowDesktopIcons(showDesktopIcons)
  }, 500)

  function setBackgroundImage(imageInfo: IWallpaerImageInfo, isTemp?: boolean) {
    const image = new Image()
    image.onload = () => {
      desktop.style.backgroundImage = `url("${imageInfo.path}")`

      triggerEvent(eventNames.backgroundImageChange, imageInfo.path)
    }
    image.src = imageInfo.path

    if (!isTemp) {
      appStore.setState({ backgroundImage: imageInfo })
    }
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

  function setBackgroundStyle(style: string) {
    setBackgroundImageStyle(desktop, style)
  }

  return {
    element: desktop,
    setBackgroundImage,
    setBackgroundStyle,
    showShape,
    removeShape,
    showDesktopIcons: desktopItems.setShowDesktopIcons,
  }
}

const desktop = Desktop()

export default desktop
