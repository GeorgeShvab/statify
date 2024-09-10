import { FC, ReactNode, useEffect } from "react"
import AnimationWrapper from "@/components/hanimation/AnimationWrapper"
import OpacityAnimation from "@/components/hanimation/OpacityAnimation"
import dynamic from "next/dynamic"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

interface Props {
  children: ReactNode
  opened: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ children, opened, onClose }) => {
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [opened])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "27") return
      onClose()
    }

    window.addEventListener("keyup", handleKeyDown)

    return () => {
      window.removeEventListener("keyup", handleKeyDown)
    }
  }, [])

  return (
    <Portal>
      <AnimationWrapper ms={250} open={opened}>
        <OpacityAnimation>
          <div>
            <div
              className="fixed top-0 left-0 bottom-0 right-0 bg-black/25 z-20"
              onClick={onClose}
            />
            <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30">
              {children}
            </div>
          </div>
        </OpacityAnimation>
      </AnimationWrapper>
    </Portal>
  )
}

export default Modal
