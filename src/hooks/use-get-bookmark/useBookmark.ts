import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const useBookmark = (indicatorId: string, countryId?: string) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  const { country, id } = useParams()

  const handleBookmark = async () => {
    setIsBookmarked((prev) => !prev)

    await axios.post("/api/bookmark", { country, indicator: id })
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get("/api/bookmark", { params: { countryId, indicatorId } })

        setIsBookmarked(true)
      } catch (e: unknown) {
        if (isErrorWithStatus(e) && e.response.status === 404) {
          setIsBookmarked(false)
        }
      }
    }

    fetch()
  }, [indicatorId, countryId])

  return { handleBookmark, isBookmarked }
}

export default useBookmark
