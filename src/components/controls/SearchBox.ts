import createElement from "../../createElement";
import { searchIcon } from "../icons/icons";
import TextBox from "./TextBox";

interface SearchBoxOptions {
  placeholder?: string
  value?: string
  onChange?(value: string): void
}

export default function SearchBox(options: SearchBoxOptions) {
  const textBox = TextBox({
    placeholder: options.placeholder,
    value: options.value,
    onChange: options.onChange,
    optional: () => {
      return createElement('div', {
        className: 'search-box-icon flex items-center content-center',
        innerHTML: searchIcon
      })
    }
  })

  return {
    element: textBox.element
  }
}
