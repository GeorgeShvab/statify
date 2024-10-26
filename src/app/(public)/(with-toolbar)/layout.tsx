import { PropsWithChildren, Suspense } from "react"
import Toolbar from "@/components/toolbar/Toolbar"
import ToolbarLoader from "@/components/toolbar/ToolbarLoader"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="container">
        <div className="py-3 md:py-5">
          <Suspense fallback={<ToolbarLoader />}>
            <Toolbar />
          </Suspense>
        </div>
      </div>
      {children}
    </>
  )
}
