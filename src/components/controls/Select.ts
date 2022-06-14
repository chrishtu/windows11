import createElement from "../../createElement"
import { chevronUpIcon } from "../icons/icons"

interface ISelectOptions {
  id?: string
  text: string
  value: string
}

interface ISelectProps {
  options: Array<ISelectOptions>
  value?: string
  noBackground?: boolean
  onChange?(item: ISelectOptions): void
}

interface SelectOptionProps {
  id: string
  element: HTMLElement
}

export interface ISelect {
  element: HTMLElement
  setValue(value: string): void
}

export default function Select(props: ISelectProps): ISelect {
  let
    placeholderTextElement: HTMLElement,
    optionsElement: HTMLElement,
    element: HTMLElement,
    isShow: boolean = false

  let selectedOption = props.options.find(item => item.value === props.value)

  let optionItems: Array<SelectOptionProps> = []

  function onChange(item: ISelectOptions) {
    selectedOption = item
    placeholderTextElement.textContent = item.text
    props.onChange && props.onChange(item)

    checkSelected()
    close()
  }

  const text = props.value ? props.options.find(item => item.value === props.value).text : 'Select'

  const optionsItemsElement = props.options.map(option => {
    const selected = option.value === props.value

    const optionElement = createElement('div', {
      className: 'select-option' + (selected ? ' selected' : ''),
      onclick: onChange.bind(null, option)
    },
      [
        createElement('div', {
          className: 'select-option-decorator'
        }),
        createElement('div', {
          className: 'select-option-label'
        }, option.text)
      ]
    )

    optionItems.push({ id: option.value, element: optionElement })

    return optionElement
  })

  optionsElement = createElement('div', {
    className: 'select-options'
  }, optionsItemsElement)

  function close() {
    optionsElement.classList.remove('show')
    isShow = false
    document.removeEventListener('click', _onDocumentClick)
  }

  function _onDocumentClick(e: MouseEvent) {
    if (e.target !== element && !element.contains(e.target as Node)) {
      close()
    }
  }

  function checkSelected() {
    optionItems.forEach(item => {
      item.element.classList.remove('selected')
      if (selectedOption && item.id === selectedOption.value) {
        item.element.classList.add('selected')
      }
    })
  }

  function toggleShow() {
    isShow = !isShow

    if (isShow) {
      checkSelected()
      document.addEventListener('click', _onDocumentClick)
    }

    optionsElement.classList.toggle('show')
    // optionsElement.scrollIntoView()
  }

  element = createElement('div', {
    className: 'select' + (props.noBackground ? ' no-background' : ''),
  },
    [
      createElement('div', {
        className: 'select-placeholder flex items-center',
        onclick: toggleShow
      },
        [
          placeholderTextElement = createElement('div', {
            className: 'select-placeholder-text flex-1'
          }, text),
          createElement('div', {
            className: 'select-placeholder-icon',
            innerHTML: chevronUpIcon
          })
        ]
      ),
      optionsElement = createElement('div', {
        className: 'select-options'
      }, optionsItemsElement)
    ]
  )

  function setValue(value: string) {
    const option = props.options.find(item => item.value === value)
    if (option) {
      onChange(option)
    }
  }

  return {
    element,
    setValue
  }
}
