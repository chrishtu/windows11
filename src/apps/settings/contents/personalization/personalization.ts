import CheckBox from "../../../../components/CheckBox";
import desktop from "../../../../components/desktop/desktop";
import DesktopScreen from "../../../../components/DesktopScreen";
import createElement from "../../../../createElement";
import wallpapers from "../../../../data/wallpapers";
import { listenEvent, removeEvent } from "../../../../event";
import eventNames from "../../../../eventNames";
import { getState } from "../../../../store";
import { toggleTheme, toggleTransparency } from "../../../../utils";
import type { ISettingContent } from "../../common";
// import TestContent from "../testContent";

export default function Personalization(): ISettingContent {
  const settingId = 'settings'
  
  // const items = {
  //   background: {
  //     icon: '',
  //     text: 'Background',
  //     desc: 'Change desktop background image',
  //     content: TestContent
  //   },
  //   colors: {
  //     icon: '',
  //     text: 'Colors',
  //     desc: 'Accent color, transparency, dark theme',
  //     content: TestContent
  //   },
  //   lockScreen: {
  //     icon: '',
  //     text: 'Lock Screen',
  //     desc: 'Background image, notifications',
  //     content: TestContent
  //   },
  //   theme: {
  //     icon: '',
  //     text: 'Themes',
  //     desc: 'Customize window theme',
  //     content: TestContent
  //   },
  //   font: {
  //     icon: '',
  //     text: 'Fonts',
  //     desc: 'Browser installed fonts or install new fonts',
  //     content: TestContent
  //   },
  //   start: {
  //     icon: '',
  //     text: 'Start',
  //     desc: 'Pinned apps, remommended',
  //     content: TestContent
  //   },
  //   taskbar: {
  //     icon: '',
  //     text: 'Taskbar',
  //     desc: 'Taskbar arrangement, position',
  //     content: TestContent
  //   }
  // }

  let { darktheme, transparency, nightlight } = getState(['darktheme', 'transparency', 'nightlight'])

  const darkThemeCheckbox = CheckBox('Dark Theme', darktheme, _toggleTheme)
  const transparencyCheckbox = CheckBox('Transparency', transparency, toggleTransparency)
  const nightlightCheckbox = CheckBox('Night Light', nightlight, DesktopScreen.toogleNightLight)


  let element = createElement('div', {},
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

  function changeBackGround(path: string) {
    desktop.setBackgroundImage(path)
  }

  function _toggleTheme() {
    toggleTheme(dark => { darktheme = dark })
  }

  listenEvent(eventNames.themeChange, settingId, isDark => {
    darktheme = isDark
    darkThemeCheckbox.setChecked(isDark)
  })

  listenEvent(eventNames.transparentChange, settingId, enabled => {
    transparency = enabled
    transparencyCheckbox.setChecked(enabled)
  })

  listenEvent(eventNames.nightLightChange, settingId, enabled => {
    nightlight = enabled
    nightlightCheckbox.setChecked(enabled)
  })

  function dispose() {
    element.remove()
    element = null

    removeEvent(eventNames.themeChange, settingId)
    removeEvent(eventNames.transparentChange, settingId)
    removeEvent(eventNames.nightLightChange, settingId)
  }

  return {
    element,
    dispose
  }
}
