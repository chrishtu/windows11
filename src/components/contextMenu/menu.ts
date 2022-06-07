import createElement from "../../createElement"
import { KEYS } from "../../utils/keys"
import { chevronDownIcon, chevronUpIcon } from "./icons"
import { IBound, IContextMenu, IMenuItem, ISubMenu, ITemplate } from "./interfaces"
import MenuItem from "./menuItem"
import SubMenu from "./subMenu"
import hoverHold from "./utils"

declare global {
  interface Window {
    lastContextMenu: IContextMenu,
    contextMenuDirectionLTR: boolean
  }
}

export default function ContextMenu(bound: IBound, triggerElement: HTMLElement, template: Array<ITemplate> = [], autoFocus = false, onClose?: Function) {
  if (window.lastContextMenu) {
    window.lastContextMenu.close()
  }

  window.contextMenuDirectionLTR = true

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  let element: HTMLDivElement

  let menuItems: Array<IMenuItem> = [], itemFocusIndex = -1

  let currentSubMenuOpen: ISubMenu

  let itemIndex = 0

  const templateLen = template.length

  function onkeydown(e: KeyboardEvent) {
    if (e.key === KEYS.ArrowRight) {
      if (itemFocusIndex === -1) {
        itemFocusIndex = 0
        menuItems[itemFocusIndex].element.focus()
      }
    }
    else if (e.key === KEYS.ArrowUp) {
      e.preventDefault()

      if (itemFocusIndex === -1) {
        itemFocusIndex = menuItems.length - 1
        menuItems[itemFocusIndex].element.focus()
      } else {
        let nextFocusedItem = menuItems[itemFocusIndex - 1]

        if (!nextFocusedItem) {
          menuItems[menuItems.length - 1].element.focus()
        } else {
          nextFocusedItem.element.focus()
        }
      }

      closeOpeningSubMenu()
    }
    else if (e.key === KEYS.ArrowDown) {
      e.preventDefault()

      if (itemFocusIndex === -1) {
        itemFocusIndex = 0
        menuItems[itemFocusIndex].element.focus()
      } else {
        let nextFocusedItem = menuItems[itemFocusIndex + 1]
        if (!nextFocusedItem) {
          menuItems[0].element.focus()
        } else {
          nextFocusedItem.element.focus()
        }
      }

      closeOpeningSubMenu()
    }
    else if (e.key === KEYS.Escape) {
      close()
    }
  }

  function onItemFocus(index: number) {
    itemFocusIndex = index
  }

  function closeOpeningSubMenu() {
    if (currentSubMenuOpen) {
      currentSubMenuOpen.close()
    }
  }

  function onItemHover() {
    closeOpeningSubMenu()
  }

  let scrollButtonTop = createElement('div', {
    className: 'context-menu-scroll-button top',
    innerHTML: chevronUpIcon()
  })

  let scrollButtonBottom = createElement('div', {
    className: 'context-menu-scroll-button bottom',
    innerHTML: chevronDownIcon()
  })

  element = createElement('div', {
    tabIndex: -1,
    className: 'context-menu',
  },
    [
      scrollButtonTop,
      scrollButtonBottom
    ]
  )

  let elementInner = createElement('div', {
    tabIndex: -1,
    className: 'context-menu-inner',
    onkeydown: onkeydown,
    onscroll: () => {
      checkButton()
    }
  })

  function checkButton() {
    if (elementInner.scrollTop <= 10) {
      scrollButtonTop.classList.remove('show')
    } else {
      scrollButtonTop.classList.add('show')
    }

    let innerBound = elementInner.getBoundingClientRect()

    if (elementInner.scrollTop + innerBound.height >= elementInner.scrollHeight - 10) {
      scrollButtonBottom.classList.remove('show')
    } else {
      scrollButtonBottom.classList.add('show')
    }
  }

  function increScrollTop() {
    elementInner.scrollTop += 4
  }

  function decreScrollTop() {
    elementInner.scrollTop -= 4
  }

  hoverHold(scrollButtonTop, decreScrollTop)
  hoverHold(scrollButtonBottom, increScrollTop)

  element.appendChild(elementInner)

  document.body.appendChild(element)

  element.focus()

  for (let index = 0; index < templateLen; index++) {
    const currentItem = template[index]

    if (currentItem.divider) {
      let menuItemDivider = createElement('div', {
        className: 'menu-item-divider'
      })

      elementInner.appendChild(menuItemDivider)
    }
    else {
      let menuItem = MenuItem(currentItem, itemIndex, { onEnter: onItemClick, onFocus: onItemFocus, onHover: onItemHover })

      elementInner.appendChild(menuItem.element)

      const hasChildren = typeof currentItem.children !== 'undefined' && currentItem.children !== null && currentItem.children instanceof Array && currentItem.children.length > 0

      if (hasChildren && !currentItem.disabled) {
        SubMenu(element, menuItem, currentItem.children as Array<ITemplate>, onItemClick, onSubMenuOpen)
      }

      menuItems.push(menuItem)

      itemIndex += 1
    }
  }

  setTimeout(() => {
    if (autoFocus)
      menuItems[0].element.focus()
    else
      elementInner.focus()
  }, 0)

  let position = {
    top: bound.top,
    left: bound.left
  }

  const currentBound = element.getBoundingClientRect()
  let innerBound = elementInner.getBoundingClientRect()

  if (position.left + currentBound.width > windowWidth) {
    position.left = position.left - currentBound.width
  }

  if (position.top + currentBound.height > windowHeight) {
    position.top = windowHeight - currentBound.height - 5
  }

  if (innerBound.height > windowHeight) {
    position.top = 10
    element.style.height = (windowHeight - 20) + 'px'
  }

  innerBound = elementInner.getBoundingClientRect()

  if (elementInner.scrollHeight > innerBound.height) {
    element.style.width = currentBound.width + 'px'
    elementInner.style.width = (currentBound.width + 20) + 'px'
  }

  element.style.left = position.left + 'px'
  element.style.top = position.top + 'px'

  checkButton()

  function onItemClick() {
    close()
  }

  function onResize() {
    close()
  }

  window.addEventListener('resize', onResize, false)

  document.addEventListener('mousedown', onDocumentMouseDown, false)

  function onDocumentMouseDown(e: MouseEvent) {
    if (!element.contains(e.target as Node)) {
      close()
    }
  }

  function close() {
    window.removeEventListener('scroll', onResize, false)
    document.removeEventListener('mousedown', onDocumentMouseDown, false)

    element.remove()

    setTimeout(() => {
      triggerElement.focus()
    }, 0)

    onClose && onClose()
  }

  function onSubMenuOpen(instance: ISubMenu) {
    currentSubMenuOpen = instance
  }

  window.lastContextMenu = {
    close
  }
}
