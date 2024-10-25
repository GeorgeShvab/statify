import { ReactNode, Suspense } from "react"
import AdvancedSearchBar from "@/components/toolbar/Toolbar"
import Toolbar from "@/components/toolbar/ToolbarLoader"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mb-5 md:mb-7">
      <div className="container">
        <div className="py-3 md:py-5">
          <Suspense fallback={<Toolbar />}>
            <AdvancedSearchBar />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div className="mb-3 md:mb-5"></div>}>
        {children}
      </Suspense>
    </main>
  )
}

export const dynamicParams = true
