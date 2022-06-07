import { KEYS } from "../../utils/keys"
import { checkIcon } from "./icons"
import { IMenuItem, IMenuItemEvents, ITemplate } from "./interfaces"

export default function MenuItem(item: ITemplate, itemIndex: number, events: IMenuItemEvents): IMenuItem {
  const hasChildren = typeof item.children !== 'undefined' && item.children !== null && item.children instanceof Array && item.children.length > 0

  let element = document.createElement('div')
  element.className = 'menu-item'
  element.tabIndex = -1

  if (item.disabled) {
    element.classList.add('disabled')
  } else {
    element.onclick = onclick
    element.onkeydown = onkeydown
  }
  element.onfocus = onfocus
  element.onmouseenter = onmouseenter

  let menuItemIcon = document.createElement('div')
  menuItemIcon.className = 'menu-item-icon'

  if (item.checked) {
    element.classList.add('checked')
    menuItemIcon.innerHTML = checkIcon()
  } else {
    if (item.icon) {
      if ((!item.iconType && !(item.icon instanceof Node)) || item.iconType === 'svg') {
        menuItemIcon.innerHTML = item.icon as string
      }
      else if (item.iconType === 'image') {
        menuItemIcon.style.backgroundImage = `url("${item.icon}")`
      }
      else if (item.icon instanceof Node || item.iconType === 'element') {
        menuItemIcon.appendChild(item.icon as Node)
      }
    }
  }

  if (item.emphasis) {
    element.classList.add('emphasis')
  }

  element.appendChild(menuItemIcon)

  let menuItemText = document.createElement('div')
  menuItemText.className = 'menu-item-text'
  menuItemText.textContent = item.text || ''

  element.appendChild(menuItemText)

  if (item.shortcut) {
    let menuItemShortcut = document.createElement('div')
    menuItemShortcut.className = 'menu-item-shortcut'
    menuItemShortcut.textContent = item.shortcut

    element.appendChild(menuItemShortcut)
  }

  if (hasChildren) {
    let menuItemArrow = document.createElement('div')
    menuItemArrow.className = 'menu-item-arrow'
    menuItemArrow.textContent = '▶'

    element.appendChild(menuItemArrow)
  }

  function onmouseenter(e: MouseEvent) {
    e.stopPropagation()

    const target = e.currentTarget as HTMLElement

    target.focus()

    events.onHover(itemIndex)
  }

  function onSubmit() {
    if (!hasChildren) {
      events.onEnter(item)
    }

    if (typeof item.onClick === 'function') {
      item.onClick()
    }
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key === KEYS.Enter) {
      e.stopPropagation()
      onSubmit()
    }
  }

  function onfocus(e: FocusEvent) {
    e.stopPropagation()
    events.onFocus(itemIndex)
  }

  function onclick(e: MouseEvent) {
    e.stopPropagation()

    onSubmit()
  }

  function setActive(active: boolean) {
    element.classList[active ? 'add' : 'remove']('active')
  }

  return {
    element,
    setActive
  }
}
