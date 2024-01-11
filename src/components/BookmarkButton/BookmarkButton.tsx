'use client'

import IconButton from '@/ui/IconButton/IconButton'
import { FC } from 'react'
import useBookmark from './useGetBookmarkData'
import DropdownItem from '@/ui/Dropdown/DropdownItem'

interface Props {
  countryId?: string
  indicatorId: string
}

const BookmarkButton: FC<Props> = ({ indicatorId, countryId }) => {
  const { handleBookmark, isBookmarked } = useBookmark(indicatorId, countryId)

  return (
    <>
      <DropdownItem
        aria-label={isBookmarked ? 'Bookmark' : 'Unbookmark'}
        role="button"
        onClick={handleBookmark}
        icon={
          isBookmarked ? (
            <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" className="w-5 h-5 transition-all">
              <path d="M2 2v13.5a.5.5 0 00.74.439L8 13.069l5.26 2.87A.5.5 0 0014 15.5V2a2 2 0 00-2-2H4a2 2 0 00-2 2z" />
            </svg>
          ) : (
            <svg fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 transition-all">
              <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2zm2-1a1 1 0 00-1 1v12.566l4.723-2.482a.5.5 0 01.554 0L13 14.566V2a1 1 0 00-1-1H4z" />
            </svg>
          )
        }
      >
        {isBookmarked ? 'Unbookmark' : 'Bookmark'}
      </DropdownItem>
    </>
  )
}

export default BookmarkButton
