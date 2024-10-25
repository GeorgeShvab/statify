import { FC } from "react"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import BookmarkSmallerIcon from "@/ui/icons/BookmarkSmallerIcon"
import SearchBar from "@/components/searchbar/SearchBar"
import "@/components/toolbar/styles.scss"

const Toolbar: FC = () => {
  return (
    <div className="toolbar">
      <SearchBar />
      <Button href="/bookmarks" className="toolbar__bookmarks-button desktop">
        Bookmarks
      </Button>
      <IconButton
        href="/bookmarks"
        className="toolbar__bookmarks-button mobile"
        aria-label="Search"
      >
        <BookmarkSmallerIcon />
      </IconButton>
    </div>
  )
}

export default Toolbar
