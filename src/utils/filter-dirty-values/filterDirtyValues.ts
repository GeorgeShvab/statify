const filterDirtyValues = <TData extends object>(
  data: TData,
  dirtyValues: Partial<Record<keyof TData, undefined | boolean | boolean[]>>
) => {
  const result = (Object.keys(dirtyValues) as (keyof TData)[]).reduce(
    (acc, curr) => ({ ...acc, [curr]: data[curr] }),
    {}
  )

  return result as Partial<TData>
}

export default filterDirtyValues
