import createElement from "../../createElement";

interface IToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  showLabel?: boolean
}

export default function Toggle(props: IToggleProps) {
  let _checked: boolean = false
  let element: HTMLElement

  element = createElement('div', {
    className: 'toggle',
    onclick: () => {
      toggleChecked()
      if (props.onChange) {
        props.onChange(_checked)
      }
    }
  },
    [
      createElement('div', {
        className: 'toggle-button'
      }),
      createElement('div', {
        className: 'toggle-indicator'
      }),
      props.showLabel
        ? createElement('div', {
          className: 'toggle-label'
        }, props.label)
        : null
    ]
  )

  setChecked(props.checked)

  function toggleChecked() {
    _checked = !_checked
    element.classList.toggle('checked', _checked)
  }

  function setChecked(checked: boolean) {
    _checked = checked
    element.classList.toggle('checked', _checked)
  }

  return {
    element,
    get checked() {
      return _checked
    },
    set checked(value: boolean) {
      setChecked(value)
    }
  }
}
