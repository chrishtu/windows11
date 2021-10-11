import wallpapers from "./data/wallpapers"

interface AppState {
  [key: string]: any
}

let appState: AppState = {
  darktheme: false,
  transparency: false,
  backgroundImage: wallpapers[15].path,
  volume: 100,
  brightness: 100,
  nightlight: false
}

try {
  const data = localStorage.getItem('preferences')
  if (data)
    appState = JSON.parse(data)
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
