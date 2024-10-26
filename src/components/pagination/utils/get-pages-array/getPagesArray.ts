function getPagesArray(page: number, pages: number) {
  const pageArray = Array.from({ length: pages }, (_, index) => index + 1)

  const baseStartOffset = page - 3 <= 1 ? 4 : 3
  const baseEndOffset = page + 3 >= pages ? 3 : 2

  const startOffset = baseStartOffset + Math.max(0, 2 - (pages - page))
  const endOffset = baseEndOffset + Math.max(0, 3 - page)

  const startIndex = Math.max(0, page - startOffset)
  const endIndex = Math.min(pages, page + endOffset)

  return pageArray.slice(startIndex, endIndex)
}

export default getPagesArray
