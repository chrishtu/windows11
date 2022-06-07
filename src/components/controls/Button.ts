import createElement from "../../createElement"

interface IButtonProps {
  className?: string
  onClick?: () => void
  children?: any
  variant?: "primary" | "secondary" | "tertiary"
  appearance?: "default" | "outline"
  type?: "button" | "submit" | "reset"
}

export default function Button(props: IButtonProps) {
  let buttonElem = createElement('button', {
    className: 'button ' + (props.className || ''),
  }, props.children)

  return buttonElem
}
