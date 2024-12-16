import { FC, ReactElement, cloneElement } from "react"
import cn from "@/utils/cn/cn"
import "./styles.scss"

interface Props {
  duration?: number
  show?: boolean
  children?: ReactElement
}

const Transition: FC<Props> = ({ duration = 400, children, show }) => {
  if (!children) return null

  return cloneElement(
    children,
    {
      ...children.props,
      className: cn(
        children.props.className,
        "alert-transition",
        show && "show"
      ),
      style: { ...children.props.style, transitionDuration: duration + "ms" },
    },
    children?.props.children
  )
}

export default Transition
