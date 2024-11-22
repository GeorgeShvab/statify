import { SidePosition } from "@/components/absolute-position/AbsolutePosition.types"
import { CalculatePositionReturnValue } from "@/utils/calculate-position/types"

const extraSpace = 25 // Minimum space that should be between element and edge of a page

const calculatePosition = (
  anchorPos: DOMRect,
  containerPos: DOMRect,
  position: SidePosition,
  offset: number = 0,
  isRecursed: boolean = false
): CalculatePositionReturnValue => {
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

  const documentHeight = document.documentElement.scrollHeight
  const documentWidth = document.documentElement.scrollWidth

  switch (position) {
    case "bottom":
      top += anchorBottom + offset
      left += anchorLeft + anchorWidth / 2 - containerWidth / 2
      break
    case "bottom-start":
      top += anchorBottom + offset
      left += anchorLeft
      break
    case "bottom-end":
      top += anchorBottom + offset
      left += anchorLeft + anchorWidth - containerWidth
      break
    case "top":
      top += anchorTop - offset - containerHeight
      left += anchorLeft + anchorWidth / 2 - containerWidth / 2
      break
    case "top-start":
      top += anchorTop - offset - containerHeight
      left += anchorLeft
      break
    case "top-end":
      top += anchorTop - offset - containerHeight
      left += anchorLeft + anchorWidth - containerWidth
      break
    case "left":
      top += anchorTop + anchorHeight / 2 - containerHeight / 2
      left += anchorLeft - offset - containerWidth
      break
    case "left-start":
      top += anchorTop
      left += anchorLeft - offset - containerWidth
      break
    case "left-end":
      top += anchorTop + anchorHeight - containerHeight
      left += anchorLeft - offset - containerWidth
      break
    case "right":
      top += anchorTop + anchorHeight / 2 - containerHeight / 2
      left += anchorRight + offset
      break
    case "right-start":
      top += anchorTop
      left += anchorRight + offset
      break
    case "right-end":
      top += anchorTop + anchorHeight - containerHeight
      left += anchorRight + offset
      break
    default:
      return {} as never
  }

  // Сheck whether there is enough space to place the element
  // If there is not enough space, position element from the oposite side
  // IsRecursed is used to prevent inifnite recursion
  if (!isRecursed) {
    if (position.includes("top") && top - extraSpace < 0) {
      return calculatePosition(
        anchorPos,
        containerPos,
        position.replace("top", "bottom") as SidePosition,
        offset,
        true
      )
    }

    if (
      position.includes("bottom") &&
      top + containerHeight + extraSpace > documentHeight
    ) {
      return calculatePosition(
        anchorPos,
        containerPos,
        position.replace("bottom", "top") as SidePosition,
        offset,
        true
      )
    }

    if (position.includes("left") && left - extraSpace < 0) {
      return calculatePosition(
        anchorPos,
        containerPos,
        position.replace("left", "right") as SidePosition,
        offset,
        true
      )
    }

    if (
      position.includes("right") &&
      left + containerWidth + extraSpace > documentWidth
    ) {
      return calculatePosition(
        anchorPos,
        containerPos,
        position.replace("right", "left") as SidePosition,
        offset
      )
    }
  }

  return {
    top,
    left,
  }
}

export default calculatePosition
