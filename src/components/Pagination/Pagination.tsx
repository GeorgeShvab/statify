'use client'

import LeftChevronIcon from '@/ui/Icons/LeftChevronIcon'
import RightChevronIcon from '@/ui/Icons/RightChevronIcon'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface Props {
  page: number
  pages: number
}

const Pagination: FC<Props> = ({ page, pages }) => {
  const searchParams = useSearchParams()

  const displayedPages = getPagesArray(page, pages)

  return (
    <div className="flex justify-center py-3 md:py-5">
      <div className="flex gap-1.5">
        <Link
          href={makeUrl(searchParams.toString(), page - 1)}
          className={`h-10 w-10 rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500 ${
            page === 1 ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <LeftChevronIcon className="w-5 h-5" />
        </Link>
        {page - 2 > 1 && (
          <>
            <Link
              href={makeUrl(searchParams.toString(), 1)}
              className="h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500"
            >
              1
            </Link>
            {page - 3 > 1 && (
              <span className="h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500">
                ...
              </span>
            )}
          </>
        )}
        {displayedPages.map((item, index) => (
          <Link
            key={item}
            href={makeUrl(searchParams.toString(), item)}
            className={`h-10 w-10 rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all ${
              item === page ? 'font-bold text-black pointer-events-none' : 'text-neutral-500'
            }`}
          >
            {item}
          </Link>
        ))}
        {pages - 2 > page && (
          <>
            {pages - 3 > page && (
              <span className="h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500">
                ...
              </span>
            )}
            <Link
              href={makeUrl(searchParams.toString(), pages)}
              className="h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500"
            >
              {pages}
            </Link>
          </>
        )}
        <Link
          href={makeUrl(searchParams.toString(), page + 1)}
          className={`h-10 w-10 rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500 ${
            page === pages ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <RightChevronIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

function getPagesArray(page: number, pages: number) {
  return Array.from({ length: pages }, (_, index) => index + 1).slice(
    Math.max(0, page - (3 + Math.max(0, 2 - (pages - page)))),
    Math.min(pages, page + (2 + Math.max(0, 3 - page)))
  )
}

function makeUrl(params: string, page: number): string {
  const searchParams = new URLSearchParams(params)

  searchParams.set('page', String(page))

  return '?' + searchParams.toString()
}

export default Pagination
