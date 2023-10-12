const prettifyValue = (number: number | string) => {
  const num = Number(number) > 100 ? Math.round(Number(number)) : Number(number).toFixed(2)

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default prettifyValue
