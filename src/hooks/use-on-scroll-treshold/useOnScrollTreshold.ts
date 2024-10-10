import { useEffect, useRef } from "react"
import throttle from "@/utils/throttle/throttle"

const useOnScrollTreshold = <TElement extends HTMLElement>(
  func: (percents: number) => void,
  treshold: number,
  ms: number = 500
) => {
  const ref = useRef<TElement>(null)

  useEffect(() => {
    const handleOnScroll = () => {
      if (ref.current) {
        const anchorPos = ref.current?.getBoundingClientRect()

        const scrolledPercentage = (-anchorPos.top / anchorPos.height) * 100

        const nonNegativePercentage =
          scrolledPercentage < 0 ? 0 : scrolledPercentage

        const nonHigherThanHundredPercantage =
          nonNegativePercentage > 100 ? 100 : nonNegativePercentage

        if (nonHigherThanHundredPercantage >= treshold) {
          func(nonHigherThanHundredPercantage)
        }
      }
    }

    const throttledScroll = throttle(handleOnScroll, ms)

    document.addEventListener("scroll", throttledScroll)

    return () => {
      document.removeEventListener("scroll", throttledScroll)
    }
  }, [treshold, func])

  return ref
}

export default useOnScrollTreshold
