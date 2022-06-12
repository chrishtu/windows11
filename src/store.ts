import wallpapers, { IWallpaerImageInfo } from "./data/wallpapers"
import { fillObject } from "./utils"

interface AppState {
  [key: string]: any
}

export interface ITheme {
  name: string
  background: {
    image?: IWallpaerImageInfo
    color?: string
  }
  color: {
    primary?: string
    secondary?: string
    accent?: string
  }
  dark: boolean
  transparency: boolean
}

const DefaultLightTheme = {
  name: 'Default Light',
  background: {
    image: wallpapers[15],
    color: '#eee'
  },
  color: {
    primary: '#00bcd4',
    secondary: '#ffffff',
    accent: '#5dccff',
  },
  dark: false,
  transparency: true,
}

const DefaultDarkTheme = {
  name: 'Default Dark',
  background: {
    image: wallpapers[9],
    color: '#333'
  },
  color: {
    primary: '#00bcd4',
    secondary: '#ffffff',
    accent: '#5dccff',
  },
  dark: true,
  transparency: true,
}

const defaultState: AppState = {
  darktheme: false,
  transparency: true,
  backgroundImage: wallpapers[15],
  backgroundImageStyle: "fill",
  volume: 100,
  brightness: 100,
  nightlight: false,
  themes: [
    DefaultLightTheme,
    DefaultDarkTheme
  ],
  currentThemeIndex: 0
}

let appState: AppState = {}

try {
  const data = localStorage.getItem('preferences')
  if (data)
    appState = fillObject(JSON.parse(data), defaultState)
  else {
    appState = defaultState
  }
} catch (e) {

}

export function getState(keys: string | Array<string>): AppState {
  if (typeof keys === 'string') {
    return { [keys]: appState[keys] }
  }

  if (keys instanceof Array) {
    const data: AppState = {}

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      data[key] = appState[key]
    }

    return data
  }

  return appState
}

export function getStates() {
  return appState
}

export function setState(state: AppState): void {
  appState = {
    ...appState,
    ...state
  }

  localStorage.setItem('preferences', JSON.stringify(appState))
}
