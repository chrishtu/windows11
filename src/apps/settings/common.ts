import { getFileName } from '../../utils'
import { SettingNavCallback } from './contents/system/settingNav'

export const settingId = 'settings'


export interface NavItemInfo {
  name: string
  icon: string
  text: string
  active?: boolean
}

export interface SystemNavItemInfo {
  icon: string
  iconType?: string
  name: string
  text: string
  desc: string
  path: string
  control?: any
  content?: any
  isNav?: boolean
  expanded?: boolean
}

export interface ISettingContent {
  element: HTMLDivElement
  dispose(): void
}

export type SettingContentFunction = (onNavItemClick: SettingNavCallback) => ISettingContent

export interface SettingsChildrenInfo {
  icon: string
  iconType?: string
  text: string
  desc: string
}

export interface SettingsChildrenIndex {
  [key: string]: SettingsChildrenInfo
}

export interface SettingParentInfo {
  icon: string
  iconType?: string
  text: string,
  items?: SettingsChildrenIndex
}

interface SettingsInfoIndex {
  [key: string]: SettingParentInfo
}

export interface ISettingContentMap {
  content: SettingContentFunction
  children?: ISettingContentMapIndex
}

export interface ISettingContentMapIndex {
  [key: string]: ISettingContentMap
}

export const settingsInfo: SettingsInfoIndex = {
  system: {
    icon: 'imgs/icons/Desktop.png',
    iconType: 'image',
    text: 'System',
    items: {
      display: {
        icon: '',
        text: 'Display',
        desc: 'Monitors, brightness, nightlight, display profile'
      },
      sound: {
        icon: '',
        text: 'Sound',
        desc: 'Volume levels, ouput, input sound devices'
      },
      noitification: {
        icon: '',
        text: 'Noitification',
        desc: 'Alerts from apps and system'
      },
      focusAssist: {
        icon: '',
        text: 'Focus Assist',
        desc: 'Notifications, automatic rules'
      },
      powerAndBatery: {
        icon: '',
        text: 'Power & batery',
        desc: 'Sleep, batery usage, batery saver'
      },
      storage: {
        icon: '',
        text: 'Storage',
        desc: 'View storage usage on driver'
      },
    }
  },
  bluetoothAndDevice: {
    icon: 'imgs/icons/misc/Bluetooth.png',
    text: 'Bluetooth & Devices'
  },
  networkAndInternet: {
    icon: 'imgs/icons/misc/wifi.png',
    text: 'Network & Intenet'
  },
  personalization: {
    icon: 'imgs/icons/Personalization.png',
    iconType: 'image',
    text: 'Personalization',
    items: {
      background: {
        icon: '',
        text: 'Background',
        desc: 'Change desktop background image'
      },
      colors: {
        icon: '',
        text: 'Colors',
        desc: 'Accent color, transparency, dark theme'
      },
      lockScreen: {
        icon: '',
        text: 'Lock Screen',
        desc: 'Background image, notifications'
      },
      theme: {
        icon: '',
        text: 'Themes',
        desc: 'Customize window theme'
      },
      font: {
        icon: '',
        text: 'Fonts',
        desc: 'Browser installed fonts or install new fonts'
      },
      start: {
        icon: '',
        text: 'Start',
        desc: 'Pinned apps, remommended'
      },
      taskbar: {
        icon: '',
        text: 'Taskbar',
        desc: 'Taskbar arrangement, position'
      }
    }
  },
  apps: {
    icon: 'imgs/icons/misc/15.png',
    text: 'Apps'
  },
  accounts: {
    icon: 'imgs/icons/Users.png',
    iconType: 'image',
    text: 'Accounts'
  },
  timeAndLanguage: {
    icon: 'imgs/icons/misc/Time And Language.png',
    text: 'Time & Language'
  },
  gaming: {
    icon: 'imgs/icons/misc/Gaming.png',
    text: 'Gaming'
  },
  accessibility: {
    icon: 'imgs/icons/Help.png',
    text: 'Accessibility'
  },
  privacyAndSecurity: {
    icon: 'imgs/icons/Security.png',
    text: 'Privacy & Security'
  },
  windowUpdate: {
    icon: 'imgs/icons/Emblems/1401.png',
    text: 'Window Update'
  }
}

export const navItems: Array<NavItemInfo> = Object.keys(settingsInfo).map((key, index) => {
  const info = settingsInfo[key]

  let obj = Object.create(null)

  obj = {
    name: key,
    icon: info.icon,
    text: info.text
  }

  if (index === 0) {
    obj.active = true
  }

  return obj
})


export function getThumbnailFromImage(path: string) {
  return 'imgs/Wallpapers/Thumbnails/' + getFileName(path)
}
