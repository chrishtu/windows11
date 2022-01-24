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
  name: string
  text: string
  desc: string
  path: string
  optional?: any
}

export interface ISettingContent {
  element: HTMLDivElement
  dispose(): void
}

export type SettingContentFunction = (onNavItemClick: SettingNavCallback) => ISettingContent

export interface SettingsChildrenInfo {
  icon: string
  text: string
  desc: string
}

export interface SettingsChildrenIndex {
  [key: string]: SettingsChildrenInfo
}

export interface SettingParentInfo {
  icon: string
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
    icon: '',
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
    icon: '',
    text: 'Bluetooth & Devices'
  },
  networkAndInternet: {
    icon: '',
    text: 'Network & Intenet'
  },
  personalization: {
    icon: '',
    text: 'Personalization'
  },
  apps: {
    icon: '',
    text: 'Apps'
  },
  accounts: {
    icon: '',
    text: 'Accounts'
  },
  timeAndLanguage: {
    icon: '',
    text: 'Time & Language'
  },
  gaming: {
    icon: '',
    text: 'Gaming'
  },
  accessibility: {
    icon: '',
    text: 'Accessibility'
  },
  privacyAndSecurity: {
    icon: '',
    text: 'Privacy & Security'
  },
  windowUpdate: {
    icon: '',
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
