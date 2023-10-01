import { FC, ReactElement, cloneElement } from 'react'

interface Props {
  duration?: number
  show?: boolean
  children?: ReactElement
}

const Transition: FC<Props> = ({ duration = 400, children, show }) => {
  if (!children) return null

  console.log(show)

  return cloneElement(
    children,
    {
      ...children.props,
      className: `${children.props.className || ''} transition-all ${
        show ? 'translate-y-[20px] opacity-100' : 'translate-y-[-100px] opacity-0'
      }`,
      style: { ...children.props.style, transitionDuration: duration + 'ms' },
    },
    children?.props.children
  )
}

export default Transition
