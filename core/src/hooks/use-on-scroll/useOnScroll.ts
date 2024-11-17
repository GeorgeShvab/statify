import throttle from "@/utils/throttle/throttle"
import { DependencyList, useEffect } from "react"

const useOnScroll = (
  cb: (e: WheelEvent) => void,
  dependencyArray: DependencyList
) => {
  const handleWheel = throttle((e: WheelEvent) => cb(e), 50)

  useEffect(() => {
    document.addEventListener("wheel", handleWheel)

    return () => {
      document.removeEventListener("wheel", handleWheel)
    }
  }, [dependencyArray])
}

export default useOnScroll
