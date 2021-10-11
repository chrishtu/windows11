const imgPath = 'imgs/icons/Apps/'

function getAppIconPath(img: string) {
  return imgPath + img
}

export interface IAppInfo {
  name: string
  productName: string
  icon?: string
  iconType?: string
}

interface AppsIndex {
  [key: string]: IAppInfo
}

export const AppInfo: AppsIndex = {
  settings: {
    name: 'settings',
    productName: 'Settings',
    icon: getAppIconPath('settings.png')
  },
  notepad: {
    name: 'notepad',
    productName: 'NotePad',
    icon: getAppIconPath('notepad.png')
  },
  explorer: {
    name: 'explorer',
    productName: 'File Explorer',
    icon: getAppIconPath('explorer.png')
  },
  word: {
    name: 'word',
    productName: 'Word',
    icon: getAppIconPath('word.png')
  },
  powerpoint: {
    name: 'powerpoint',
    productName: 'PowerPoint',
    icon: getAppIconPath('powerpoint.png')
  },
  onenote: {
    name: 'onenote',
    productName: 'OneNote',
    icon: getAppIconPath('onenote.png')
  },
  mail: {
    name: 'mail',
    productName: 'Mail',
    icon: getAppIconPath('mail.png')
  },
  todo: {
    name: 'todo',
    productName: 'To Do',
    icon: getAppIconPath('todo.png')
  },
  store: {
    name: 'store',
    productName: 'Store',
    icon: getAppIconPath('store.png')
  },
  photos: {
    name: 'photos',
    productName: 'Photos',
    icon: getAppIconPath('photos.png')
  },
  yourphone: {
    name: 'yourphone',
    productName: 'Your Phone',
    icon: getAppIconPath('yourphone.png')
  },
  whiteboard: {
    name: 'whiteboard',
    productName: 'White Board',
    icon: getAppIconPath('whiteboard.png')
  },
  calculator: {
    name: 'calculator',
    productName: 'Calculator',
    icon: getAppIconPath('calculator.png')
  },
  spotify: {
    name: 'spotify',
    productName: 'Spotify',
    icon: getAppIconPath('spotify.png')
  },
  twitter: {
    name: 'twitter',
    productName: 'Twitter',
    icon: getAppIconPath('twitter.png')
  },
  vscode: {
    name: 'vscode',
    productName: 'VS Code',
    icon: getAppIconPath('vscode.png')
  },
  terminal: {
    name: 'terminal',
    productName: 'Terminal',
    icon: getAppIconPath('terminal.png')
  },
  github: {
    name: 'github',
    productName: 'GitHub',
    icon: getAppIconPath('github.png')
  },
  discord: {
    name: 'discord',
    productName: 'Discord',
    icon: getAppIconPath('discord.png')
  }
}

export const ListApp = Object.keys(AppInfo).map((appName: string) => AppInfo[appName])

function sortbyName(a: IAppInfo, b: IAppInfo) {
  if (a.name > b.name) {
    return 1
  }

  if (a.name < b.name) {
    return -1
  }

  return 0
}


interface GroupApps {
  [key: string]: Array<IAppInfo>
}

export function AppInfoGroup() {
  const sortedApps = ListApp.sort(sortbyName)

  const groupApps: GroupApps = {}

  const sortedAppsLen = sortedApps.length

  for (let index = 0; index < sortedAppsLen; index++) {
    const app = sortedApps[index]

    let letter = app.name.substring(0, 1).toUpperCase()

    if (/[A-Z]/.test(letter)) { // Is letter

    } else if (/[0-9]/.test(letter)) { // Is Number
      letter = '#'
    } else { // Is special character
      letter = '&'
    }

    if (!groupApps[letter]) {
      groupApps[letter] = []
    }

    groupApps[letter].push(app)
  }

  return groupApps
}
