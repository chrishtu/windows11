import createElement from "../../createElement"

interface IFileButtonProps {
  className?: string
  onChange?(e: KeyboardEvent): void
  children?: any
  accept?: string
}

export default function FileButton(props: IFileButtonProps) {
  let buttonElem = createElement('label', {
    className: 'button ' + (props.className || ''),
  },
    [
      createElement('input', {
        type: 'file',
        accept: props.accept || '',
        className: 'button ' + (props.className || ''),
        style: {
          display: 'none'
        },
        onchange: props.onChange,
      }),
      props.children
    ]
  )

  return buttonElem
}
