import { ReactNode, Suspense } from "react"
import Loading from "@/app/(public)/indicator/[id]/Loading"
import Toolbar from "@/components/toolbar/Toolbar"
import ToolbarLoader from "@/components/toolbar/ToolbarLoader"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const fallback = (
    <div className="mb-3 md:mb-5">
      <Loading />
    </div>
  )

  return (
    <main className="mb-5 md:mb-7">
      <div className="container">
        <div className="py-3 md:py-5">
          <Suspense fallback={<ToolbarLoader />}>
            <Toolbar />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={fallback}>{children}</Suspense>
    </main>
  )
}

export const dynamicParams = true
