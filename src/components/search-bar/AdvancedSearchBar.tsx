import Button from "@/ui/dutton/Button"
import IconButton from "@/ui/icon-button/IconButton"
import SearchBar from "@/components/search-bar/SearchBar"
import { FC } from "react"
import BookmarkSmallerIcon from "@/ui/icons/BookmarkSmallerIcon"

const AdvancedSearchBar: FC = () => {
  return (
    <div className="flex gap-1.5 md:gap-2.5 items-center w-full">
      <div className="flex-1">
        <SearchBar />
      </div>
      <Button href="/bookmarks" className="hidden md:flex flex-initial">
        Bookmarks
      </Button>
      <IconButton
        href="/bookmarks"
        className="md:hidden flex-initial"
        aria-label="Search"
      >
        <BookmarkSmallerIcon className="w-5 h-5" />
      </IconButton>
    </div>
  )
}

export default AdvancedSearchBar
