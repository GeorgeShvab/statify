import { ReactNode, Suspense } from 'react'
import Loading from './loading'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mb-10">
          <Loading />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
