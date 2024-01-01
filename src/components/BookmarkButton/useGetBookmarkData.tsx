import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const useBookmark = (indicatorId: string, countryId?: string) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  const { country, id } = useParams()

  const handleBookmark = async () => {
    setIsBookmarked((prev) => !prev)

    await axios.post('/api/bookmark', { country, indicator: id })
  }

  useEffect(() => {
    ;(async () => {
      try {
        await axios.get('/api/bookmark', { params: { countryId, indicatorId } })

        setIsBookmarked(true)
      } catch (e: any) {
        if (e?.response?.status === 404) {
          setIsBookmarked(false)
        }
      }
    })()
  }, [])

  return { handleBookmark, isBookmarked }
}

export default useBookmark
