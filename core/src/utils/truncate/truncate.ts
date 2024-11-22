const truncate = (string: string, words: number = 50) => {
  const wordsArr = string.split(" ")

  let result = string

  if (wordsArr.length > words) {
    result = wordsArr.slice(0, words).join(" ") + "..."
  }

  return result
}

export default truncate
