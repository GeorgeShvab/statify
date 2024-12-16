const parseSearchParams = (searchParams: Record<string, string>) => {
  const parsedSearchParams = Object.keys(searchParams).reduce((acc, curr) => {
    const currValue = searchParams[curr]

    const queryValue = /,(?!\s)/.test(currValue)
      ? currValue.split(/,(?!\s)/)
      : currValue

    return {
      ...acc,
      [curr]: queryValue,
    }
  }, {})

  return parsedSearchParams
}

export default parseSearchParams
