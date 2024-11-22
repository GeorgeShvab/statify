import { PropsWithChildren, Suspense } from "react"
import PageWrapper from "@/layout/page-wrapper/PageWrapper"
import Toolbar from "@/components/toolbar/Toolbar"
import ToolbarLoader from "@/components/toolbar/ToolbarLoader"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <PageWrapper>
      <div className="container">
        <Suspense fallback={<ToolbarLoader />}>
          <Toolbar />
        </Suspense>
      </div>
      {children}
    </PageWrapper>
  )
}
