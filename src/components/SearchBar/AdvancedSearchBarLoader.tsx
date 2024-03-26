import Button from '@/ui/Button/Button'
import IconButton from '@/ui/IconButton/IconButton'
import SearchBarLoader from './SearchBarLoader'
import BookmarkIcon from '@/ui/Icons/BookmarkIcon'

const AdvancedSearchBarLoader = () => {
  return (
    <div className="flex gap-1.5 md:gap-2.5 items-center w-full">
      <div className="flex-1">
        <SearchBarLoader />
      </div>
      <Button href="/bookmarks" className="hidden md:flex flex-initial">
        Bookmarks
      </Button>
      <IconButton href="/bookmarks" className="md:hidden flex-initial" aria-label="Search">
        <BookmarkIcon className="w-5 h-5" />
      </IconButton>
    </div>
  )
}

export default AdvancedSearchBarLoader
