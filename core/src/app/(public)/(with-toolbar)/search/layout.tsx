import { ReactNode, Suspense } from "react"
import IndicatorsListViewLoader from "@/containers/indicators-list-view/IndicatorsListViewLoader"
import translate from "@/modules/i18n"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <IndicatorsListViewLoader
          text={translate("pages.search.heading_empty")}
        />
      }
    >
      {children}
    </Suspense>
  )
}
