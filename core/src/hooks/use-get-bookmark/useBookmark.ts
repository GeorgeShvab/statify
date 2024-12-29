import { useState } from "react"
import useMutation from "@/hooks/use-mutation/useMutation"
import useQuery from "@/hooks/use-query/useQuery"
import {
  getBookmark,
  getBookmarkWithCountry,
  createBookmark,
  removeBookmark,
  createBookmarkWithCountry,
  removeBookmarkWithCountry,
} from "@/api/public"

const useBookmark = (indicator: string, country?: string) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const queryFn = () =>
    country
      ? getBookmarkWithCountry({ indicator, country })
      : getBookmark({ indicator })

  useQuery(queryFn, {
    onSuccess: (res) => setIsBookmarked(res.isBookmarked),
  })

  const addBookmarkConfig = {
    onSuccess: () => setIsBookmarked(true),
  }

  const removeBookmarkConfig = {
    onSuccess: () => setIsBookmarked(false),
  }

  const [, addBookmarkWithCountry] = useMutation(
    createBookmarkWithCountry,
    addBookmarkConfig
  )

  const [, addBookmark] = useMutation(createBookmark, addBookmarkConfig)

  const [, deleteBookmarkWithCountry] = useMutation(
    removeBookmarkWithCountry,
    removeBookmarkConfig
  )

  const [, deleteBookmark] = useMutation(removeBookmark, removeBookmarkConfig)

  const handleBookmark = () => {
    if (isBookmarked) {
      if (country) return deleteBookmarkWithCountry({ country, indicator })

      return deleteBookmark({ indicator })
    }

    if (country) return addBookmarkWithCountry({ country, indicator })

    return addBookmark({ indicator })
  }

  return { handleBookmark, isBookmarked }
}

export default useBookmark
