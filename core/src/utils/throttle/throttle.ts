function throttle<T extends unknown[], TThis = unknown>(
  fn: (...args: T) => void,
  ms: number,
  callLastIgnored: boolean = true
) {
  let throttled = false
  let savedThis: TThis | undefined
  let savedArgs: T | undefined

  function wrapper(this: TThis, ...args: T) {
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

      if ((savedArgs || savedThis) && callLastIgnored) {
        wrapper.apply(savedThis as TThis, savedArgs as T)

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
