import { Position, PositionOptions } from '@/types'

export default function calculatePosition(
  anchorDomRect: DOMRect,
  elementDomRect: DOMRect,
  position: Position | PositionOptions
) {
  let pos

  if (typeof position === 'object') {
    const windowWidth = window.innerWidth
    pos = position.default

    Object.keys(position)
      .sort((a, b) => Number(b) - Number(a))
      .forEach((key) => {
        if (Number(key) > windowWidth) {
          pos = position[Number(key)]
        }
      })
  } else {
    pos = position
  }

  switch (pos) {
    case 'left-bottom':
      return { x: anchorDomRect.x - elementDomRect.width, y: anchorDomRect.y }
    case 'left-top':
      return {
        x: anchorDomRect.x - elementDomRect.width,
        y: anchorDomRect.y + anchorDomRect.height - elementDomRect.height,
      }
    case 'left-center':
      return {
        x: anchorDomRect.x - elementDomRect.width,
        y: anchorDomRect.y + anchorDomRect.height / 2 - elementDomRect.height / 2,
      }
    case 'right-bottom':
      return { x: anchorDomRect.x + anchorDomRect.width, y: anchorDomRect.y }
    case 'right-top':
      return {
        x: anchorDomRect.x + anchorDomRect.width,
        y: anchorDomRect.y + anchorDomRect.height - elementDomRect.height,
      }
    case 'right-center':
      return {
        x: anchorDomRect.x + anchorDomRect.width,
        y: anchorDomRect.y + anchorDomRect.height / 2 - elementDomRect.height / 2,
      }
    case 'top-left':
      return {
        x: anchorDomRect.x + anchorDomRect.width - elementDomRect.width,
        y: anchorDomRect.y - elementDomRect.height,
      }
    case 'top-right':
      return {
        x: anchorDomRect.x,
        y: anchorDomRect.y - elementDomRect.height,
      }
    case 'top-center':
      return {
        x: anchorDomRect.x + anchorDomRect.width / 2 - elementDomRect.width / 2,
        y: anchorDomRect.y - elementDomRect.height,
      }
    case 'bottom-left':
      return {
        x: anchorDomRect.x + anchorDomRect.width - elementDomRect.width,
        y: anchorDomRect.y + anchorDomRect.height,
      }
    case 'bottom-right':
      return {
        x: anchorDomRect.x,
        y: anchorDomRect.y + anchorDomRect.height,
      }
    case 'bottom-center':
      return {
        x: anchorDomRect.x + anchorDomRect.width / 2 - elementDomRect.width / 2,
        y: anchorDomRect.y + anchorDomRect.height,
      }
    default:
      return null as never
  }
}
