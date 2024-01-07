import { FC, ReactElement, RefObject, useLayoutEffect, useRef, useState } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactElement | ReactElement[]
  isOpen: boolean
  onClose: () => void
  anchor: RefObject<HTMLElement>
  className?: string
  renderHidden?: boolean
}

interface Position {
  x: number | undefined
  y: number | undefined
}

const Dropdown: FC<Props> = ({ children, isOpen, onClose, anchor, renderHidden, className = '' }) => {
  const containerEl = useRef<HTMLDivElement>(null)

  const close = () => onClose()

  useOutsideClick(close, [containerEl, anchor])

  const [position, setPosition] = useState<Position>({ x: undefined, y: undefined })

  useLayoutEffect(() => {
    const anchorPosition = anchor.current?.getBoundingClientRect()

    if (anchorPosition) {
      setPosition({ x: anchorPosition?.x + anchorPosition?.width, y: anchorPosition?.y + anchorPosition?.height })
    }
  }, [isOpen])

  if (!renderHidden && !isOpen) return null

  return createPortal(
    <div
      className={`absolute z-10 ${renderHidden && !isOpen ? 'hidden' : ''}`}
      ref={containerEl}
      style={{ left: position.x, top: position.y }}
    >
      <div className="overflow-hidden absolute top-full right-0 min-w-full rounded-lg border bg-white">
        <ul className={`max-h-[300px] overflow-auto pretty-scrollbar ${className}`}>{children}</ul>
      </div>
    </div>,
    document?.body
  )
}

export default Dropdown
