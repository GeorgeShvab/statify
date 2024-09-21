import { RefObject, useEffect } from "react"

const useOutsideClick = (
  fn: (e: Event) => void,
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[]
) => {
  const handleClick = (e: MouseEvent) => {
    if (Array.isArray(ref)) {
      for (const element of ref) {
        if (
          element.current &&
          element.current?.contains(e.target as HTMLElement)
        ) {
          return
        }
      }
    } else {
      if (ref.current && ref.current?.contains(e.target as HTMLElement)) {
        return
      }
    }

    fn(e)
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)
    document.addEventListener("contextmenu", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("contextmenu", handleClick)
    }
  }, [])
}

export default useOutsideClick
