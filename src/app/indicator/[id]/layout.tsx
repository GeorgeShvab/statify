import { ReactNode, Suspense } from 'react'
import Loading from './Loading'
import AdvancedSearchBar from '@/components/SearchBar/AdvancedSearchBar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mb-3 md:mb-5">
      <div className="container">
        <div className="py-3 md:py-5">
          <AdvancedSearchBar />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="mb-3 md:mb-5">
            <Loading />
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  )
}
