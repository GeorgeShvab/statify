import { SidePosition } from "@/components/absolute-position/AbsolutePosition.types"

const calculatePosition = (
  anchorPos: DOMRect,
  containerPos: DOMRect,
  position: SidePosition,
  offset: number = 0
) => {
  const anchorLeft = anchorPos.left
  const anchorRight = anchorPos.right
  const anchorTop = anchorPos.top
  const anchorBottom = anchorPos.bottom

  const anchorWidth = anchorPos.width
  const anchorHeight = anchorPos.height

  const containerWidth = containerPos.width
  const containerHeight = containerPos.height

  let top = document.documentElement.scrollTop
  let left = document.documentElement.scrollLeft

  switch (position) {
    case "bottom":
      top = anchorBottom + offset
      left = anchorLeft + anchorWidth / 2 - containerWidth / 2
      break
    case "bottom-start":
      top = anchorBottom + offset
      left = anchorLeft
      break
    case "bottom-end":
      top = anchorBottom + offset
      left = anchorLeft + anchorWidth - containerWidth
      break
    case "top":
      top = anchorTop - offset - containerHeight
      left = anchorLeft + anchorWidth / 2 - containerWidth / 2
      break
    case "top-start":
      top = anchorTop - offset - containerHeight
      left = anchorLeft
      break
    case "top-end":
      top = anchorTop - offset - containerHeight
      left = anchorLeft + anchorWidth - containerWidth
      break
    case "left":
      top = anchorTop + anchorHeight / 2 - containerHeight / 2
      left = anchorLeft - offset - containerWidth
      break
    case "left-start":
      top = anchorTop
      left = anchorLeft - offset - containerWidth
      break
    case "left-end":
      top = anchorTop + anchorHeight - containerHeight
      left = anchorLeft - offset - containerWidth
      break
    case "right":
      top = anchorTop + anchorHeight / 2 - containerHeight / 2
      left = anchorRight + offset
      break
    case "right-start":
      top = anchorTop
      left = anchorRight + offset
      break
    case "right-end":
      top = anchorTop + anchorHeight - containerHeight
      left = anchorRight + offset

    default:
      return {} as never
  }

  return {
    top,
    left,
  }
}

export default calculatePosition
