import { FC, ReactElement, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactElement
  opened: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ children, opened, onClose }) => {
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [opened])

  if (!opened) return null

  return createPortal(
    <div>
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/25 z-20" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30">{children}</div>
    </div>,
    document.body
  )
}

export default Modal
