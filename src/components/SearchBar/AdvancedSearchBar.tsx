import Button from '@/ui/Button/Button'
import IconButton from '@/ui/IconButton/IconButton'
import SearchBar from './SearchBar'
import { FC } from 'react'

const AdvancedSearchBar: FC = () => {
  return (
    <div className="flex gap-1.5 md:gap-2.5 items-center w-full">
      <div className="flex-1">
        <SearchBar />
      </div>
      <Button href="/bookmarks" className="hidden md:flex flex-initial">
        Bookmarks
      </Button>
      <IconButton href="/bookmarks" className="md:hidden flex-initial" aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </IconButton>
    </div>
  )
}

export default AdvancedSearchBar
