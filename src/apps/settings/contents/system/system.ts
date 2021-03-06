import createElement from "../../../../createElement";
import { listenEvent } from "../../../../event";
import eventNames from "../../../../eventNames";
import { appStore } from "../../../../store";
import { getThumbnailFromImage, settingsInfo, SystemNavItemInfo } from "../../common";
import { SettingHelp } from "../settingHelp";
import SettingNav, { SettingNavCallback } from "./settingNav";

function SettingSystemDesktop() {
  const { backgroundImage } = appStore.getState('backgroundImage')

  let img: string

  if (backgroundImage) {
    img = getThumbnailFromImage(backgroundImage.path)
  }

  let systemBackgroundElem: HTMLDivElement

  let element = createElement('div', {
    className: 'setting-system-overall'
  },
    [
      createElement('div', {
        className: 'flex'
      },
        [
          createElement('div', {
            className: 'setting-system-desktop relative'
          },
            systemBackgroundElem = createElement('div', {
              className: 'setting-system-desktop-inner image-cover',
              style: {
                backgroundImage: `url(${img})`
              }
            })
          ),
          createElement('div', {
            className: 'setting-system-info'
          },
            [
              createElement('div', {
                className: 'setting-system-info-name'
              }, 'chrishtu-pc'),
              createElement('div', {
                className: 'setting-system-info-role'
              }, 'Administrator'),
              createElement('div', {
                className: 'setting-system-info-action'
              }, 'Rename')
            ]
          )
        ]
      ),
      createElement('div', {
        className: 'setting-system-office flex'
      },
        [
          createElement('div', {
            className: 'setting-system-office-onedrive flex'
          },
            [
              createElement('div', {
                className: 'setting-system-office-onedrive-icon flex items-center content-center'
              }),
              createElement('div', {
                className: 'setting-system-office-onedrive-info'
              },
                [
                  createElement('div', {
                    className: 'setting-system-office-onedrive-info-name'
                  }, 'OneDrive'),
                  createElement('div', {
                    className: 'setting-system-office-onedrive-info-action'
                  }, 'Manage')
                ]
              )
            ]
          )
        ]
      )
    ]
  )

  listenEvent(eventNames.backgroundImageChange, 'setting-system', path => {
    systemBackgroundElem.style.backgroundImage = `url("${getThumbnailFromImage(path)}")`
  })

  return element
}

export default function System(onNavItemClick: SettingNavCallback) {
  let navItems = settingsInfo.system.items
  let navItemsInfo: Array<SystemNavItemInfo>

  navItemsInfo = Object.keys(navItems).map(key => {
    const item = navItems[key]

    return {
      isNav: true,
      name: key,
      text: item.text,
      icon: item.icon,
      iconType: item.iconType,
      desc: item.desc,
      path: 'system/' + key
    }
  })

  let element = createElement('div', {
    className: 'setting-system flex flex-wrap'
  },
    [
      createElement('div', {
        className: 'flex-1'
      },
        createElement('div', {
          className: 'setting-system-main-content'
        },
          [
            SettingSystemDesktop(),
            SettingNav(navItemsInfo, onNavItemClick),
          ]
        )
      ),
      SettingHelp()
    ]
  )

  function dispose() {
    element.remove()
    element = null
  }

  return {
    element,
    dispose
  }
}
