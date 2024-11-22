"use client"

import { FC } from "react"
import dynamic from "next/dynamic"
import { AlertProps } from "@/ui/alert/Alert.types"
import DelayWrapper from "@/ui/alert/DelayWrapper"
import Transition from "@/ui/alert/Transition"
import cn from "@/utils/cn/cn"
import "@/ui/alert/styles.scss"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

const Alert: FC<AlertProps> = ({ show, text, severity }) => {
  return (
    <Portal>
      <DelayWrapper show={show} wrapper={<Transition />}>
        <div className={cn("alert", severity)}>
          <p className="alert__text">{text}</p>
        </div>
      </DelayWrapper>
    </Portal>
  )
}

export default Alert
