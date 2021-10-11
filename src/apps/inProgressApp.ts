import Window from "../components/window/window"
import createElement from "../createElement"
import { randomIntFromInterval } from "../utils"
import { IAppInfo } from "./appInfo"

export function CommingSoonApp(appInfo: IAppInfo, _args: any) {
  const top = randomIntFromInterval(50, 200)
  const left = randomIntFromInterval(50, 200)

  Window({
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    top,
    left,
    width: 450,
    height: 300,
    content: () => {
      return createElement('div', {
        className: 'w-full h-full flex content-center items-center'
      },
        createElement('h3', {}, 'In Progress')
      )
    }
  })
}
