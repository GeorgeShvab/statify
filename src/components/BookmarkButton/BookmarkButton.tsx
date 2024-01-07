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
      <IconButton
        className="!bg-transparent !text-black transition-all md:hidden"
        onClick={handleBookmark}
        aria-label={isBookmarked ? 'Bookmark' : 'Unbookmark'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isBookmarked ? 'currentColor' : 'white'}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </IconButton>
      <DropdownItem
        className="hidden md:flex"
        aria-label={isBookmarked ? 'Bookmark' : 'Unbookmark'}
        role="button"
        onClick={handleBookmark}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isBookmarked ? 'currentColor' : 'transparent'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        }
      >
        {isBookmarked ? 'Unbookmark' : 'Bookmark'}
      </DropdownItem>
    </>
  )
}

export default BookmarkButton
