import { taskbarHeight, titlebarHeight } from "../components/constant"
import Select from "../components/controls/Select"
import screenInfo from "../components/screenInfo"
import Window from "../components/window/window"
import createElement from "../createElement"
import { IWindow, WindowBounds } from "../interfaces/window"
import { createStore } from "../store"
import { isNotNullOrUndifined } from "../utils/common"
import { IAppInfo } from "./appInfo"

export default function Calculator(appInfo: IAppInfo, _args: any) {
  const width = 380, height = 500, padding = 50

  const store = createStore('notepad', {
    top: padding,
    left: screenInfo.width - width - padding,
  })

  let { top, left } = store.getStates()

  if (top > screenInfo.height - taskbarHeight - titlebarHeight) {
    top = padding
  }

  if (left > screenInfo.width - width - padding) {
    left = screenInfo.width - width - padding
  }

  let win: IWindow,
    content: HTMLElement

  const modeSelect = Select({
    options: [
      { id: 'standard', value: 'standard', text: 'Standard' },
      { id: 'scientific', value: 'scientific', text: 'Scientific' },
      { id: 'programmer', value: 'programmer', text: 'Programmer' }
    ],
    value: 'standard',
    noBackground: true,
    onChange(item) {
      getContent(item.value)
      win.setContent(content)
    }
  })

  win = Window({
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    titlebarHeight: 36,
    titlebarContent: modeSelect.element,
    top,
    left,
    width,
    height,
    transprencyContent: true,
    disableResize: true,
    disableMaximize: true
  })

  win.addEventListener('dragend', (bounds: WindowBounds) => {
    store.setState({ top: bounds.top, left: bounds.left })
  })

  win.addEventListener('focus', () => {
    content.focus()
  })

  getContent('standard')

  win.setContent(content)

  function getContent(option: string) {
    switch (option) {
      case 'standard':
        content = standardContent()
        break
      case 'scientific':
        content = scientificContent()
        break
      case 'programmer':
        content = programmerContent()
        break
      default:
        content = standardContent()
        break
    }
  }

  function createCalculatorButton(
    options: {
      type: string,
      value: string,
      content: string
    },
    onclick: (operator: string, content: string) => void
  ) {
    return createElement('div', {
      className: 'calculator-button flex flex-1 items-center content-center' + (options.type === 'number' ? ' emphasis' : ''),
      onclick: onclick.bind(null, options.type, options.value),
      innerHTML: options.content
    })
  }

  function standardContent() {
    let resultElem: HTMLElement,
      resultElemContainer: HTMLElement,
      inputElem: HTMLElement

    let previous = '', current = '', operator = ''

    let fontSize = 48

    function compute() {
      let _result
      const _previous = parseFloat(previous)
      let _current = parseFloat(current)

      if (isNaN(_previous) || isNaN(_current)) {
        return
      }

      switch (operator) {
        case '+':
          _result = _previous + _current
          break
        case '-':
          _result = _previous - _current
          break
        case 'x':
          _result = _previous * _current
          break
        case '/':
          _result = _previous / _current
          break
        default:
          break
      }

      current = _result.toString()
      operator = null
      previous = ''
    }

    function clear() {
      previous = ''
      operator = ''
      _delete()
    }

    function _delete() {
      current = '0'
      resultElemContainer.style.removeProperty('font-size')
    }

    function getDisplayNumber(number: number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }

    function appendNumber(number: string) {
      if (number === '.' && current.includes('.')) return

      current = current.toString() + number.toString()
    }

    function chooseOperation(operation: string) {
      if (current === '') return
      if (previous !== '') {
        compute()
      }
      operator = operation
      previous = current
      current = ''
    }

    function updateFontSize(size: number) {
      if (resultElemContainer.scrollWidth > resultElemContainer.offsetWidth) {
        size -= 2

        resultElemContainer.style.fontSize = size + 'px'

        updateFontSize(size)
      }
    }

    function updateDisplay() {
      resultElem.textContent = getDisplayNumber(parseFloat(current))

      updateFontSize(fontSize)

      if (isNotNullOrUndifined(operator)) {
        inputElem.textContent = `${getDisplayNumber(parseFloat(previous))} ${operator}`
      }
      else {
        inputElem.textContent = ''
      }
    }

    function onclick(_type: string, _value: string) {
      if (_type === 'number') {
        appendNumber(_value)
        updateDisplay()
      }
      else if (_type === 'operator') {
        chooseOperation(_value)
        updateDisplay()
      }
      else if (_type === 'command') {
        switch (_value) {
          case 'c':
            clear()
            break
          case 'ce':
            _delete()
            break
          case '=':
            compute()
            break
          case 'sqrt':
            current = Math.sqrt(parseFloat(current)).toString()
            break
          case 'negative':
            current = (parseFloat(current) * -1).toString()
            break
          default:
            break
        }

        updateDisplay()
      }
    }

    function onkeydown(event: KeyboardEvent) {
      let patternForNumbers = /[0-9]/g
      let patternForOperators = /[+\-*\/]/g
      if (event.key.match(patternForNumbers)) {
        event.preventDefault();
        appendNumber(event.key)
        updateDisplay()
      }
      if (event.key === '.') {
        event.preventDefault();
        appendNumber(event.key)
        updateDisplay()
      }
      if (event.key.match(patternForOperators)) {
        event.preventDefault();
        chooseOperation(event.key)
        updateDisplay()
      }
      if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        compute()
        updateDisplay()
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        _delete()
        updateDisplay()
      }
      if (event.key === 'Delete') {
        event.preventDefault();
        clear()
        updateDisplay()
      }
    }

    return createElement('div', {
      tabIndex: -1,
      className: 'w-full h-full flex flex-col',
      onkeydown
    },
      [
        createElement('div', {
          className: 'w-full calculator-display flex flex-col'
        },
          [
            inputElem = createElement('div', {
              className: 'calculator-display-input flex items-center content-end'
            }),
            resultElemContainer = createElement('div', {
              className: 'calculator-display-result flex-1 flex items-center content-end no-scrollbar'
            },
              resultElem = createElement('div', {
                className: 'w-full'
              }, '0')
            )

          ]
        ),
        createElement('div', {
          className: 'w-full h-full calculator-buttons flex flex-col'
        },
          [
            createElement('div', {
              className: 'w-full calculator-buttons-row flex flex-1'
            },
              [
                createCalculatorButton({
                  type: 'command', value: 'sqrt',
                  content: `<svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M277.7 843.7h-35.6L93.6 483.2h-76V445h105.6l132.6 330.4 159.6-635.1h37.8L277.7 843.7zM831.6 773.7L697.7 578.8 563.4 773.7h-45.1l155.4-223.6-148.1-212.5h46.8l125.3 183.7 124.9-183.7h47.2L722.2 549.2l157.1 224.4h-47.7z"  /><path d="M984.5 176h-568v-37.1h568V176z"  /></svg>`
                }, onclick),
                createCalculatorButton({ type: 'command', value: 'ce', content: 'CE' }, onclick),
                createCalculatorButton({ type: 'command', value: 'c', content: 'C' }, onclick),
                createCalculatorButton({
                  type: 'operator', value: '/',
                  content: '/'
                }, onclick),
              ]
            ),
            createElement('div', {
              className: 'w-full calculator-buttons-row flex flex-1'
            },
              [
                createCalculatorButton({
                  type: 'number', value: '7',
                  content: '7'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '8',
                  content: '8'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '9',
                  content: '9'
                }, onclick),
                createCalculatorButton({
                  type: 'operator', value: 'x',
                  content: '&#215;'
                }, onclick)
              ]
            ),
            createElement('div', {
              className: 'w-full calculator-buttons-row flex flex-1'
            },
              [
                createCalculatorButton({
                  type: 'number', value: '4',
                  content: '4'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '5',
                  content: '5'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '6',
                  content: '6'
                }, onclick),
                createCalculatorButton({
                  type: 'operator', value: '-',
                  content: '&#8722;'
                }, onclick)
              ]
            ),
            createElement('div', {
              className: 'w-full calculator-buttons-row flex flex-1'
            },
              [
                createCalculatorButton({
                  type: 'number', value: '1',
                  content: '1'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '2',
                  content: '2'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '3',
                  content: '3'
                }, onclick),
                createCalculatorButton({
                  type: 'operator', value: '+',
                  content: '+'
                }, onclick)
              ]
            ),
            createElement('div', {
              className: 'w-full calculator-buttons-row flex flex-1'
            },
              [
                createCalculatorButton({
                  type: 'command', value: 'negative',
                  content: '+/-'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '0',
                  content: '0'
                }, onclick),
                createCalculatorButton({
                  type: 'number', value: '.',
                  content: '.'
                }, onclick),
                createCalculatorButton({
                  type: 'command', value: '=',
                  content: '='
                }, onclick)
              ]
            ),
          ]
        )
      ]
    )
  }

  function scientificContent() {
    return createElement('div', {
      className: 'w-full h-full flex content-center items-center'
    },
      createElement('h1', {}, 'Scientific Calculator')
    )
  }

  function programmerContent() {
    return createElement('div', {
      className: 'w-full h-full flex content-center items-center'
    },
      createElement('h1', {}, 'Programmer Calculator')
    )
  }
}
