import Window from "../components/window/window";
import createElement from "../createElement";
import { IWindow } from "../interfaces/window";
import { IAppInfo } from "./appInfo";

const Explorer = (appInfo: IAppInfo, _args?: any) => {
  Window({
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    top: 50,
    left: 50,
    width: 800,
    height: 500,
    transprencyContent: true,
    fluidContent: true,
    content: (win: IWindow) => {


      return createElement('div', {
        className: 'w-full h-full flex',
      },
        [
          createElement('div', {
            className: 'explorer-sidebar flex-shrink-0 h-full',
            style: {
              width: '200px',
              borderRight: '1px solid var(--border-color)'
            }
          },
            createElement('div', {
              className: 'standard-content'
            },
              createElement('div', {
                className: 'w-full h-full p-20 text'
              },
                [
                  createElement('div', {}, 'This PC'),
                  createElement('button', {
                    onclick: () => win.setTitle(Date.now().toString(16))
                  }, 'Change title')
                ]
              )
            )
          ),
          createElement('div', {
            className: 'theme-background-primary explorer-content flex-1  h-full'
          }),
        ]
      )
    }
  })
}

export default Explorer
