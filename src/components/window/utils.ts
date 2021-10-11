import { DragEvents, ResizeEvents } from "../../interfaces/events";

export function dragElement(elmnt: HTMLElement, dragTrigger: HTMLElement, events?: DragEvents) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  if (dragTrigger) {
    dragTrigger.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: MouseEvent) {
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
    if (events && typeof events.onDragStart === 'function') {
      events.onDragStart()
    }
  }

  function elementDrag(e: MouseEvent) {
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    let deltaX = elmnt.offsetTop - pos2
    let deltaY = elmnt.offsetLeft - pos1

    elmnt.style.top = deltaX + 'px';
    elmnt.style.left = deltaY + 'px';

    if (events && typeof events.onDrag === 'function') {
      events.onDrag({
        x: e.clientX,
        y: e.clientY
      })
    }
  }

  function closeDragElement() {
    if (events && typeof events.onDragEnd === 'function') {
      events.onDragEnd(elmnt)
    }
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export function resizeElem(elem: HTMLElement, trigger: HTMLElement, keepAspectRatio: boolean, aspectRatio: number, events?: ResizeEvents) {
  let _keepAspectRatio = keepAspectRatio
  let _aspectRatio = aspectRatio

  trigger.addEventListener('mousedown', initialiseResize, false)
  var curDirections: Array<string> = []

  let lastX = 0, lastY = 0, x = 0, y = 0, w = 0, h = 0,
    mOffX = 0, mOffY = 0,            // A known offset between position & mouse.
    minHeight = 0, minWidth = 0,
    minLeft: 0, maxLeft: 9999,       // Bounding box area, in pixels.
    minTop: 0, maxTop: 9999

  function initialiseResize(e: MouseEvent) {
    let elemStyle = window.getComputedStyle(elem)

    x = parseInt(elemStyle.left)
    y = parseInt(elemStyle.top)
    w = elem.offsetWidth
    h = elem.offsetHeight

    minHeight = parseInt(elemStyle.minHeight)
    minWidth = parseInt(elemStyle.minWidth)

    lastX = e.clientX
    lastY = e.clientY

    window.addEventListener('mousemove', startResizing, false)
    window.addEventListener('mouseup', stopResizing, false)
    var target = e.currentTarget as HTMLElement

    var determize = target.dataset.resize
    let cursorStyle = 'default'

    if (determize === 't') {
      curDirections = ['t']
      cursorStyle = 'ns-resize'
    }
    if (determize === 'l') {
      curDirections = ['l']
      cursorStyle = 'ew-resize'
    }
    if (determize === 'b') {
      curDirections = ['b']
      cursorStyle = 'ns-resize'
    }
    if (determize === 'r') {
      curDirections = ['r']
      cursorStyle = 'ew-resize'
    }
    if (determize === 'tl') {
      curDirections = ['t', 'l']
      cursorStyle = 'nw-resize'
    }
    if (determize === 'bl') {
      curDirections = ['b', 'l']
      cursorStyle = 'ne-resize'
    }
    if (determize === 'br') {
      curDirections = ['b', 'r']
      cursorStyle = 'nw-resize'
    }
    if (determize === 'tr') {
      curDirections = ['t', 'r']
      cursorStyle = 'ne-resize'
    }

    elem.classList.add('no-pointer-events')
    document.body.style.cursor = cursorStyle

    if (events && typeof events.onResizeStart === 'function') {
      events.onResizeStart()
    }
  }

  function startResizing(e: MouseEvent) {
    let deltaX = e.clientX - lastX + mOffX
    let deltaY = e.clientY - lastY + mOffY

    mOffX = 0
    mOffY = 0

    lastX = e.clientX
    lastY = e.clientY

    var dY = deltaY, dX = deltaX

    for (let index = 0; index < curDirections.length; index++) {
      const dr = curDirections[index]

      if (dr === 't') {
        if (h - dY < minHeight) mOffY = (dY - (deltaY = h - minHeight))
        else if (y + dY < minTop) mOffY = (dY - (deltaY = minTop - y))

        y += deltaY
        h -= deltaY

        if (_keepAspectRatio) {
          w = Math.round(h * _aspectRatio)
        }
      }

      if (dr === 'l') {
        if (w - dX < minWidth) mOffX = (dX - (deltaX = w - minWidth))
        else if (x + dX < minLeft) mOffX = (dX - (deltaX = minLeft - x))

        x += deltaX
        w -= deltaX

        if (_keepAspectRatio) {
          h = Math.round(w / _aspectRatio)
        }
      }

      if (dr === 'b') {
        if (h + dY < minHeight) mOffY = (dY - (deltaY = minHeight - h))
        else if (y + h + dY > maxTop) mOffY = (dY - (deltaY = maxTop - y - h))

        h += deltaY

        if (_keepAspectRatio) {
          w = Math.round(h * _aspectRatio)
        }
      }

      if (dr === 'r') {
        if (w + dX < minWidth) mOffX = (dX - (deltaX = minWidth - w))
        else if (x + w + dX > maxLeft) mOffX = (dX - (deltaX = maxLeft - x - w))

        w += deltaX

        if (_keepAspectRatio) {
          h = Math.round(w / _aspectRatio)
        }
      }
    }

    elem.style.top = y + 'px'
    elem.style.left = x + 'px'
    elem.style.width = w + 'px'
    elem.style.height = h + 'px'

    if (events && typeof events.onResize === 'function') {
      events.onResize()
    }
  }

  function stopResizing() {
    mOffX = 0
    mOffY = 0

    if (events && typeof events.onResizeEnd === 'function') {
      events.onResizeEnd()
    }

    elem.classList.remove('no-pointer-events')
    document.body.style.cursor = 'default'

    window.removeEventListener('mousemove', startResizing, false);
    window.removeEventListener('mouseup', stopResizing, false);
  }

  function setAspectRatio(ratio: number) {
    _aspectRatio = ratio
  }

  function setKeepAspectRatio(keep: boolean) {
    _keepAspectRatio = keep
  }

  return {
    setAspectRatio,
    setKeepAspectRatio
  }
}
