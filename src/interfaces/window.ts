import { ITitleBar } from "../components/window/titlebar";

export interface IWindowTitleBarOptions {
  title: string
  icon?: string
  hideIcon?: boolean
  maximized?: boolean
  disableMaximize?: boolean
  autoHide?: boolean
  content?: any
}

export interface WindowElement {
  element: HTMLDivElement
  titlebar: ITitleBar
}

export type WindowEventListeners = 'focus' | 'blur' | 'dragstart' | 'drag' | 'dragend' | 'secondInstance' | 'ontitlebarshow' | 'ontitlebarhide' | 'resizestart' | 'resize' | 'resizeend' | 'minimize' | 'maximize' | 'restore' | 'fullscreen' | 'close'

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
  addEventListener(name: WindowEventListeners, listener: Function): void
  executeListeners(name: WindowEventListeners, args?: any): void
}

type WindowContent = (win: IWindow) => HTMLElement

export interface IWindowOptions extends IWindowTitleBarOptions, Partial<WindowBounds> {
  args?: string
  name: string
  titlebarContent?: any
  titlebarHeight?: number
  content?: WindowContent
  autoHideTitleBar?: boolean
  autoHideDuration?: number
  singleInstance?: boolean
  disableMaximize?: boolean
  disableResize?: boolean
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
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
  icon: string
}
