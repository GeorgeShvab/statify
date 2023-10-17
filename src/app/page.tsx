import { Metadata } from 'next'
import { FC, Suspense } from 'react'
import SearchBar from '@/components/SearchBar/SearchBar'
import SearchBarLoader from '@/components/SearchBar/SearchBarLoader'

const Home: FC = () => {
  return (
    <main className="bg-white">
      <div className="container">
        <div className="flex flex-col h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height)-var(--footer-height))] justify-center items-center">
          <div>
            <div className="px-2 md:px-0">
              <h1 className="text-center text-[42px] md:text-6xl font-bold text-black mb-20 md:mb-16 leading-normal">
                Discover the World through Data
              </h1>
              <div className="flex justify-center">
                <div className="mb-8 md:mb-8 max-w-[700px] w-full [&>form>div>div>div>div]:bg-neutral-50 [&>form>div>div>div>div>input]:bg-neutral-50">
                  <Suspense fallback={<SearchBarLoader />}>
                    <SearchBar />
                  </Suspense>
                </div>
              </div>
              <div className="md:flex md:justify-center">
                <p className="text-center text-gray-400 max-w-[600px] text-[13px] md:text-base">
                  Explore our database featuring 100+ indicators for hundreds of regions worldwide. Create customizable
                  charts, view trends, and access hundreds of thousands of data points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Statify',
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

export default Home
