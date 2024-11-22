import { ReactNode, Suspense } from "react"
import Loading from "@/app/(public)/(with-toolbar)/terms/Loading"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export const dynamicParams = true
