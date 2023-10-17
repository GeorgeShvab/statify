import BookmarkCard from '@/components/BookmarkCard/BookmarkCard'
import Pagination from '@/components/Pagination/Pagination'
import AdvancedSearchBar from '@/components/SearchBar/AdvancedSearchBar'
import BookmarkService from '@/services/BookmarkService'
import { PageProps } from '@/types'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC } from 'react'

interface SearchParams {
  page: number
}

const Bookmarks: FC<PageProps<{}, SearchParams>> = async ({ searchParams }) => {
  const client = cookies().get('client_id')?.value

  const data = client ? await BookmarkService.get({ client, page: searchParams.page || 1 }) : null

  return (
    <main className="">
      <div className="container">
        <div className="py-3 md:py-5">
          <AdvancedSearchBar />
        </div>
      </div>
      <div className="flex flex-col min-h-main-dynamic md:min-h-main relative">
        <div className="flex-1">
          <div className="container">
            <h2 className="mb-1.5 md:mb-3 px-2 font-semibold">Your Bookmarks</h2>
            {data?.data.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {data.data.map((item) => (
                  <BookmarkCard key={(item?.country?.id || '') + item.indicator.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <div className="flex justify-center mb-6 text-neutral-300" aria-hidden={true}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-20 h-20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <p className="text-center text-neutral-300">You have no bookmarks yet</p>
              </div>
            )}
          </div>
        </div>
        {!!data?.data.length && (
          <div className="container">
            <Pagination pages={data.pages} page={data.page} />
          </div>
        )}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Accurate economic data by countries',
  themeColor: '#ffffff',
  openGraph: {
    images: ['/og.png'],
    title: 'Statify',
    description: 'Accurate economic data by countries',
    type: 'website',
    url: '/',
  },
  twitter: {
    images: ['/og.png'],
    title: 'Statify',
    description: 'Accurate economic data by countries',
    card: 'summary_large_image',
    site: '@Zhorrrro',
  },
}

export default Bookmarks
