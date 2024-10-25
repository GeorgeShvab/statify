import { ReactNode, Suspense } from "react"
import Loading from "@/app/(public)/indicator/[id]/Loading"
import Toolbar from "@/components/toolbar/Toolbar"
import ToolbarLoader from "@/components/toolbar/ToolbarLoader"
import "./styles.scss"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const fallback = <Loading />

  return (
    <main className="indicator-data">
      <div className="container">
        <div className="indicator-data__container">
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
