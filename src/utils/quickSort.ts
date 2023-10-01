function quickSort<T = any>(array: T[], order: 'asc' | 'desc' = 'asc', fn?: (item: T) => number | string): T[] {
  if (array.length < 2) return array

  const pivot = array[Math.floor(array.length / 2)]
  const left = []
  const right = []

  array.splice(Math.floor(array.length / 2), 1)

  for (let i = 0; i < array.length; i++) {
    if (order === 'asc') {
      if ((fn ? fn(array[i]) : array[i]) < (fn ? fn(pivot) : pivot)) {
        left.push(array[i])
      } else {
        right.push(array[i])
      }
    } else {
      if ((fn ? fn(array[i]) : array[i]) > (fn ? fn(pivot) : pivot)) {
        left.push(array[i])
      } else {
        right.push(array[i])
      }
    }
  }

  return quickSort(left, order, fn).concat(pivot, quickSort(right, order, fn))
}

export default quickSort
