import { chevronLeftIcon, chevronRightIcon, powerIcon, settingIcon } from "../components/icons/icons";
import Popup from "../components/popup/popup";
import createElement from "../createElement";
import { createWindow } from "../proceduce";
import { AppInfo, AppInfoGroup, IAppInfo } from "./appInfo";

interface StartMenuOptions {
  width?: number,
  height?: number
}

interface StartMenu {
  element: HTMLDivElement
  id: string
  show: () => void,
  hide: () => void,
  toggleShow: () => void
}

function AllApps(onBackButtonClick: Function, onAppItemClick: Function) {
  const groupApps = AppInfoGroup()

  const container = createElement('div', {
    className: 'start-menu-apps-list-container w-full h-full flex flex-col'
  },
    [
      createElement('div', {
        className: 'start-menu-apps-list-heading flex items-center flex-shrink-0'
      },
        [
          createElement('div', {
            className: 'start-menu-label',
            style: {
              paddingLeft: '20px'
            }
          }, 'All apps'),
          createElement('div', {
            className: 'start-menu-button flex content-center items-center',
            onclick: onBackButtonClick
          },
            [
              createElement('div', {
                className: 'start-menu-button-icon h-full flex content-center items-center',
                innerHTML: chevronLeftIcon
              }),
              createElement('div', {
                className: 'start-menu-button-text'
              }, 'Back')
            ]
          )
        ]
      ),
      createElement('div', {
        className: 'start-menu-apps-list w-full h-full'
      },
        Object.keys(groupApps).map((letter: string, index) => {
          return createElement('div', {
            key: 'app-item' + index,
            className: 'start-menu-apps-list-section'
          },
            [
              createElement('div', {
                className: 'start-menu-apps-list-label flex items-center'
              }, letter),
              createElement('div', {
                className: 'start-menu-apps-list-items'
              },
                groupApps[letter].map((app: IAppInfo, index2: number) => {
                  return createElement('div', {
                    key: 'app-item' + index2,
                    className: 'start-menu-apps-list-item flex items-center',
                    onclick: onAppItemClick.bind(null, app)
                  },
                    [
                      createElement('div', {
                        className: 'start-menu-apps-list-item-icon flex-shrink-0',
                        style: {
                          backgroundImage: `url(${app.icon})`
                        }
                      }),
                      createElement('div', {
                        className: 'start-menu-apps-list-item-name'
                      },
                        createElement('div', {
                          className: 'text-ellipsis'
                        }, app.productName)
                      )
                    ]
                  )
                })
              )
            ]
          )
        })
      )
    ]
  )

  return container
}

