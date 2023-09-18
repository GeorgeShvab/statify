'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface Props {
  page: number
  pages: number
}

const makeUrl = (params: string, page: number): string => {
  const searchParams = new URLSearchParams(params)

  searchParams.set('page', String(page))

  return '?' + searchParams.toString()
}

const Pagination: FC<Props> = ({ page, pages }) => {
  const searchParams = useSearchParams()

  const displayedPages = Array.from({ length: Math.min(5, pages) }, (_, index) => index + 1)
    .map((item, index) => Math.max(1, page - 2) + index)
    .filter((item) => item <= pages)

  return (
    <div className="flex justify-center py-3 md:py-5">
      <div className="flex gap-1.5">
        <Link
          href={makeUrl(searchParams.toString(), page - 1)}
          className={`h-10 w-10 rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500 ${
            page === 1 ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        {page - 2 > 1 && (
          <>
            <Link
              href={makeUrl(searchParams.toString(), 1)}
              className={`h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500`}
            >
              1
            </Link>
            {page - 3 > 1 && (
              <span
                className={`h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500`}
              >
                ...
              </span>
            )}
          </>
        )}
        {displayedPages.map((item) => (
          <Link
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
              <span
                className={`h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500`}
              >
                ...
              </span>
            )}
            <Link
              href={makeUrl(searchParams.toString(), pages)}
              className={`h-10 w-10 hidden md:flex rounded-lg bg-white border flex items-center justify-center hover:shadow transition-all text-neutral-500`}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Pagination
