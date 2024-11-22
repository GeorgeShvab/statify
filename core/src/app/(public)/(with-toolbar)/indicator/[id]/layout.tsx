import { ReactNode, Suspense } from "react"
import Loading from "@/app/(public)/(with-toolbar)/indicator/[id]/Loading"
import "@/app/(public)/(with-toolbar)/indicator/[id]/styles.scss"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const fallback = <Loading />

  return (
    <div className="indicator-data">
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  )
}

export const dynamicParams = true
