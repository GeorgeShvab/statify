import throttle from '@/utils/throttle'
import { useEffect } from 'react'

const useOnScroll = (cb: (e: WheelEvent) => void, dependencyArray: any[] = []) => {
  const handleWheel = throttle((e: WheelEvent) => cb(e), 50)

  useEffect(() => {
    document.addEventListener('wheel', handleWheel)

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [dependencyArray])
}

export default useOnScroll
