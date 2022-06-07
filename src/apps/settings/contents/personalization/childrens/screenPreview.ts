import createElement from "../../../../../createElement"
import { getState } from "../../../../../store"
import { setBackgroundImageStyle } from "../../../../../utils/common"

interface IScreenPreviewProps {
  backgroundImage: string
}

export default function ScreenPreview(props: IScreenPreviewProps) {
  const { backgroundImageStyle } = getState('backgroundImageStyle')
  
  let element = createElement('div', {
    className: 'settings-screen-preview',
    style: {
      backgroundImage: `url("${props.backgroundImage}")`
    }
  },
    createElement('div', {
      className: 'settings-screen-preview-inner'
    },
      [
        createElement('div', {
          className: 'settings-screen-preview-taskbar'
        }),
        createElement('div', {
          className: 'settings-screen-preview-card'
        },
          [
            createElement('div', {
              className: 'settings-screen-preview-card-placeholder'
            },
              [
                createElement('div', {
                  className: 'settings-screen-preview-card-placeholder-line'
                }),
                createElement('div', {
                  className: 'settings-screen-preview-card-placeholder-line'
                }),
                createElement('div', {
                  className: 'settings-screen-preview-card-placeholder-line'
                }),
                createElement('div', {
                  className: 'settings-screen-preview-card-placeholder-line half'
                }),
              ]
            ),
            createElement('div', {
              className: 'settings-screen-preview-card-button'
            })
          ]
        ),
      ]
    )
  )

  setBackgroundImageStyle(element, backgroundImageStyle)

  function changeBackground(path: string) {
    element.style.backgroundImage = `url("${path}")`
  }

  function setBackgroundStyle(style: string) {
    setBackgroundImageStyle(element, style)
  }

  return {
    element,
    changeBackground,
    setBackgroundStyle
  }
}
