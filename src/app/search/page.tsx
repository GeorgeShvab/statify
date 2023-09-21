import IndicatorCard from '@/components/IndicatorCard/IndicatorCard'
import Pagination from '@/components/Pagination/Pagination'
import IndicatorService from '@/services/IndicatorService'
import { PageProps } from '@/types'
import { Metadata } from 'next'
import { FC } from 'react'

interface SearchParams {
  query: string
  topic?: string
  page?: string
}

const SearchPage: FC<PageProps<{}, SearchParams>> = async ({ searchParams }) => {
  const { data, pages, page } = await IndicatorService.search({
    query: searchParams.query,
    page: searchParams.page ? Number(searchParams.page) : 1,
  })

  return (
    <main>
      <div className="flex flex-col min-h-[calc(100vh-var(--header-height))]">
        <div className="flex-1">
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.map((item) => (
              <IndicatorCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        {searchParams.query && data.length && (
          <div className="container">
            <Pagination pages={pages} page={page} />
          </div>
        )}
      </div>
    </main>
  )
}

export const generateMetadata = async ({ searchParams }: PageProps<{}, SearchParams>): Promise<Metadata> => {
  return {
    title: `Results for ${searchParams.query}`,
    description: `Indicator results for ${searchParams.query}`,
    openGraph: {
      images: ['/favicon.png'],
      title: `Results for ${searchParams.query}`,
      description: `Indicator results for ${searchParams.query}`,
      type: 'website',
      url: `/search?query=${searchParams.query}&page=${searchParams.page}&topic=${searchParams.topic}`,
    },
  }
}

export default SearchPage
