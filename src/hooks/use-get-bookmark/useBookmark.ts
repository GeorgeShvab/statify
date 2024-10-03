import { useEffect, useState } from "react"
import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus"
import { bookmarkDataset, getBookmarkedDataset } from "@/api/public"

const useBookmark = (indicator: string, country?: string) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  const handleBookmark = async () => {
    setIsBookmarked((prev) => !prev)

    await bookmarkDataset({ country, indicator })
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        await getBookmarkedDataset({ country, indicator })

        setIsBookmarked(true)
      } catch (e: unknown) {
        if (isErrorWithStatus(e) && e.response.status === 404) {
          setIsBookmarked(false)
        }
      }
    }

    fetch()
  }, [indicator, country])

  return { handleBookmark, isBookmarked }
}

export default useBookmark
