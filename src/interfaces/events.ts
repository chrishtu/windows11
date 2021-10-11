import { Cordinate } from "./window";

export interface DragEvents {
  onDragStart?: () => void,
  onDrag?: (cordinate: Cordinate) => void,
  onDragEnd?: (element: Node) => void
}

export interface ResizeEvents {
  onResizeStart?: () => void,
  onResize?: () => void,
  onResizeEnd?: () => void
}
