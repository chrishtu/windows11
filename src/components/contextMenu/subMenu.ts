import { KEYS } from "../../utils/keys"
import { chevronDownIcon, chevronUpIcon } from "./icons"
import { IMenuItem, ISubMenu, ITemplate } from "./interfaces"
import MenuItem from "./menuItem"
import hoverHold from "./utils"

export default function SubMenu(parent: HTMLElement, menuItem: IMenuItem, template: Array<ITemplate>, onItemClick: (item: ITemplate) => void, onShow: (instance: ISubMenu) => void): ISubMenu {
  const templateLen = template.length
  let itemIndex = 0
  let menuItems: Array<IMenuItem> = []
  let itemFocusIndex = -1
  let currentSubMenuOpen: ISubMenu
  let instance: ISubMenu = {
    close
  }

  let element = document.createElement('div')
  element.className = 'sub-menu'

  let scrollButtonTop = document.createElement('div')
  scrollButtonTop.className = 'context-menu-scroll-button top'
  scrollButtonTop.innerHTML = chevronUpIcon()
  element.appendChild(scrollButtonTop)

  let scrollButtonBottom = document.createElement('div')
  scrollButtonBottom.className = 'context-menu-scroll-button bottom'
  scrollButtonBottom.innerHTML = chevronDownIcon()
  element.appendChild(scrollButtonBottom)

  let elementInner = document.createElement('div')
  elementInner.tabIndex = -1
  elementInner.className = 'context-menu-inner'
  elementInner.onkeydown = onkeydown
  elementInner.addEventListener('scroll', () => {
    checkButton()
  }, false)

  function checkButton() {
    if (elementInner.scrollTop <= 10) {
      scrollButtonTop.classList.remove('show')
    } else {
      scrollButtonTop.classList.add('show')
    }

    if (elementInner.scrollTop + elementInner.getBoundingClientRect().height >= elementInner.scrollHeight - 10) {
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

  menuItem.element.appendChild(element)

  for (let index = 0; index < templateLen; index++) {
    const currentItem = template[index]

    if (currentItem.divider) {
      let menuItemDivider = document.createElement('div')
      menuItemDivider.className = 'menu-item-divider'

      elementInner.appendChild(menuItemDivider)
    }
    else {
      let menuItem = MenuItem(currentItem, itemIndex, { onEnter: onItemClick, onFocus: onItemFocus, onHover: onItemHover })

      elementInner.appendChild(menuItem.element)

      const hasChildren = typeof currentItem.children !== 'undefined' && currentItem.children !== null && currentItem.children instanceof Array && currentItem.children.length > 0

      if (hasChildren && !currentItem.disabled) {
        SubMenu(element, menuItem, currentItem.children as Array<ITemplate>, onItemClick, onSubMenuShow)
      }

      menuItems.push(menuItem)

      itemIndex += 1
    }
  }

  function onSubMenuShow(subMenu: ISubMenu) {
    currentSubMenuOpen = subMenu
  }

  function onItemHover() {
    closeOpeningSubMenu()
  }

  menuItem.element.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === KEYS.ArrowRight || e.key === KEYS.Enter) {
      e.stopPropagation()
      show(true)
    }
  }, false)

  menuItem.element.addEventListener('mouseenter', (e: MouseEvent) => {
    e.stopPropagation()

    show(false)
  }, false)

  function onkeydown(e: KeyboardEvent) {
    if (e.key === KEYS.ArrowLeft) {
      e.stopPropagation()
      element.classList.remove('show')
      menuItem.setActive(false)
      menuItem.element.focus()
    }
    if (e.key === KEYS.ArrowRight) {
      e.stopPropagation()

      if (itemFocusIndex === -1) {
        itemFocusIndex = 0
        menuItems[itemFocusIndex].element.focus()
      }
    }
    else if (e.key === KEYS.ArrowUp) {
      e.stopPropagation()
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
      e.stopPropagation()
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
  }

  function onItemFocus(index: number) {
    itemFocusIndex = index
  }

  let firstBound: DOMRect | undefined

  function show(autoFocus: boolean) {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    menuItem.setActive(true)
    element.classList.add('show')

    const parentBound: DOMRect = parent.getBoundingClientRect()
    const menuItemBound: DOMRect = menuItem.element.getBoundingClientRect()

    let positionLeft = parentBound.left + parentBound.width - 4,
      positionTop = menuItemBound.top - 1

    let currentBound = element.getBoundingClientRect()

    if (!firstBound) {
      firstBound = currentBound
    }

    let innerBound = elementInner.getBoundingClientRect()

    if (parentBound.left + parentBound.width + currentBound.width > windowWidth) {
      positionLeft = parentBound.left - currentBound.width + 4
    }

    if (positionTop + currentBound.height >= windowHeight) {
      positionTop = windowHeight - currentBound.height - 5
    }
    else {
      positionTop -= 5
    }

    if (innerBound.height >= windowHeight) {
      positionTop = 10
      element.style.height = (windowHeight - 20) + 'px'
    }

    innerBound = elementInner.getBoundingClientRect()

    if (elementInner.scrollHeight > innerBound.height) {
      element.style.width = firstBound.width + 'px'
      elementInner.style.width = (firstBound.width + 20) + 'px'
    }

    element.style.top = positionTop + 'px'
    element.style.left = positionLeft + 'px'

    checkButton()

    if (autoFocus) {
      menuItems[0].element.focus()
    }

    onShow(instance)
  }

  function closeOpeningSubMenu() {
    if (currentSubMenuOpen) {
      currentSubMenuOpen.close()
    }
  }

  function close() {
    menuItem.setActive(false)
    element.classList.remove('show')

    closeOpeningSubMenu()
  }

  return instance
}
