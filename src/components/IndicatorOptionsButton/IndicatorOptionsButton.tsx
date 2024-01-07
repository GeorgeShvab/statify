'use client'

import IconButton from '@/ui/IconButton/IconButton'
import { FC, useRef, useState } from 'react'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import dynamic from 'next/dynamic'

const Dropdown = dynamic(() => import('@/ui/Dropdown/Dropdown'), { ssr: false })

interface Props {
  countryId?: string
  indicatorId: string
}

const IndicatorOptionsButton: FC<Props> = (props) => {
  const anchor = useRef<HTMLButtonElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const handleCloseOptions = () => setIsDropdownOpen(false)

  const handleToggleOptions = () => setIsDropdownOpen((prev) => !prev)

  return (
    <>
      <IconButton
        className="absolute right-2 top-2.5 md:right-5 md:top-4 !bg-transparent !text-black transition-all"
        onClick={handleToggleOptions}
        ref={anchor}
        aria-label="Open options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </IconButton>
      <Dropdown anchor={anchor} isOpen={isDropdownOpen} onClose={handleCloseOptions} className="flex" renderHidden>
        <li>
          <BookmarkButton {...props} />
        </li>
      </Dropdown>
    </>
  )
}

export default IndicatorOptionsButton
