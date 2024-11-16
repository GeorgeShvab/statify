const searchInString = (searchedString: string, value: string) =>
  new RegExp(value, "gi").test(searchedString)

export default searchInString
