import createElement from "../../createElement"

export const minimizeIcon = `
<svg aria-hidden="true" version="1.1" viewbox="0 0 10 10" width="10" height="10" class="svg-fill">
<path d="M 0,5 10,5 10,6 0,6 Z"></path>
</svg>
`

export const maximizeIcon = `
<svg aria-hidden="true" version="1.1" viewbox="0 0 10 10" width="10" height="10" class="svg-fill">
<path d="m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"></path>
</svg>
`

export const maximizeDownIcon = `
<svg aria-hidden="true" version="1.1" viewbox="0 0 10 10" width="10" height="10" class="svg-fill">
<path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path>
</svg>
`

export const closeIcon = `
<svg aria-hidden="true" version="1.1" viewbox="0 0 10 10" width="10" height="10" class="svg-fill">
<path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path>
</svg>
`

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
