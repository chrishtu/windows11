import { ITitleBar } from "../components/window/titlebar";

export interface WindowTitleBar {
  title: string
  icon?: string
  maximized?: boolean
  disableMaximize?: boolean
  autoHide?: boolean
}

export interface WindowElement {
  element: HTMLDivElement
  titlebar: ITitleBar
}

export interface WindowMethods {
  setContent(content: any): void
  show(): void
  hide(): void
  setIcon: (path: string) => void
  setTitle: (text: string) => void
  getTitle(): string
  setAutoHideTitleBar(autoHide: boolean): void
  setMaximize: (maximize: boolean) => void
  decrementZIndex(): void
  restoreZIndex(): void
  focus(): void
  blur(): void
  toggleMaximize(): void
  makeTransparent(): void
  removeTransparent(): void
  toggleTransprent(): void
  toggleFullscreen(): void
  maximize(): void
  close(): void
  isMaximized(): boolean
  toggleShow(): void
  isVisible(): boolean
  isFocused(): boolean
  setBounds(bounds: WindowBounds): void
  setSize(size: Size): void
  makeCenter(): void
  addEventListener(name: string, listener: Function): void
  executeListeners(name: string, args?: any): void
}

type WindowContent = (win: IWindow) => HTMLDivElement

export interface WindowOptions extends WindowTitleBar, Partial<WindowBounds> {
  args?: string
  name: string
  content?: WindowContent
  autoHideTitleBar?: boolean
  autoHideDuration?: number
  singleInstance?: boolean
  disableMaximize?: boolean
  disableResize?: boolean
  width?: number
  height?: number
  center?: boolean
  transprencyContent?: boolean
  fluidContent?: boolean,
  keepAspectRatio?: boolean
}

export interface Position {
  top: number
  left: number
}

export interface Size {
  width: number
  height: number
}

export interface Cordinate {
  x: number
  y: number
}

export interface WindowBounds extends Position, Size { }

export interface IWindow extends WindowElement, WindowMethods {
  name: string
  id: string
}
