"use client"

import { FC } from "react"
import { DropdownProps } from "@/ui/dropdown/Dropdown.types"
import AbsolutePosition from "@/components/absolute-position/AbsolutePosition"
import dynamic from "next/dynamic"
import "@/ui/dropdown/styles.scss"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import cn from "@/utils/cn/cn"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

const Dropdown: FC<DropdownProps> = ({
  children,
  anchor,
  isOpen,
  position,
  onClose,
  className,
  ...props
}) => {
  if (!isOpen) return null

  return (
    <Portal>
      <DetectOutsideClick onOutsideClick={onClose}>
        <AbsolutePosition
          anchor={anchor}
          dependenciesForRecalculation={[isOpen]}
          position={position}
          offset={5}
        >
          <ul className={cn("dropdown", "light", className)} {...props}>
            {children}
          </ul>
        </AbsolutePosition>
      </DetectOutsideClick>
    </Portal>
  )
}

export default Dropdown
