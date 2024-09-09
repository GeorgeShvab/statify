const debounce = (fn: (...args: any[]) => void, ms: number) => {
  let time: NodeJS.Timeout

  function wrapper(this: any, ...args: any[]) {
    clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }

  return wrapper
}

export default debounce
