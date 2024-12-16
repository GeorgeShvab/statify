import {
  FC,
  ReactElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react"

interface Props {
  children: ReactElement
  show: boolean
  wrapper?: ReactElement
  duration?: number
}

const DelayWrapper: FC<Props> = ({
  children,
  show,
  wrapper,
  duration = 400,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const closeTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearTimeout(closeTimer.current)

    if (show) {
      setIsMounted(true)

      // In case while closing opening occurs, than we immediatly set visible
      if (isMounted && !isVisible) {
        setIsVisible(true)
      }
    } else {
      setIsVisible(false)

      closeTimer.current = setTimeout(() => {
        setIsMounted(false)
      }, duration)
    }
  }, [show])

  useEffect(() => {
    if (isMounted) {
      setIsVisible(true)
    }
  }, [isMounted])

  if (!isMounted) return null

  return wrapper
    ? cloneElement(wrapper, { show: isVisible, duration }, children)
    : children
}

export default DelayWrapper
