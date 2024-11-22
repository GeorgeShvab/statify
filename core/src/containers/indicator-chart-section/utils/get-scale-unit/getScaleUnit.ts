const shorteningScales = {
  1000000000000: "Trillions of ",
  1000000000: "Billions of ",
  1000000: "Millions of ",
  1000: "Thousands of ",
}

const getShorteningPrefix = (shortening: number) =>
  shorteningScales[shortening as keyof typeof shorteningScales] ?? ""

export default getShorteningPrefix
