import { FC, ReactNode } from 'react'
import './styles.css'

interface Props {
  children: ReactNode
}

const OpacityAnimation: FC<Props> = ({ children }) => {
  return <div className="opacity-animation">{children}</div>
}

export default OpacityAnimation
