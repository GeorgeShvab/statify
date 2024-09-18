const validateQueryParam = <T extends readonly string[] | string[]>(
  value: unknown,
  possibleValues: T
): T[number] => {
  if (typeof value === "string" && possibleValues.includes(value)) return value

  return possibleValues[0]
}

export default validateQueryParam
