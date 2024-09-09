import throttle from "@/utils/throttle/throttle"
import { useCallback, useState, UIEvent } from "react"

interface State {
  isAtStart: boolean
  isAtEnd: boolean
}

// Hook to determine if element is scrolled
const useScroll = () => {
  const [state, setState] = useState<State>({ isAtStart: true, isAtEnd: false })

  const handleScroll = useCallback(
    throttle((e: UIEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
      const scrollTop = e.target.scrollTop

      if (scrollTop < 50) {
        setState({ isAtEnd: false, isAtStart: true })
      } else if (
        scrollTop + e.target.offsetHeight >
        e.target.scrollHeight - 50
      ) {
        setState({ isAtEnd: true, isAtStart: false })
      } else {
        setState({ isAtEnd: false, isAtStart: false })
      }
    }, 75),
    []
  )

  return [state, handleScroll] as const
}

export default useScroll
