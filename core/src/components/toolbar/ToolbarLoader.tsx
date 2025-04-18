import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import BookmarkIcon from "@/ui/icons/BookmarkIcon"
import SearchBarLoader from "@/components/searchbar/SearchBarLoader"
import translate from "@/modules/i18n"
import "@/components/toolbar/styles.scss"

const ToolbarLoader = () => {
  return (
    <div className="toolbar">
      <SearchBarLoader />
      <Button href="/bookmarks" className="toolbar__bookmarks-button desktop">
        {translate("common.bookmarks")}
      </Button>
      <IconButton
        href="/bookmarks"
        className="toolbar__bookmarks-button mobile"
        aria-label="Search"
      >
        <BookmarkIcon />
      </IconButton>
    </div>
  )
}

export default ToolbarLoader
