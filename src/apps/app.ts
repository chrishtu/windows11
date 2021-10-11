import { IAppInfo } from "./appInfo";
import Explorer from "./explorer";
import { CommingSoonApp } from "./inProgressApp";
import NotePad from "./notepad";
import Photos from "./photos";
import Settings from "./settings";

export type AppParameter = (appInfo: IAppInfo, _args?: any) => void

interface AppsIndex {
  [appName: string]: AppParameter
}

export const Apps: AppsIndex = {
  settings: Settings,
  explorer: Explorer,
  notepad: NotePad,
  word: CommingSoonApp,
  powerpoint: CommingSoonApp,
  onenote: CommingSoonApp,
  mail: CommingSoonApp,
  todo: CommingSoonApp,
  store: CommingSoonApp,
  photos: Photos,
  yourphone: CommingSoonApp,
  whiteboard: CommingSoonApp,
  calculator: CommingSoonApp,
  spotify: CommingSoonApp,
  twitter: CommingSoonApp,
  vscode: CommingSoonApp,
  terminal: CommingSoonApp,
  github: CommingSoonApp,
  discord: CommingSoonApp
}
