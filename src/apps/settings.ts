import CheckBox from "../components/CheckBox";
import Window from "../components/window/window";
import createElement from "../createElement";
import { IWindow } from "../interfaces/window";
import { IAppInfo } from "./appInfo";
import desktop from "../components/desktop/desktop";
import { getState } from "../store";
import wallpapers from "../data/wallpapers";
import { toggleTransparency, toggleTheme } from "../utils";
import { listenEvent } from "../event";
import eventNames from "../eventNames";
import DesktopScreen from "../components/DesktopScreen";

const Settings = (appInfo: IAppInfo, _args?: any) => {
  let { darktheme, transparency, nightlight } = getState(['darktheme', 'transparency', 'nightlight'])

  const settings = function (_window: IWindow) {
    _window.addEventListener('secondInstance', (_args: any) => {
      if (!_window.isVisible()) {
        _window.show()
      }

      _window.focus()
    })

    const darkThemeCheckbox = CheckBox('Dark Theme', darktheme, _toggleTheme)

    listenEvent(eventNames.themeChange, 'settings', isDark => {
      darktheme = isDark
      darkThemeCheckbox.setChecked(isDark)
    })

    const transparencyCheckbox = CheckBox('Transparency', transparency, toggleTransparency)

    listenEvent(eventNames.transparentChange, 'settings', enabled => {
      transparency = enabled
      transparencyCheckbox.setChecked(enabled)
    })

    const nightlightCheckbox = CheckBox('Night Light', nightlight, DesktopScreen.toogleNightLight)

    listenEvent(eventNames.nightLightChange, 'settings', enabled => {
      nightlight = enabled
      nightlightCheckbox.setChecked(enabled)
    })

    return createElement('div', {
      className: 'w-full h-full p-0-20 scrollable'
    },
      createElement('div', {
        className: 'setting-inner'
      },
        [
          darkThemeCheckbox.element,
          transparencyCheckbox.element,
          nightlightCheckbox.element,
          createElement('div', {
            className: 'w-full divider divider-horizontal',
            style: {
              height: '1px',
              backgroundColor: 'var(--border-color)'
            }
          }),
          createElement('div', {
            className: 'w-full background-selector'
          },
            [
              createElement('label', {}, 'Background Image'),
              createElement('div', {
                className: 'w-full background-items'
              },
                wallpapers.map(image => createElement('div', {
                  className: 'background-item'
                },
                  createElement('div', {
                    className: 'background-item-inner w-full h-full'
                  },
                    createElement('div', {
                      className: 'background-item-image w-full h-full',
                      style: {
                        backgroundImage: `url("${image.thumbnailPath}")`
                      },
                      onclick: changeBackGround.bind(null, image.path)
                    })
                  )
                ))
              )
            ]
          )
        ]
      )
    )
  }

  function _toggleTheme() {
    toggleTheme(dark => { darktheme = dark })
  }

  function changeBackGround(path: string) {
    desktop.setBackgroundImage(path)
  }

  Window({
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    singleInstance: true,
    top: 200,
    left: 300,
    width: 800,
    height: 520,
    center: true,
    content: settings
  })
}

export default Settings
