type ElementOrFlagment = HTMLElement | DocumentFragment

export function appendChild<T extends ElementOrFlagment>(parent: T, item: T | HTMLCollection | any) {
  if (typeof item === 'undefined' || item === null) return

  if (item instanceof HTMLElement) {
    parent.appendChild(item)
  } else {
    if (item instanceof Array) {
      appendChilds(parent, item)
    } else {
      parent.appendChild(document.createTextNode(item.toString()))
    }
  }
}

export function appendChilds<T extends ElementOrFlagment>(parent: T, child: T | HTMLCollection | any) {
  if (child instanceof Array) {
    child.forEach(item => {
      appendChild(parent, item)
    });
  } else {
    appendChild(parent, child)
  }
}

export type IProps<T> =
  & Omit<Partial<T>, 'style'>
  & {
    style?: Partial<CSSStyleDeclaration>
  }

type ElementProps<K extends keyof HTMLElementTagNameMap> = & IProps<HTMLElementTagNameMap[K]> | {}

export default function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: ElementProps<K>, children?: HTMLCollection | any): HTMLElementTagNameMap[K] {
  let element = document.createElement(tagName)

  if (props) {
    const _props = props as HTMLElementTagNameMap[K]
    for (let prop in _props) {
      if (prop === 'style') {
        const style = _props[prop]
        for (let key in style) {
          if (key.indexOf('-') > -1) {
            element.style.setProperty(key, style[key] as any)
          } else {
            (element.style as any)[key] = style[key]
          }
        }
      }
      else {
        if (prop.indexOf('-') > -1 || prop.indexOf(':') > -1) {
          const propVal = _props[prop] as unknown as string
          element.setAttribute(prop, propVal)
        } else {
          (element as any)[prop] = _props[prop]
        }
      }
    }
  }

  if (children) {
    appendChilds(element as unknown as ElementOrFlagment, children)
  }

  return element as any
}

export function createFlagmentElement(children: HTMLCollection | any): DocumentFragment {
  let element = document.createDocumentFragment()
  if (children) {
    appendChilds(element as ElementOrFlagment, children);
  }
  return element
}
