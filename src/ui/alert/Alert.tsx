"use client"

import { FC } from "react"
import dynamic from "next/dynamic"
import { AlertProps } from "@/ui/alert/Alert.types"
import DelayWrapper from "@/ui/alert/DelayWrapper"
import Transition from "@/ui/alert/Transition"
import getAlertBackgorundColor from "@/ui/alert/utils/getAlertBackgroundColor"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

const Alert: FC<AlertProps> = ({ show, text, severity }) => {
  const bg = getAlertBackgorundColor(severity)

  return (
    <Portal>
      <DelayWrapper show={show} wrapper={<Transition />}>
        <div
          className={`z-50 fixed top-0 left-1/2 translate-x-[-50%] rounded-lg px-4 py-2 transition-all ${bg}`}
        >
          <p className="text-white text-sm md:text-base text-center">{text}</p>
        </div>
      </DelayWrapper>
    </Portal>
  )
}

export default Alert
