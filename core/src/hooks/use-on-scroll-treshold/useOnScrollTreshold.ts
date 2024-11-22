import { useEffect, useRef } from "react"
import { ScrollTresholdConfig } from "@/hooks/use-on-scroll-treshold/types"
import throttle from "@/utils/throttle/throttle"

const useOnScrollTreshold = <TElement extends HTMLElement>(
  func: () => void,
  { treshold, ms = 500, deps = [], callLastIgnored }: ScrollTresholdConfig
) => {
  const ref = useRef<TElement>(null)

  useEffect(() => {
    const handleOnScroll = () => {
      if (ref.current) {
        const anchorPos = ref.current?.getBoundingClientRect()

        const scrolled = -anchorPos.top + window.innerHeight

        if (anchorPos.height - scrolled < treshold) func()
      }
    }

    const throttledScroll = throttle(handleOnScroll, ms, callLastIgnored)

    document.addEventListener("scroll", throttledScroll)

    return () => {
      document.removeEventListener("scroll", throttledScroll)
    }
  }, deps)

  return ref
}

export default useOnScrollTreshold
