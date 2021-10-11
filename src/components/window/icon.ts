import createElement from "../../createElement"

interface WindowIconImage {
  backgroundImage?: string
}

export default function WindowIcon(path?:string) {
  const style: WindowIconImage = {}

  if(path) {
    style.backgroundImage = `url("${path}")`
  }

  let windowIcon = createElement('div', {
    className: 'window-titlebar-icon flex content-center items-center flex-shrink-0',
    style: style
  })

  function setWindowIcon(path?: string) {
    if(path) {
      windowIcon.style.backgroundImage = `url("${path}")`
    }
  }

  return {
    element: windowIcon,
    setWindowIcon
  }
}
