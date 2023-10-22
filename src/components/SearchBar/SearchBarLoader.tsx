import Button from '@/ui/Button/Button'
import IconButton from '@/ui/IconButton/IconButton'
import { FC } from 'react'

interface Props {
  placeholder?: string
}

const SearchBarLoader: FC<Props> = ({ placeholder }) => {
  return (
    <form>
      <div className="flex gap-1.5 md:gap-2.5 items-center">
        <div className="relative flex-1 z-20">
          <div className="border rounded-lg">
            <div className="flex bg-white overflow-hidden rounded-lg">
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
              <input
                name="query"
                value=""
                placeholder={placeholder || 'Search...'}
                autoComplete="off"
                className="h-10 flex-1 outline-none text-sm text-neutral-800"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="hidden md:flex">
          Search
        </Button>
        <IconButton type="submit" className="md:hidden" aria-label="Search">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </IconButton>
      </div>
    </form>
  )
}

export default SearchBarLoader
