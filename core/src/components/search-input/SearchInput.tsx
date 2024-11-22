import { FC } from "react"
import ResetIcon from "@/ui/icons/ResetIcon"
import SearchIcon from "@/ui/icons/SearchIcon"
import { SearchInputProps } from "@/components/search-input/types"
import "@/components/search-input/styles.scss"

const SearchInput: FC<SearchInputProps> = ({
  value,
  onClear,
  searchIcon = true,
  ...rest
}) => {
  return (
    <div className="search-input">
      {searchIcon && (
        <span className="search-input__icon" aria-hidden>
          <SearchIcon />
        </span>
      )}
      <input
        name="query"
        value={value}
        placeholder="Search..."
        autoComplete="off"
        className="search-input__input"
        {...rest}
      />
      {value && (
        <button
          className="search-input__clear-button"
          aria-label="Clear Form"
          type="button"
          onClick={onClear}
        >
          <ResetIcon />
        </button>
      )}
    </div>
  )
}

export default SearchInput
