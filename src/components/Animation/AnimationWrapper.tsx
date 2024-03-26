import { FC, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
  open: boolean
  renderHidden?: boolean
  ms?: number
}

const AnimationWrapper: FC<Props> = ({ children, open, renderHidden = false, ms = 200 }) => {
  const [isAnimationActive, setIsAnimationActive] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const time = useRef<NodeJS.Timeout>()

  useLayoutEffect(() => {
    if (open) {
      clearTimeout(time.current)
      setIsMounted(true)
    } else if (!open && isMounted) {
      time.current = setTimeout(() => {
        setIsMounted(false)
      }, ms)
    }
  }, [open])

  useEffect(() => {
    if (isMounted && open) {
      setIsAnimationActive(true)
    } else if (isMounted && !open) {
      setIsAnimationActive(false)
    }
  }, [isMounted, open])

  if (!isMounted && !renderHidden) return null

  return <div className={isAnimationActive ? 'animation-active' : 'animation-inactive'}>{children}</div>
}

export default AnimationWrapper
