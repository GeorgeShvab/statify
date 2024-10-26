import { ReactNode, Suspense } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="mb-3 md:mb-5"></div>}>
      {children}
    </Suspense>
  )
}

export const dynamicParams = true
