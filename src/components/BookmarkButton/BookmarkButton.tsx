'use client'

import IconButton from '@/ui/IconButton/IconButton'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface Props {
  isBookmarked: boolean
}

const BookmarkButton: FC<Props> = (props) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(props.isBookmarked)

  const router = useRouter()

  const { country, id } = useParams()

  const handleBookmark = async () => {
    setIsBookmarked((prev) => !prev)

    console.log(country, id)

    const { data } = await axios.post('/api/bookmark', { country, indicator: id })

    router.prefetch('/bookmarks')
  }

  return (
    <IconButton
      className={'absolute right-2.5 top-2 md:right-5 md:top-4 !bg-transparent !text-black'}
      onClick={handleBookmark}
      aria-label={isBookmarked ? 'Bookmark' : 'Unbookmark'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 transition-all"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </IconButton>
  )
}

export default BookmarkButton
