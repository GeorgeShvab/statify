function throttle<T, TThis = unknown>(fn: (...args: T[]) => void, ms: number) {
  let throttled = false
  let savedThis: TThis | undefined
  let savedArgs: T[] | undefined

  function wrapper(this: TThis, ...args: T[]) {
    if (throttled) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      savedThis = this
      savedArgs = args
      return
    }

    fn.apply(this, args)
    throttled = true

    setTimeout(() => {
      throttled = false

      if (savedArgs || savedThis) {
        wrapper.apply(savedThis as TThis, savedArgs as T[])

        savedArgs = savedThis = undefined

        throttled = true

        setTimeout(() => {
          throttled = false
        }, ms)
      }
    }, ms)
  }

  return wrapper
}

export default throttle
