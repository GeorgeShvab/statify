import useOpenCloseAnimation from "@/hooks/useOpenCloseAnimation"
import cn from "@/utils/cn"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  open: boolean
  renderHidden?: boolean
  ms?: number
}

const AnimationWrapper: FC<Props> = ({
  children,
  open,
  renderHidden = false,
  ms = 200,
}) => {
  const { isVisible, isMounted } = useOpenCloseAnimation(open, ms)

  if (!isMounted && !renderHidden) return null

  return (
    <div
      className={cn(
        isVisible ? "animation-active" : "animation-inactive",
        renderHidden && !isMounted && "invisible"
      )}
    >
      {children}
    </div>
  )
}

export default AnimationWrapper
