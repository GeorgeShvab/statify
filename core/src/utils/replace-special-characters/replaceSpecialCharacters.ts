const replaceSpecialCharacters = (value: string) => {
  return value.replace(/[^a-zA-Zа-яА-Я0-9]/g, " ")
}

export default replaceSpecialCharacters
