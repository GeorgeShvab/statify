'use client'

import { FC } from 'react'
import useBookmark from '@/components/BookmarkButton/useGetBookmarkData'
import DropdownItem from '@/ui/Dropdown/DropdownItem'
import BookmarkedIcon from '@/ui/Icons/BookmarkedIcon'
import BookmarkIcon from '@/ui/Icons/BookmarkIcon'

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
        role='button'
        onClick={handleBookmark}
        icon={
          isBookmarked ? (
            <BookmarkedIcon className='w-5 h-5 transition-all' />
          ) : (
            <BookmarkIcon className='w-5 h-5 transition-all' />
          )
        }
      >
        {isBookmarked ? 'Unbookmark' : 'Bookmark'}
      </DropdownItem>
    </>
  )
}

export default BookmarkButton
