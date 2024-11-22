import { ReactNode, Suspense } from "react"
import IndicatorsListViewLoader from "@/containers/indicators-list-view/IndicatorsListViewLoader"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<IndicatorsListViewLoader text="Search results for" />}>
      {children}
    </Suspense>
  )
}
