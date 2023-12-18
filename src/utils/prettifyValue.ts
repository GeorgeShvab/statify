function prettifyValue(number: number | string, precition: number = 0) {
  return precition ? Number(number).toFixed(precition) : Math.round(Number(number))
}

export default prettifyValue
