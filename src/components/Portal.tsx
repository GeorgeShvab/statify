import { FC, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
}

const Portal: FC<Props> = ({ children }) => {
  const container = useRef(document.querySelector('#portal')!)

  return createPortal(children, container.current)
}

export default Portal
