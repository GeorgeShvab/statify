import { FC, ReactNode, useRef } from "react"
import { createPortal } from "react-dom"

interface Props {
  children: ReactNode
}

const Portal: FC<Props> = ({ children }) => {
  const container = useRef(document.querySelector("#portal")!)

  if (!container.current) {
    const el = document.createElement("div")
    el.id = "portal"
    document.body.appendChild(el)

    container.current = el
  }

  return createPortal(children, container.current)
}

export default Portal
