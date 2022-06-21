import wallpapers, { IWallpaerImageInfo } from "./data/wallpapers"
import { fillObject } from "./utils"

interface IState {
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

const defaultAppState: IState = {
  darktheme: false,
  transparency: true,
  backgroundImage: wallpapers[15],
  showDesktopIcons: true,
  backgroundImageStyle: "fill",
  volume: 100,
  brightness: 100,
  nightlight: false,
  themes: [
    DefaultLightTheme,
    DefaultDarkTheme
  ],
  currentThemeIndex: 0,
  roundedCorner: true,
  useBorder: false,
}

export const appStore = createStore('preferences', defaultAppState)

export function createStore(name: string, defaultState: IState = {}) {
  let state: IState = {}

  try {
    const data = localStorage.getItem(name)
    if (data)
      state = fillObject(JSON.parse(data), defaultState)
    else {
      state = defaultState
    }
  } catch (e) {

  }

  function getState(keys: string | Array<string>): IState {
    if (typeof keys === 'string') {
      return { [keys]: state[keys] }
    }

    if (keys instanceof Array) {
      const data: IState = {}

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        data[key] = state[key]
      }

      return data
    }

    return state
  }

  function getStates() {
    return state
  }

  function setState(newState: IState): void {
    state = {
      ...state,
      ...newState
    }

    localStorage.setItem(name, JSON.stringify(state))
  }

  return {
    getState,
    getStates,
    setState
  }
}
