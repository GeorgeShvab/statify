import { ReactNode, Suspense } from "react"
import IndicatorsListViewLoader from "@/containers/indicators-list-view/IndicatorsListViewLoader"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mb-3 md:mb-5">
          <IndicatorsListViewLoader text="Search results for" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
