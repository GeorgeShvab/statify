import throttle from '@/utils/throttle'
import { useCallback, useState, UIEvent } from 'react'

// Hook to determine if element is scrolled
const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>()

  const handleScroll = useCallback(
    throttle((e: UIEvent<HTMLDivElement>) => {
      const scrollTop = (e.target as HTMLDivElement).scrollTop

      if (scrollTop > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }, 75),
    []
  )

  return [isScrolled, handleScroll] as const
}

export default useScroll
