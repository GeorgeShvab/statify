function prettifyValue(number: number | string, precition: number = 0) {
  return String(precition ? Number(number).toFixed(precition) : Math.round(Number(number))).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' '
  )
}

export default prettifyValue
