export interface IContextMenu {
  close(): void
}

export interface ISubMenu {
  close(): void
}

export interface IMenuItem {
  element: HTMLElement
  setActive(active: boolean): void
}

export interface IBound {
  top: number
  left: number
}

type IconTypes = 'svg' | 'image' | 'element'

export interface ITemplate {
  id?: string
  text?: string
  icon?: string | Node
  iconType?: IconTypes
  value?: any
  divider?: boolean
  checked?: boolean
  children?: Array<ITemplate>
  onClick?(...data: any[]): void
  disabled?: boolean
  emphasis?: boolean
  shortcut?: string
}

export interface IMenuItemEvents {
  onEnter(item: ITemplate): void
  onFocus(index: number): void
  onHover(index: number): void
}
