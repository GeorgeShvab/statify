const validatePositiveNumber = <T extends number | null = null | number>(
  value: unknown,
  defaultValue?: T
) => {
  return (
    value !== null && !Number.isNaN(Number(value)) && Number(value) >= 0
      ? Number(value)
      : (defaultValue ?? null)
  ) as T
}

export default validatePositiveNumber
