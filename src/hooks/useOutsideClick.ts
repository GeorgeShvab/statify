import { RefObject, useEffect } from 'react'

const useOutsideClick = (fn: () => void, ref: RefObject<HTMLElement> | RefObject<HTMLElement>[]) => {
  const handleClick = (e: MouseEvent) => {
    if (Array.isArray(ref)) {
      for (let element of ref) {
        if (element.current && element.current?.contains(e.target as any)) {
          return
        }
      }
    } else {
      if (ref.current && ref.current?.contains(e.target as any)) {
        return
      }
    }

    fn()
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleClick)
    }
  }, [])
}

export default useOutsideClick
