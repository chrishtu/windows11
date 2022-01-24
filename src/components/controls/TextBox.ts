import createElement from "../../createElement";

type TextBoxType = 'text' | 'number' | 'password'

type TextBoxElementFunction = (options?: TextBoxOtpions) => HTMLDivElement

type TextBoxElement = HTMLDivElement | TextBoxElementFunction

interface TextBoxOtpions {
  type?: TextBoxType
  placeholder?: string
  value?: string
  onChange?(value: string): void
  optional?: TextBoxElement
}

export default function TextBox(options: TextBoxOtpions) {
  let textBoxInput: HTMLInputElement

  let element = createElement('div', {
    tabIndex: -1,
    className: 'textbox flex items-center'
  },
    [
      textBoxInput = createElement('input', {
        type: options.type || 'text',
        className: 'textbox-input',
        placeholder: options.placeholder,
        oninput
      }),
      typeof options.optional === 'function' ? options.optional(options) : options.optional
    ]
  )

  function oninput() {
    if (typeof options.onChange === 'function') {
      options.onChange(textBoxInput.value)
    }
  }

  function setValue(value: string) {
    textBoxInput.value = value
  }

  return {
    element,
    setValue
  }
}
