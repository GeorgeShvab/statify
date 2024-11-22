const replaceSpecialCharacters = (value: string) => {
  return value.replace(/[^a-zA-Z0-9]/g, " ")
}

export default replaceSpecialCharacters
