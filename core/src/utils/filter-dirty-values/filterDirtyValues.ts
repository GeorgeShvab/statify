const filterDirtyValues = <TData extends object>(
  data: TData,
  dirtyValues: Partial<Record<keyof TData, undefined | boolean | boolean[]>>
) => {
  const result = (Object.keys(dirtyValues) as (keyof TData)[]).reduce(
    (acc, curr) => {
      if (dirtyValues[curr]) {
        return { ...acc, [curr]: data[curr] }
      }

      return acc
    },
    {}
  )

  return result as TData
}

export default filterDirtyValues
