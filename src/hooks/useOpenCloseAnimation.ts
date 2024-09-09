import { useState, useRef, useLayoutEffect, useEffect } from "react"

const useOpenCloseAnimation = (isOpen: boolean, ms: number = 250) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const time = useRef<NodeJS.Timeout>()

  useLayoutEffect(() => {
    clearTimeout(time.current)

    if (isOpen) {
      setIsMounted(true)
    } else if (!isOpen && isMounted) {
      time.current = setTimeout(() => {
        setIsMounted(false)
      }, ms)
    }
  }, [isOpen])

  useEffect(() => {
    if (isMounted && isOpen) {
      setIsVisible(true)
    } else if (isMounted && !isOpen) {
      setIsVisible(false)
    }
  }, [isMounted, open])

  return { isVisible, isMounted }
}

export default useOpenCloseAnimation