function StartMenu(options?: StartMenuOptions) {
  let startMenu: StartMenu

  let contentHome: HTMLDivElement

  let startMenuContent: HTMLDivElement

  function onItemClick(app: IAppInfo) {
    startMenu.toggleShow()

    createWindow(app.name)
  }

  let allApps: HTMLDivElement | undefined

  function onAllAppButtonClick() {
    if (allApps) {
      allApps.remove()
      allApps = undefined
    }

    allApps = AllApps(onBackButtonClick, onItemClick)

    contentHome.classList.add('slide-left')

    startMenuContent.appendChild(allApps)

    setTimeout(() => {
      if (allApps) {
        allApps.style.transform = 'translateX(0)'
      }
    }, 0)
  }

  function onBackButtonClick() {
    contentHome.classList.remove('slide-left')

    setTimeout(() => {
      if (allApps) {
        allApps.style.transform = 'translateX(100%)'
      }
    }, 0)
  }

  function onHide() {
    contentHome.classList.remove('slide-left')

    setTimeout(() => {
      if (allApps) {
        allApps.style.transform = 'translateX(100%)'
        setTimeout(() => {
          allApps?.remove()
          allApps = undefined
        }, 300)
      }
    }, 0)
  }

  const appList = () => {
    return Object.keys(AppInfo)
      .filter(key => AppInfo[key].name !== 'settings')
      .map(key => {
        const currentApp = AppInfo[key]

        return createElement('div', {
          className: 'start-menu-pinned-apps-item flex flex-col items-center',
          onclick: onItemClick.bind(null, currentApp)
        },
          [
            createElement('div', {
              className: 'start-menu-pinned-apps-item-icon',
              style: {
                backgroundImage: `url("${currentApp.icon}")`
              }
            }),
            createElement('div', {
              className: 'start-menu-pinned-apps-item-label w-full'
            },
              createElement('div', {
                title: currentApp.productName,
                className: 'start-menu-pinned-apps-item-label-content text-ellipsis'
              }, currentApp.productName)
            )
          ]
        )
      })
  }

  const recommendedApps = ['mail', 'github', 'twitter', 'vscode', 'terminal', 'spotify'].map(appName => AppInfo[appName])

  const recommendedList = () => {
    return recommendedApps.map(app => {
      return createElement('div', {
        className: 'start-menu-recommended-apps-item flex items-center',
        onclick: onItemClick.bind(null, app)
      },
        [
          createElement('div', {
            className: 'start-menu-recommended-apps-item-icon flex-shrink-0',
            style: {
              backgroundImage: `url("${app.icon}")`
            }
          }),
          createElement('div', {
            className: 'start-menu-recommended-apps-item-label w-full'
          },
            createElement('div', {
              title: app.productName,
              className: 'start-menu-recommended-apps-item-label-content text-ellipsis'
            }, app.productName)
          )
        ]
      )
    })
  }

  startMenu = Popup({
    width: options?.width || 520,
    height: options?.height || 540,
    className: 'start-menu'
  },
    createElement('div', {
      className: 'w-full h-full flex flex-col'
    },
      [
        startMenuContent = createElement('div', {
          className: 'start-menu-content flex flex-col w-full h-full'
        },
          [
            //Content Home
            contentHome = createElement('div', {
              className: 'w-full h-full start-menu-content-home p-30 flex flex-col'
            },
              [
                createElement('div', {
                  className: 'start-menu-pinned-apps flex-1'
                },
                  [
                    createElement('div', {
                      className: 'start-menu-heading flex items-center'
                    },
                      [
                        createElement('div', {
                          className: 'start-menu-label'
                        }, 'Pinned'),
                        createElement('div', {
                          className: 'start-menu-button flex content-center items-center',
                          onclick: onAllAppButtonClick
                        },
                          [
                            createElement('div', {
                              className: 'start-menu-button-text'
                            }, 'All apps'),
                            createElement('div', {
                              className: 'start-menu-button-icon h-full flex content-center items-center',
                              innerHTML: chevronRightIcon
                            })
                          ]
                        )
                      ]
                    ),

                    createElement('div', {
                      className: 'start-menu-pinned-apps-list'
                    },
                      appList()
                    )
                  ]
                ),
                createElement('div', {
                  className: 'start-menu-recommended flex flex-col flex-1'
                },
                  [
                    createElement('div', {
                      className: 'start-menu-heading flex'
                    },
                      [
                        createElement('div', {
                          className: 'start-menu-label'
                        }, 'Recommended')
                      ]
                    ),
                    createElement('div', {
                      className: 'start-menu-recommended-apps-list h-full'
                    },
                      recommendedList()
                    )
                  ]
                )
              ]
            )
          ]
        ),
        createElement('div', {
          className: 'start-menu-footer flex-shrink-0 flex items-center'
        },
          [
            createElement('div', {
              className: 'start-menu-user flex items-center'
            },
              [
                createElement('div', {
                  className: 'start-menu-user-icon',
                  style: {
                    backgroundImage: `url("imgs/user.gif")`
                  }
                }),
                createElement('div', {
                  className: 'start-menu-user-name'
                }, 'chrishtu')
              ]
            ),
            createElement('div', {
              className: 'start-menu-footer-right flex'
            },
              [
                createElement('div', {
                  className: 'start-menu-footer-button start-menu-power',
                  innerHTML: powerIcon
                }),
                createElement('div', {
                  className: 'start-menu-footer-button',
                  innerHTML: settingIcon,
                  onclick: () => {
                    createWindow('settings')
                    startMenu.toggleShow()
                  }
                })
              ]
            )
          ]
        ),
      ]
    ),
    {
      onHide
    }
  ) as StartMenu

  return startMenu
}

export default StartMenu()
