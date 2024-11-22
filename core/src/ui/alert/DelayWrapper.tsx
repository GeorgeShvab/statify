import { FC, ReactElement, cloneElement, useEffect, useLayoutEffect, useState } from 'react'

interface Props {
  children: ReactElement
  show: boolean
  wrapper?: ReactElement
  duration?: number
}

const DelayWrapper: FC<Props> = ({ children, show, wrapper, duration = 400 }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [shown, setIsShown] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (show) {
      setIsMounted(true)
    } else {
      setIsShown(false)
      setTimeout(() => {
        setIsMounted(false)
      }, duration)
    }
  }, [show])

  useEffect(() => {
    if (isMounted) {
      setIsShown(true)
    }
  }, [isMounted])

  if (!isMounted) return null

  return wrapper ? cloneElement(wrapper, { show: shown, duration }, children) : children
}

export default DelayWrapper
