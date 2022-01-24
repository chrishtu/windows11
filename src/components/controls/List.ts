import createElement from "../../createElement";

type ListCallback<T> = (item: T) => HTMLDivElement

export default function List<T>(items: Array<T>, cb: ListCallback<T>) {
  let element = createElement('div', {
    className: 'list'
  },
    items.map(item => {
      return cb(item)
    })
  )

  return {
    element
  }
}
