import createElement from "../createElement"

export type onCheckBoxChange = (checked: boolean, name: string) => void

export default function CheckBox(label: string, checked: boolean, onchange?: Partial<onCheckBoxChange>) {
  let checkboxElem: HTMLInputElement

  const checkbox = createElement('div', {
    className: 'checkbox'
  },
    createElement('label', {
      type: 'checkbox',
      className: 'text'
    },
      [
        checkboxElem = createElement('input', {
          type: 'checkbox',
          className: 'checkbox-input',
          checked: checked,
          onchange
        }),
        createElement('div', {
          className: 'checkbox-label'
        }, label)
      ]
    )
  )

  function setChecked(checked: boolean) {
    checkboxElem.checked = checked
  }

  return {
    element: checkbox,
    setChecked
  }
}
