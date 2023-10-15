import { FC, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  searchIcon?: boolean
  value: string
}

const SearchInput: FC<Props> = ({ value, onClear, searchIcon = true, ...rest }) => {
  return (
    <div className={`border rounded-lg`}>
      <div className={`flex bg-neutral-50 overflow-hidden rounded-lg`}>
        {searchIcon && (
          <span className="text-neutral-400 h-10 w-10 flex justify-center items-center" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchInput
