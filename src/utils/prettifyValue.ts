const prettifyValue = (number: number | string, fractionCeiling: number = 10) => {
  const num =
    Number(number) > fractionCeiling
      ? Math.round(Number(number))
      : Number(number) > 1
      ? Number(number).toFixed(2)
      : Number(number).toFixed(3)

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default prettifyValue
