const debounce = <T>(fn: (...args: T[]) => void, ms: number) => {
  let time: NodeJS.Timeout

  function wrapper(this: unknown, ...args: T[]) {
    clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }

  return wrapper
}

export default debounce
