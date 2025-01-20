import { FC } from "react"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import SearchIcon from "@/ui/icons/SearchIcon"
import { SearchBarProps } from "@/components/searchbar/types"
import translate from "@/modules/i18n"
import "@/components/searchbar/styles.scss"

const SearchBarLoader: FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="searchbar">
      <div className="searchbar__container">
        <div className="searchbar__input-container">
          <span className="searchbar__search-icon" aria-hidden>
            <SearchIcon />
          </span>
          <input
            name="query"
            value=""
            placeholder={placeholder || translate("common.search_ellipsed")}
            autoComplete="off"
            className="searchbar__input"
          />
        </div>
      </div>
      <Button type="submit" className="searchbar__button desktop">
        {translate("common.search")}
      </Button>
      <IconButton
        type="submit"
        className="searchbar__button mobile"
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>
    </div>
  )
}

export default SearchBarLoader
