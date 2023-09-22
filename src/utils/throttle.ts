function throttle(fn: (...args: any[]) => void, ms: number) {
  let throttled = false
  let savedThis: any
  let savedArgs: any

  function wrapper(this: any, ...args: any[]) {
    if (throttled) {
      savedArgs = args
      savedThis = this
      return
    }

    fn.apply(this, args)
    throttled = true

    setTimeout(() => {
      throttled = false

      if (savedArgs || savedThis) {
        wrapper.apply(savedThis, savedArgs)

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
