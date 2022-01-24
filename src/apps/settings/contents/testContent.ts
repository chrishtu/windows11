import createElement from "../../../createElement"

export default function TestContent() {
  let element = createElement('div', {}, 'In progress')

  function dispose() {
    element.remove()
    element = null
  }

  return {
    element,
    dispose
  }
}
