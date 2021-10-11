type EventHandle = (data?: any) => any

interface IEventIdIndex {
  [eventId: string]: EventHandle
}

interface IEventListenerIndex {
  [eventName: string]: IEventIdIndex
}

const listeners: IEventListenerIndex = {}

export function listenEvent(name: string, id: string, func: EventHandle) {
  if (typeof listeners[name] === 'undefined') {
    listeners[name] = Object.create(null)
  }

  listeners[name][id] = func
}

export function triggerEvent(name: string, data?: any) {
  if (typeof listeners[name] === 'undefined') return

  for (let key in listeners[name]) {
    listeners[name][key](data)
  }
}

export function removeEvent(name: string, id: string) {
  delete listeners[name][id]
}

export function removeEventsByName(name: string) {
  delete listeners[name]
}
