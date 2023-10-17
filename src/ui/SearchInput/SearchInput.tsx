import { FC, HTMLAttributes } from 'react'
import SearchIcon from '../Icons/SearchIcon'
import ResetIcon from '../Icons/ResetIcon'

interface Props extends HTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  searchIcon?: boolean
  value: string
}

const SearchInput: FC<Props> = ({ value, onClear, searchIcon = true, ...rest }) => {
  return (
    <div className="border rounded-lg">
      <div className="flex bg-neutral-50 overflow-hidden rounded-lg">
        {searchIcon && (
          <span className="text-neutral-400 h-10 w-10 flex justify-center items-center" aria-hidden>
            <SearchIcon className="w-4 h-4" />
          </span>
        )}
        <input
          name="query"
          value={value}
          placeholder="Search..."
          autoComplete="off"
          className="h-10 flex-1 outline-none text-sm text-neutral-800 bg-neutral-50"
          {...rest}
        />
        {value && (
          <button
            className="text-neutral-400 h-10 w-10 flex justify-center items-center hover:text-neutral-500 transition-colors"
            aria-label="Clear Form"
            type="button"
            onClick={onClear}
          >
            <ResetIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchInput
