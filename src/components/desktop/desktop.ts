import { AppInfo } from "../../apps/appInfo";
import { FileMapping } from "../../apps/fileMapping";
import createElement, { appendChild } from "../../createElement";
import { ProcessInfo, startProcess } from "../../proceduce";
import { setState } from "../../store";
import { getExt, getFileName } from "../../utils";
import { taskbarHeight } from "../constant";

interface Desktop {
  element: HTMLDivElement,
  setBackgroundImage: (path: string) => void
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
  let desktop = createElement('div', {
    className: 'desktop fade-in'
  })

  appendChild(document.body, desktop)

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
      }
      image.src = path
    }, 250)

    setState({ backgroundImage: path })
  }

  return {
    element: desktop,
    setBackgroundImage
  }
}

const desktop = Desktop()

export default desktop
