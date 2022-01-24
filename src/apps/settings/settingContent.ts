import { ISettingContentMapIndex } from "./common"
import Personalization from "./contents/personalization/personalization"
import Display from "./contents/system/childrens/display"
import System from "./contents/system/system"
import TestContent from "./contents/testContent"

const SettingContentMap: ISettingContentMapIndex = {
  system: {
    content: System,
    children: {
      display: {
        content: Display
      },
      sound: {
        content: TestContent
      },
      noitification: {
        content: TestContent
      },
      focusAssist: {
        content: TestContent
      },
      powerAndBatery: {
        content: TestContent
      },
      storage: {
        content: TestContent
      }
    }
  },
  bluetoothAndDevice: { content: TestContent },
  networkAndInternet: { content: TestContent },
  personalization: { content: Personalization },
  apps: { content: TestContent },
  accounts: { content: TestContent },
  timeAndLanguage: { content: TestContent },
  gaming: { content: TestContent },
  accessibility: { content: TestContent },
  privacyAndSecurity: { content: TestContent },
  windowUpdate: { content: TestContent }
}

export default SettingContentMap
