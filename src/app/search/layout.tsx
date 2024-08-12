import { ReactNode, Suspense } from 'react'
import Loading from '@/app/search/Loading'
import AdvancedSearchBar from '@/components/SearchBar/AdvancedSearchBar'
import AdvancedSearchBarLoader from '@/components/SearchBar/AdvancedSearchBarLoader'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className='container'>
        <div className='py-3 md:py-5'>
          <Suspense fallback={<AdvancedSearchBarLoader />}>
            <AdvancedSearchBar />
          </Suspense>
        </div>
      </div>
      <Suspense
        fallback={
          <div className='mb-3 md:mb-5'>
            <Loading />
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  )
}
