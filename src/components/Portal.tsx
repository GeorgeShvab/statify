import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
}

const Portal: FC<Props> = ({ children }) => {
  return createPortal(<div className="portal">{children}</div>, document.getElementById('portals')!)
}

export default Portal
