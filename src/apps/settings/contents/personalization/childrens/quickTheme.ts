import createElement from "../../../../../createElement"
import { getStates, ITheme, setState } from "../../../../../store"

export default function QuickTheme() {
  const { themes, currentThemeIndex } = getStates()

  let element = createElement('div', {
    className: 'setting-quick-theme flex'
  },
    themes.map((theme: ITheme, index: number) => {
      return createElement('div', {
        className: 'setting-quick-theme-item' + (index === currentThemeIndex ? ' active selected-item' : ''),
        onclick: () => {
          if (index === currentThemeIndex) return

          setState({
            currentThemeIndex: index
          })
        },
      },
        createElement('div', {
          className: 'setting-quick-theme-item-inner'
        },
          [
            createElement('div', {
              className: 'setting-quick-theme-item-image',
              style: {
                backgroundImage: `url("${theme.background.image.thumbnailPath}")`
              },
            }),
            createElement('div', {
              className: 'setting-quick-theme-item-color flex items-end content-center',
              style: {
                backgroundColor: theme.dark ? '#333' : '#f8f8f8'
              }
            },
              createElement('div', {
                className: 'setting-quick-theme-item-color-accent',
                style: {
                  backgroundColor: theme.color.accent
                }
              })
            )
          ]
        )
      )
    })
  )

  return element
}
